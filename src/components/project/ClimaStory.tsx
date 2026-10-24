"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/photos";

/**
 * A história do El Niño, do jeito que ela é no projeto: a tela fica presa e troca de passo
 * conforme as legendas passam pelo meio da tela. Sem JS, cada passo traz a própria captura.
 */
export function ClimaStory({
  title,
  lead,
  steps,
}: {
  title: string;
  lead: string;
  steps: { caption: string; photo: Photo }[];
}) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="historia-titulo"
      className="bg-[linear-gradient(to_bottom,var(--color-ink),#0c1426_30%,#0c1426_70%,var(--color-ink))] py-24 md:py-32"
    >
      <div className="wrap">
        <h2 id="historia-titulo" className="headline max-w-[18ch]">
          {title}
        </h2>
        <p className="lead mt-5 max-w-[48ch] text-ash">{lead}</p>
      </div>
      <div className="wrap mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 md:mt-16 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
        <ol className="space-y-10 md:space-y-0">
          {steps.map((s, i) => (
            <li
              key={s.caption}
              data-i={i}
              ref={(el) => {
                items.current[i] = el;
              }}
              aria-current={active === i ? "step" : undefined}
              className="group md:flex md:min-h-[70svh] md:items-center"
            >
              <div>
                <p className="text-sm text-ash">
                  <span className="tabular">Passo {i + 1}</span> de {steps.length}
                </p>
                <p className="title mt-2 max-w-[18ch] transition-colors duration-500 md:text-ash md:group-aria-[current=step]:text-cream">
                  {s.caption}
                </p>
                {/* no celular (e sem JS), cada passo com a própria tela */}
                <div className="shot relative mt-6 aspect-[16/10] md:hidden">
                  <Image src={s.photo.src} alt={s.photo.alt} fill sizes="92vw" className="object-cover object-top" />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div aria-hidden className="hidden md:block">
          <div className="sticky top-[calc(50svh_-_15rem)]">
            <div className="shot relative aspect-[16/10]">
              {steps.map((s, i) => (
                <Image
                  key={s.photo.src}
                  src={s.photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 60vw, 1px"
                  className={`object-cover object-top transition-opacity duration-700 ease-[var(--ease-out-quart)] ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              {steps.map((s, i) => (
                <span key={s.caption} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className={`block h-full bg-amber transition-[width] duration-700 ${i <= active ? "w-full" : "w-0"}`}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
