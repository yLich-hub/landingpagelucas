"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/content/site";
import { photos } from "@/content/photos";
import { gsap, MOTION_OK, MOTION_REDUCED, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconArrowUpRight } from "../icons";
import { countUp } from "./CountUp";
import { Metric } from "./Metric";

const clima = projects[1];
const cards = [photos.climaElNino, photos.climaCloudy, photos.clima, photos.climaDays, photos.climaElNinoData];
// % da largura do card
const FAN = [
  { x: -92, y: 16, r: -11 },
  { x: -47, y: 4, r: -5.5 },
  { x: 0, y: -2, r: 0 },
  { x: 47, y: 4, r: 5.5 },
  { x: 92, y: 16, r: 11 },
];

/** Cena 5 — Clima Cascavel: as telas saem empilhadas e abrem em leque com a rolagem. */
export function ClimaScene() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stage.current!;
      const items = gsap.utils.toArray<HTMLElement>("[data-fan-card]", el);
      const k = () => (innerWidth < 768 ? 0.5 : 1); // no celular o leque fecha e as pontas só espiam
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        el.dataset.fan = "on";
        gsap.set(items, { xPercent: -50, yPercent: -50, x: 0, rotation: 0, scale: 0.9 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene.current,
            start: "top top",
            end: "+=110%",
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        items.forEach((c, i) =>
          tl.to(
            c,
            {
              xPercent: () => -50 + FAN[i].x * k(),
              yPercent: () => -50 + FAN[i].y,
              rotation: FAN[i].r,
              scale: i === 2 ? 1.04 : 0.94,
              ease: "power2.out",
              duration: 1,
            },
            0,
          ),
        );
        gsap.utils
          .toArray<HTMLElement>("[data-count]", root.current)
          .forEach((n) =>
            ScrollTrigger.create({ trigger: n, start: "top 90%", once: true, onEnter: () => countUp(n) }),
          );
        return () => {
          delete el.dataset.fan;
        };
      });
      mm.add(MOTION_REDUCED, () => {
        el.dataset.fan = "on";
        items.forEach((c, i) =>
          gsap.set(c, { xPercent: -50 + FAN[i].x * k(), yPercent: -50 + FAN[i].y, rotation: FAN[i].r }),
        );
        return () => {
          delete el.dataset.fan;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="clima-titulo"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,var(--color-ink),#0c1426_45%,var(--color-ink))] pb-28 md:pb-36"
    >
      <div ref={scene} className="flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24">
        <div className="wrap text-center">
          <p className="label">Segundo projeto: {clima.name}</p>
          <h2 id="clima-titulo" className="headline mx-auto mt-4 md:display">
            {clima.claim}
          </h2>
          <p className="mt-5 font-pixel text-sm text-amber" aria-hidden>
            <span className="caret">&gt; sem dado válido, “indisponível”</span>
          </p>
          <p className="lead mx-auto mt-6 max-w-[44ch] text-ash">{clima.summary}</p>
        </div>

        <div
          ref={stage}
          data-stage
          className="no-scrollbar relative mt-14 flex h-auto snap-x snap-mandatory gap-4 overflow-x-auto px-5 data-[fan=on]:h-[42svh] data-[fan=on]:overflow-visible data-[fan=on]:px-0 md:mt-12 md:data-[fan=on]:h-[44svh]"
        >
          {cards.map((c, i) => (
            <figure
              key={c.src}
              data-fan-card
              className="shot relative aspect-[16/10] w-[78vw] max-w-[34rem] shrink-0 snap-center md:w-[34vw]"
              style={{ zIndex: i === 2 ? 5 : 5 - Math.abs(i - 2) }}
            >
              <Image
                src={c.src}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 34vw, 78vw"
                className="object-cover object-top"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-10 md:mt-20 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:gap-16">
        <div>
          <p className="title max-w-[22ch]">{clima.principle}</p>
          <p className="mt-4 max-w-[48ch] text-ash">{clima.solution}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/projetos/${clima.slug}`} className="pill pill-light">
              Ver o projeto
            </Link>
            {clima.live && (
              <a href={clima.live} className="pill pill-glass">
                Abrir o site
                <IconArrowUpRight width={16} height={16} />
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 self-start text-cream">
          {clima.metrics.map((m) => (
            <Metric key={m.label} metric={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
