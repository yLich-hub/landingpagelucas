"use client";

import { usePathname } from "next/navigation";
import { getContent, translatePath, type Locale } from "@/content";

const OPTIONS: { locale: Locale; short: string; name: string; htmlLang: string }[] = [
  { locale: "pt", short: "PT", name: "Português", htmlLang: "pt-BR" },
  { locale: "en", short: "EN", name: "English", htmlLang: "en" },
];

/**
 * PT | EN. Leva para a mesma página no outro idioma. Cada idioma tem a própria raiz no Next,
 * então a troca é um link comum (recarrega a página), não navegação do lado do cliente.
 * `landmark={false}` vira um grupo em vez de um <nav> (para não repetir a região na mesma página).
 */
export function LangSwitch({
  locale,
  className,
  landmark = true,
}: {
  locale: Locale;
  className?: string;
  landmark?: boolean;
}) {
  const pathname = usePathname();
  const label = getContent(locale).ui.header.language;
  const list = (
    <ul className="flex rounded-full bg-white/8 p-0.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/.12)] backdrop-blur-md">
      {OPTIONS.map((o) => {
        const current = o.locale === locale;
        return (
          <li key={o.locale}>
            <a
              href={translatePath(pathname, o.locale)}
              hrefLang={o.htmlLang}
              lang={o.htmlLang}
              aria-current={current ? "true" : undefined}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
                current ? "bg-cream text-ink" : "text-ash hover:text-cream"
              }`}
            >
              {/* nome acessível "PT, Português": começa pelo que está escrito na tela */}
              {o.short}
              <span className="sr-only">, {o.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
  return landmark ? (
    <nav aria-label={label} className={className}>
      {list}
    </nav>
  ) : (
    <div role="group" aria-label={label} className={className}>
      {list}
    </div>
  );
}
