"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/content/site";
import { photos } from "@/content/photos";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { IconArrowUpRight, IconChevron } from "../icons";
import { countUp } from "./CountUp";
import { Metric } from "./Metric";

const ipsis = projects[0];

const steps = [
  { title: "O problema", photo: photos.ipsisLanding },
  { title: "A decisão", photo: photos.ipsisCitation },
  { title: "O resultado", photo: photos.ipsisDecisions },
];

/**
 * Cena 3 — Ipsis, em papel. No desktop a cena fica fixa e troca problema → decisão → resultado,
 * com a tela ao lado abrindo de baixo para cima. No celular e sem movimento, é uma sequência normal.
 */
export function IpsisScene() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const el = stage.current!;
        el.dataset.pin = "on";
        const stepEls = gsap.utils.toArray<HTMLElement>("[data-step]", el);
        const shotEls = gsap.utils.toArray<HTMLElement>("[data-shot]", el);
        const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", el);
        gsap.set(stepEls.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set(shotEls.slice(1), { clipPath: "inset(100% 0% 0% 0% round 24px)" });
        gsap.set(bars, { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=240%", scrub: 0.7, pin: true, anticipatePin: 1 },
        });
        tl.to(bars[0], { scaleX: 1, duration: 1, ease: "none" }, 0);
        for (let i = 1; i < steps.length; i++) {
          const at = i * 1.2;
          tl.to(stepEls[i - 1], { autoAlpha: 0, y: -40, duration: 0.4 }, at)
            .to(stepEls[i], { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.25)
            .to(shotEls[i], { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 0.7 }, at)
            .fromTo(shotEls[i].querySelector("img"), { scale: 1.15 }, { scale: 1, duration: 0.9 }, at)
            .to(bars[i], { scaleX: 1, duration: 1, ease: "none" }, at);
        }
        tl.call(() => el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n)), [], 2.6);
        tl.to({}, { duration: 0.6 }); // respiro no fim
        return () => {
          delete el.dataset.pin;
        };
      });
      // celular / sem pin: os números contam quando entram na tela
      mm.add(`(max-width: 767px) and ${MOTION_OK}`, () => {
        gsap.utils
          .toArray<HTMLElement>("[data-count]", root.current)
          .forEach((n) =>
            gsap.timeline({ scrollTrigger: { trigger: n, start: "top 88%", once: true, onEnter: () => countUp(n) } }),
          );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="projetos" aria-labelledby="ipsis-titulo" className="on-paper relative bg-paper text-ink">
      <div className="wrap pb-10 pt-28 md:pb-0 md:pt-40">
        <p className="label">Projeto principal</p>
        <h2 id="ipsis-titulo" className="headline mt-4 max-w-[18ch]">
          {ipsis.claim}
        </h2>
        <p className="lead mt-6 max-w-[46ch] text-smoke">
          <strong className="font-semibold text-ink">{ipsis.name}.</strong> {ipsis.summary}
        </p>
      </div>

      <div ref={stage} className="group/stage md:data-[pin=on]:h-[100svh]">
        <div className="wrap grid h-full grid-cols-[minmax(0,1fr)] items-center gap-10 pb-24 md:group-data-[pin=on]/stage:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:group-data-[pin=on]/stage:pb-0">
          {/* texto */}
          <div className="relative flex flex-col gap-16 md:gap-10 md:group-data-[pin=on]/stage:h-[min(34rem,74svh)] md:group-data-[pin=on]/stage:gap-0">
            <div aria-hidden className="hidden gap-2 md:group-data-[pin=on]/stage:flex">
              {steps.map((s) => (
                <span key={s.title} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/12">
                  <span data-bar className="block h-full origin-left bg-ink" />
                </span>
              ))}
            </div>
            {steps.map((s, i) => (
              <article
                key={s.title}
                data-step
                className="md:group-data-[pin=on]/stage:absolute md:group-data-[pin=on]/stage:inset-x-0 md:group-data-[pin=on]/stage:bottom-0 md:group-data-[pin=on]/stage:top-10 md:group-data-[pin=on]/stage:flex md:group-data-[pin=on]/stage:flex-col md:group-data-[pin=on]/stage:justify-center"
              >
                <h3 className="title">{s.title}</h3>
                {i === 0 && <p className="mt-4 max-w-[44ch] text-lg text-smoke">{ipsis.problem}</p>}
                {i === 1 && <p className="mt-4 max-w-[44ch] text-lg text-smoke">{ipsis.solution}</p>}
                {i === 2 && (
                  <>
                    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                      {ipsis.metrics.map((m) => (
                        <Metric key={m.label} metric={m} />
                      ))}
                    </div>
                    <p className="mt-8 max-w-[40ch] font-medium">“{ipsis.principle}”</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={`/projetos/${ipsis.slug}`} className="pill pill-ink">
                        Ver o projeto
                      </Link>
                      <a href={ipsis.repo} className="pill pill-line-ink">
                        Ver código
                        <IconArrowUpRight width={16} height={16} />
                      </a>
                    </div>
                  </>
                )}
                {/* no celular cada passo traz a própria tela */}
                <div className="shot relative mt-8 aspect-[16/10] md:max-w-4xl md:group-data-[pin=on]/stage:hidden">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 768px) 56rem, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </article>
            ))}
            {ipsis.live && (
              <a href={ipsis.live} className="more-link md:group-data-[pin=on]/stage:hidden">
                Abrir o Ipsis no ar <IconChevron />
              </a>
            )}
          </div>

          {/* telas (desktop) */}
          <div aria-hidden className="relative hidden aspect-[16/10] md:group-data-[pin=on]/stage:block">
            {steps.map((s, i) => (
              <figure key={s.title} data-shot className="shot absolute inset-0" style={{ zIndex: i + 1 }}>
                <Image
                  src={s.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 56vw, 1px"
                  className="object-cover object-top"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
