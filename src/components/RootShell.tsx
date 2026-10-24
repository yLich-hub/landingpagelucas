import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { interTight, silkscreen } from "@/app/fonts";
import { getContent, paths, site, translatePath, type Locale } from "@/content";
import { personJsonLd } from "@/lib/schema";
import { ContactFab } from "./ContactFab";
import { JsonLd } from "./JsonLd";
import { RevealObserver } from "./motion/RevealObserver";
import { SmoothScroll } from "./motion/SmoothScroll";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** <html> e <body> de cada idioma. app/(pt)/layout.tsx e app/(en)/layout.tsx só escolhem o idioma. */
export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const c = getContent(locale);
  return (
    <html lang={c.htmlLang} className={`${interTight.variable} ${silkscreen.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="pill pill-amber fixed left-4 top-3 z-[100] -translate-y-24 focus-visible:translate-y-0"
        >
          {c.ui.skip}
        </a>
        <Suspense>
          <SiteHeader locale={locale} />
        </Suspense>
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <Suspense>
          <ContactFab locale={locale} />
          <SmoothScroll />
        </Suspense>
        <RevealObserver />
        <JsonLd data={personJsonLd(locale)} />
      </body>
    </html>
  );
}

/** Metadados de cada idioma, com hreflang apontando para a mesma página no outro. */
export function rootMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: c.seo.defaultTitle, template: c.seo.titleTemplate },
    description: c.seo.description,
    keywords: c.seo.keywords,
    authors: [{ name: site.name, url: site.url }],
    alternates: pageAlternates(paths.home(locale)),
    openGraph: {
      type: "website",
      locale: c.ogLocale,
      alternateLocale: locale === "en" ? ["pt_BR"] : ["en_US"],
      siteName: site.mark,
      title: c.seo.defaultTitle,
      description: c.seo.description,
      url: paths.home(locale),
    },
    twitter: { card: "summary_large_image", title: c.seo.defaultTitle, description: c.seo.description },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

/** canonical + hreflang de uma página (pt-BR, en e x-default no português). */
export function pageAlternates(path: string): Metadata["alternates"] {
  const pt = translatePath(path, "pt");
  const en = translatePath(path, "en");
  return { canonical: path, languages: { "pt-BR": pt, en, "x-default": pt } };
}
