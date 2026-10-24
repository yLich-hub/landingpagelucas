"use client";

import { useRef } from "react";
import { getContent, type Locale } from "@/content";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

const DIGITS = "0123456789".split("");

/**
 * Cena 6 — a trajetória. Fixa: o ano gigante rola dígito a dígito e o cargo troca a cada parada.
 * A lista à direita é o conteúdo de verdade (legível sem JS); o ano grande é decoração.
 */
export function JourneyScene({ locale }: { locale: Locale }) {
  const { journey, stack, ui } = getContent(locale);
  const t = ui.journey;
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        const cols = gsap.utils.toArray<HTMLElement>("[data-digit-col]", scene.current);
        const captions = gsap.utils.toArray<HTMLElement>("[data-caption]", scene.current);
        const rows = gsap.utils.toArray<HTMLElement>("[data-stop]", scene.current);
        let current = -1;
        const show = (idx: number) => {
          if (idx === current) return;
          current = idx;
          const year = journey[idx].year;
          cols.forEach((col, i) =>
            gsap.to(col, {
              yPercent: -10 * Number(year[i]),
              duration: 0.9,
              ease: "expo.out",
              delay: i * 0.05,
              overwrite: true,
            }),
          );
          captions.forEach((c, i) =>
            gsap.to(c, {
              autoAlpha: i === idx ? 1 : 0,
              y: i === idx ? 0 : i < idx ? -24 : 24,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            }),
          );
          rows.forEach((r, i) => r.toggleAttribute("data-active", i === idx));
        };
        // a coluna já vem com translateY em % do HTML: zera o y em px para o yPercent não somar
        cols.forEach((col, i) => gsap.set(col, { y: 0, yPercent: -10 * Number(journey[0].year[i]) }));
        gsap.set(captions, { autoAlpha: 0, y: 24 });
        show(0);
        gsap.fromTo(
          "[data-journey-bar]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene.current,
              start: "top top",
              end: `+=${journey.length * 55}%`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => show(Math.min(journey.length - 1, Math.floor(self.progress * journey.length))),
            },
          },
        );
        return () => rows.forEach((r) => r.removeAttribute("data-active"));
      });
      // celular: sem cena fixa (não caberia na tela); cada parada acende ao passar pelo meio da tela
      mm.add(`(max-width: 767px) and ${MOTION_OK}`, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-stop]", scene.current);
        rows.forEach((r) =>
          ScrollTrigger.create({
            trigger: r,
            start: "top 62%",
            end: "bottom 62%",
            onToggle: (self) => r.toggleAttribute("data-active", self.isActive),
          }),
        );
        gsap.fromTo(
          "[data-journey-bar]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-journey-list]", start: "top 62%", end: "bottom 62%", scrub: true },
          },
        );
        return () => rows.forEach((r) => r.removeAttribute("data-active"));
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const all = stack.flatMap((g) => g.items);

  return (
    <section ref={root} id="trajetoria" aria-labelledby="trajetoria-titulo" className="relative bg-ink">
      <div ref={scene} className="flex flex-col justify-center py-24 md:min-h-[100svh]">
        <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
          <div>
            <p className="label">{t.label}</p>
            <h2 id="trajetoria-titulo" className="headline mt-3 max-w-[16ch]">
              {t.title}
            </h2>
            {/* ano gigante (decorativo) */}
            <div aria-hidden className="relative mt-10 hidden md:motion-safe:block">
              <div className="tabular flex text-[clamp(5.5rem,17vw,15rem)] font-semibold leading-none tracking-[-0.06em] text-cream">
                {journey[0].year.split("").map((d, i) => (
                  <span key={i} className="relative block h-[1em] overflow-hidden">
                    <span data-digit-col className="block" style={{ transform: `translateY(${-10 * Number(d)}%)` }}>
                      {DIGITS.map((d) => (
                        <span key={d} className="block h-[1em]">
                          {d}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
                <span className="ml-[0.06em] mt-[0.72em] block size-[0.13em] bg-amber" />
              </div>
              <div className="relative mt-4 h-20">
                {journey.map((s, i) => (
                  <div key={s.year} data-caption className={`absolute inset-0 ${i === 0 ? "" : "invisible"}`}>
                    <p className="title">{s.title}</p>
                    <p className="mt-1 text-ash">{s.place}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-journey-list className="relative">
            <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-white/10">
              <div data-journey-bar className="h-full origin-top bg-amber" />
            </div>
            <ol className="relative space-y-7">
              {journey.map((s) => (
                <li key={s.year + s.title} data-stop className="group grid grid-cols-[11px_minmax(0,1fr)] gap-5">
                  <span
                    aria-hidden
                    className="mt-[0.45rem] size-[11px] bg-ink-4 transition-colors duration-500 group-data-[active]:bg-amber"
                  />
                  <div>
                    <p className="text-sm text-ash">
                      <span className="tabular">{s.period}</span>
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.02em] transition-colors duration-500 motion-safe:text-ash motion-safe:group-data-[active]:text-cream">
                      {s.title}
                    </p>
                    <p className="text-ash">{s.place}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* stack: lista agrupada + faixa */}
      <div className="border-t border-white/6 py-20 md:py-28">
        <div className="wrap">
          <h2 className="title">{t.stackTitle}</h2>
          <dl className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stack.map((g) => (
              <div key={g.group}>
                <dt className="text-sm text-ash">{g.group}</dt>
                <dd className="mt-2 space-y-1">
                  {g.items.map((it) => (
                    <p key={it} className="font-medium">
                      {it}
                    </p>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="marquee-wrap mt-16 overflow-hidden" aria-hidden>
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_rgb(243_241_236/.28)] motion-reduce:hidden">
            {[...all, ...all].map((it, i) => (
              <span key={i} className="flex items-center gap-10">
                {it}
                <span className="block size-3 bg-amber/70" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
