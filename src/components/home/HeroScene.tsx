"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { files, person } from "@/content/site";
import { photos } from "@/content/photos";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { PixelCanvas } from "../motion/PixelCanvas";
import { IconDownload } from "../icons";

/**
 * Cena 1 — o ponto. O pixel âmbar do logo cresce, vira janela e abre na primeira tela real.
 * Sem JS (ou com movimento reduzido) é só o hero estático: logo, frase, botões e status.
 */
export function HeroScene({ logo }: { logo: ReactNode }) {
  const spacer = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const light = useRef(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = root.current!;
        const dot = section.querySelector<SVGRectElement>("[data-dot]");
        // de onde a porta nasce: a caixa do ponto do logo, em px relativos à seção
        const fromDot = () => {
          const s = section.getBoundingClientRect();
          const r = dot?.getBoundingClientRect();
          if (!r) return "inset(50% 50% 50% 50%)";
          return `inset(${r.top - s.top}px ${s.right - r.right}px ${s.bottom - r.bottom}px ${r.left - s.left}px)`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top+=1 top", // ⚠ na carga nada fica fixo nem se move
            end: "+=160%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            pinSpacer: spacer.current, // ⚠ só no hero: o logo não repinta (LCP no 1º quadro)
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              light.current = self.progress;
            },
          },
        });
        tl.fromTo(
          "[data-door]",
          { clipPath: fromDot },
          { clipPath: "inset(0px 0px 0px 0px)", duration: 0.56, ease: "power3.inOut" },
          0.02,
        )
          .to(
            "[data-hero-content]",
            { autoAlpha: 0, yPercent: -6, scale: 0.97, duration: 0.3, ease: "power1.in" },
            0.08,
          )
          .fromTo(
            "[data-door-img]",
            { autoAlpha: 0, scale: 1.28 },
            { autoAlpha: 1, scale: 1, duration: 0.56, ease: "power2.out" },
            0.2,
          )
          .fromTo(
            "[data-door-copy] > *",
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.18, ease: "power2.out" },
            0.72,
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={spacer}>
      <section
        ref={root}
        aria-label="Apresentação"
        className="relative h-[100svh] min-h-[36rem] overflow-hidden bg-ink"
      >
        {/* clima já no 1º quadro (e fallback sem WebGL) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_55%_at_80%_22%,rgb(251_191_36/.34),transparent_70%),radial-gradient(40%_40%_at_70%_70%,rgb(251_191_36/.08),transparent_70%)]"
        />
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <PixelCanvas light={light} className="absolute left-0 top-0" />
        </div>
        {/* frestas entre os pixels */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [--cell:10px] md:[--cell:12px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-ink) 0 2px, transparent 2px), linear-gradient(to bottom, var(--color-ink) 0 2px, transparent 2px)",
            backgroundSize: "var(--cell) var(--cell)",
          }}
        />
        {/* proteção do texto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_9_12/.92),rgb(9_9_12/.35)_55%,transparent)]"
        />

        <div
          data-hero-content
          className="wrap relative z-10 flex h-full flex-col justify-end pb-[max(2.5rem,7svh)] pt-24"
        >
          <p className="text-[0.95rem] text-ash md:text-base">
            {person.role} em {person.city}
          </p>
          <h1 className="mt-4 w-[min(100%,58rem)]">
            <span className="sr-only">{person.name}</span>
            <span aria-hidden>{logo}</span>
          </h1>
          <p className="lead mt-6 max-w-[38ch] text-cream/90">{person.positioning}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projetos" className="pill pill-light hero-in" style={{ ["--d" as string]: "120ms" }}>
              Ver projetos
            </a>
            <a href={files.cv} download className="pill pill-glass hero-in" style={{ ["--d" as string]: "200ms" }}>
              <IconDownload width={18} height={18} />
              Baixar currículo
            </a>
          </div>
          <p className="hero-in mt-7 flex items-center gap-2.5 text-sm text-ash" style={{ ["--d" as string]: "320ms" }}>
            <span aria-hidden className="size-2 bg-[#34d399] shadow-[0_0_10px_#34d399]" />
            Disponível para trabalho {person.availability}
          </p>
        </div>

        {/* a porta: nasce do ponto do logo */}
        <div data-door aria-hidden className="absolute inset-0 z-20 bg-amber [clip-path:inset(50%_50%_50%_50%)]">
          <div data-door-img className="invisible absolute inset-0">
            <Image src={photos.ipsisLanding.src} alt="" fill sizes="100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(9_9_12/.94),rgb(9_9_12/.55)_40%,rgb(9_9_12/.05)_75%)]" />
          </div>
          <div data-door-copy className="wrap absolute inset-x-0 bottom-0 pb-[max(3rem,9svh)]">
            <p className="invisible label">Ipsis, o primeiro projeto no ar</p>
            <p className="display invisible mt-3 max-w-[14ch] text-cream">Do atendimento ao código.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
