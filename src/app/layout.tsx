import type { Metadata, Viewport } from "next";
import { Inter_Tight, Silkscreen } from "next/font/google";
import { Suspense } from "react";
import { ContactFab } from "@/components/ContactFab";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { person, seo } from "@/content/site";
import { personJsonLd } from "@/lib/schema";
import "./globals.css";

// o site inteiro é estático: nada renderiza por requisição
export const ensureStatic = "navigation";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});
const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(person.url),
  title: { default: seo.defaultTitle, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: person.name, url: person.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "lucas.vieira",
    title: seo.defaultTitle,
    description: seo.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: seo.defaultTitle, description: seo.description },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = { themeColor: "#09090c", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${interTight.variable} ${silkscreen.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="pill pill-amber fixed left-4 top-3 z-[100] -translate-y-24 focus-visible:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Suspense>
          <SiteHeader />
        </Suspense>
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <Suspense>
          <ContactFab />
          <SmoothScroll />
        </Suspense>
        <RevealObserver />
        <JsonLd data={personJsonLd()} />
      </body>
    </html>
  );
}
