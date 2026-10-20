"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Campo de pixels em WebGL: cada pixel do canvas é uma célula da grade (image-rendering: pixelated),
 * e a grade de frestas é CSS por cima. Custo de GPU mínimo (~120×75 fragmentos).
 * Orçamento: começa na 1ª interação ou após 8 s, pausa fora da tela e com a aba oculta;
 * com movimento reduzido desenha 1 quadro e para.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uLight;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.03+17.; a*=.5; } return v; }
void main(){
  vec2 cell = floor(gl_FragCoord.xy);
  vec2 uv = cell / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 q = uv * vec2(aspect, 1.);
  float t = uTime * .06;
  float field = fbm(q * 2.4 + vec2(t, -t * .6) + fbm(q * 1.3 - t) * .9);
  vec2 lp = vec2(.78, .74) + (uMouse - .5) * vec2(.26, .2);
  float glow = exp(-length((uv - lp) * vec2(aspect, 1.)) * (3.2 - 1.4 * uLight));
  float blink = step(.992, hash(cell + floor(uTime * 1.6))) * (.35 + .65 * hash(cell * 1.7));
  float lit = smoothstep(.5, .92, field) * .55 + glow * (.55 + .8 * uLight) + blink * .5;
  vec3 base = vec3(.075, .075, .09);
  vec3 amber = vec3(.984, .749, .141);
  vec3 col = mix(base, amber, clamp(lit, 0., 1.));
  // a esquerda e a base ficam mais escuras: é onde mora o texto
  col *= mix(.38, 1., smoothstep(.0, .75, uv.x * .7 + uv.y * .6));
  gl_FragColor = vec4(col, 1.);
}`;

export const CELL = 12;
export const CELL_MOBILE = 10;
const cellSize = () => (innerWidth < 768 ? CELL_MOBILE : CELL);

export function PixelCanvas({ light, className }: { light?: RefObject<number>; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    let running = false;
    let visible = true;
    let started = false;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    const t0 = performance.now();

    const resize = () => {
      if (!gl) return;
      const cell = cellSize();
      const box = canvas.parentElement ?? canvas;
      const w = Math.ceil(box.clientWidth / cell);
      const h = Math.ceil(box.clientHeight / cell);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        // tamanho exato em células: a grade de frestas (CSS) cai em cima das bordas dos pixels
        canvas.style.width = `${w * cell}px`;
        canvas.style.height = `${h * cell}px`;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uniforms.uRes, w, h);
    };

    const draw = () => {
      if (!gl) return;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      gl.uniform1f(uniforms.uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uniforms.uMouse, mouse.x, mouse.y);
      gl.uniform1f(uniforms.uLight, light?.current ?? 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced || !visible || document.hidden || !gl) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / innerWidth;
      mouse.ty = 1 - e.clientY / innerHeight;
    };
    const onVisibility = () => (document.hidden ? pause() : play());
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });

    const start = () => {
      if (started) return;
      started = true;
      gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
      if (!gl) return;
      const compile = (type: number, src: string) => {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl = null;
        return;
      }
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "p");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      for (const name of ["uRes", "uTime", "uMouse", "uLight"]) uniforms[name] = gl.getUniformLocation(prog, name);
      resize();
      draw();
      canvas.dataset.ready = "true";
      addEventListener("resize", resize);
      addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      io.observe(canvas);
      play();
    };

    // ⚠ compilar shader trava a thread em aparelho fraco: só na 1ª interação ou após 8 s
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    const kick = () => {
      events.forEach((e) => removeEventListener(e, kick));
      clearTimeout(timer);
      start();
    };
    events.forEach((e) => addEventListener(e, kick, { passive: true, once: true }));
    const timer = setTimeout(kick, 8000);

    return () => {
      events.forEach((e) => removeEventListener(e, kick));
      clearTimeout(timer);
      pause();
      io.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [light]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`opacity-0 transition-opacity duration-[1600ms] [image-rendering:pixelated] data-[ready=true]:opacity-100 ${className ?? ""}`}
    />
  );
}
