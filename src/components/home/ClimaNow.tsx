"use client";

import { useEffect, useRef, useState } from "react";
import type { ClimaNow as Now } from "@/app/api/clima-agora/route";
import { getContent, type Locale } from "@/content";

/**
 * Selo "Agora em Cascavel": o tempo real, lido da API do próprio projeto quando a cena chega perto.
 * Sem dado válido, não mostra nada (o espaço fica reservado para não pular o layout).
 */
export function ClimaNow({ locale, className }: { locale: Locale; className?: string }) {
  const t = getContent(locale).ui.climaNow;
  const ref = useRef<HTMLParagraphElement>(null);
  const [now, setNow] = useState<Now | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctrl = new AbortController();
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        fetch(`/api/clima-agora${locale === "en" ? "?lang=en" : ""}`, { signal: ctrl.signal })
          .then((r) => (r.ok ? (r.json() as Promise<Now>) : { ok: false as const }))
          .then(setNow)
          .catch(() => setNow({ ok: false }));
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ctrl.abort();
    };
  }, [locale]);

  const shown = now?.ok ? now : null;
  return (
    <p ref={ref} className={`min-h-11 ${className ?? ""}`}>
      {shown && (
        <span className="swap-in pill pill-glass pill-sm inline-flex h-auto flex-wrap justify-center gap-x-2 whitespace-normal py-2.5 text-[0.95rem]">
          <span
            aria-hidden
            className={`size-2 ${shown.status === "fresh" ? "bg-[#34d399] shadow-[0_0_10px_#34d399]" : "bg-amber"}`}
          />
          <span>
            {t.now} <strong className="tabular font-semibold">{shown.tempC} °C</strong>
            {shown.label ? `, ${shown.label}` : ""}
          </span>
          <span className="text-ash">
            {t.reading} {shown.time}
            {t.tz}, {t.source}
          </span>
        </span>
      )}
    </p>
  );
}
