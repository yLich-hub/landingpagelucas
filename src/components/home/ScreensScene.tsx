"use client";

import Image from "next/image";
import { useRef } from "react";
import { getContent, type Locale } from "@/content";
import { getIpsisScreens } from "@/content/photos";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Cena 4 — o Ipsis por dentro: rolagem horizontal fixa com parallax nas telas (desktop); carrossel nativo no celular. */
export function ScreensScene({ locale }: { locale: Locale }) {
  const t = getContent(locale).ui.screens;
  const ipsisScreens = getIpsisScreens(locale);
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - innerWidth);
        // ⚠ sem pinSpacer próprio aqui: a cena congelaria numa largura errada
        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-screen-img]").forEach((img) =>
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("article"),
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          ),
        );
        gsap.fromTo(
          "[data-progress]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="telas-titulo"
      className="relative overflow-hidden bg-ink-2 py-24 md:flex md:h-[100svh] md:flex-col md:justify-center md:pb-0 md:pt-16"
    >
      <div className="wrap">
        <p className="label">{t.label}</p>
        <h2 id="telas-titulo" className="headline mt-3 max-w-[20ch]">
          {t.title}
        </h2>
        {t.note && <p className="mt-3 text-ash">{t.note}</p>}
      </div>
      <div
        ref={track}
        role="region"
        aria-label={t.aria}
        tabIndex={0}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:mt-12 md:gap-8 motion-safe:md:snap-none motion-safe:md:overflow-visible md:px-[max(3rem,calc((100vw-82rem)/2+3rem))]"
      >
        {ipsisScreens.map((s) => (
          <article
            key={s.n}
            className="w-[84vw] max-w-[26rem] shrink-0 snap-start md:w-[min(52vw,44rem)] md:max-w-none"
          >
            <div className="shot relative aspect-[1920/1236] bg-[#f6f6f8]">
              <div data-screen-img className="absolute inset-y-0 -inset-x-[7%]">
                <Image
                  src={s.photo.src}
                  alt={s.photo.alt}
                  fill
                  sizes="(min-width: 768px) 52vw, 84vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>
            <h3 className="title mt-5">{s.title}</h3>
            <p className="mt-1 text-ash">{s.note}</p>
          </article>
        ))}
        <div aria-hidden className="w-1 shrink-0 md:w-px" />
      </div>
      <div aria-hidden className="wrap mt-8 hidden md:block">
        <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
          <div data-progress className="h-full origin-left bg-amber" />
        </div>
      </div>
    </section>
  );
}
