"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -88 },
      autoRaf: false,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // ⚠ sem isto a página rola por trás do menu
    const mo = new MutationObserver(() => (document.querySelector("dialog[open]") ? lenis.stop() : lenis.start()));
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // a cada troca de rota: volta ao topo e recalcula as cenas
  useEffect(() => {
    if (location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
