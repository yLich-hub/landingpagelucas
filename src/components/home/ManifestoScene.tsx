"use client";

import Image from "next/image";
import { useRef } from "react";
import { getContent, type Locale } from "@/content";
import { getPhotos } from "@/content/photos";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Cena 2 — o convite: a frase dele acende palavra por palavra; a foto abre de baixo para cima. */
export function ManifestoScene({ locale }: { locale: Locale }) {
  const { manifesto } = getContent(locale);
  const photos = getPhotos(locale);
  const root = useRef<HTMLElement>(null);
  const words = manifesto.quote.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-word]",
          { backgroundPosition: "100% 0%" },
          {
            backgroundPosition: "0% 0%",
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: "[data-quote]", start: "top 80%", end: "bottom 42%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-portrait]",
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { trigger: "[data-portrait]", start: "top 92%", end: "top 40%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-portrait-img]",
          { scale: 1.25 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-portrait]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="convite-titulo" className="relative bg-ink py-28 md:py-44">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-end gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <figure className="order-2 md:order-1">
          <div data-portrait className="relative aspect-[2/3] max-w-[26rem] overflow-hidden rounded-[28px] bg-ink-3">
            <div data-portrait-img className="absolute inset-0">
              <Image
                src={photos.lucas.src}
                alt={photos.lucas.alt}
                fill
                sizes="(min-width: 768px) 26rem, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption className="mt-4 text-sm text-ash">{manifesto.caption}</figcaption>
        </figure>
        <div className="order-1 md:order-2">
          <h2 id="convite-titulo" className="label">
            {manifesto.label}
          </h2>
          <blockquote
            data-quote
            className="mt-6 max-w-[20ch] text-[clamp(2.125rem,5.4vw,5rem)] font-semibold leading-[1.03] tracking-[-0.045em]"
          >
            <p>
              {words.map((w, i) => (
                <span key={i} data-word className="word-reveal">
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </blockquote>
          <div className="mt-10 grid max-w-2xl gap-4 text-ash sm:grid-cols-2">
            {manifesto.body.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
