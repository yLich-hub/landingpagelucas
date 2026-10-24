import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { interTight, silkscreen } from "./fonts";

// Com duas raízes (português e inglês) não há um layout único para o 404: esta página serve aos dois.
export const metadata: Metadata = {
  title: "404 · lucas.vieira",
  description: "Esta página não existe. This page does not exist.",
  robots: { index: false },
};
export const viewport: Viewport = { themeColor: "#09090c", colorScheme: "dark" };

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={`${interTight.variable} ${silkscreen.variable}`}>
      <body>
        <main className="flex min-h-[100svh] items-center bg-ink py-24">
          <div className="wrap">
            <p className="font-pixel text-amber" aria-hidden>
              <span className="caret">&gt; 404</span>
            </p>
            <h1 className="display mt-6 max-w-[14ch]">Esta página não existe.</h1>
            <p className="lead mt-6 max-w-[40ch] text-ash">
              O endereço pode ter mudado. Os projetos e o contato estão no início.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="pill pill-light">
                Voltar ao início
              </Link>
              <Link href="/#projetos" className="pill pill-glass">
                Ver projetos
              </Link>
            </div>
            <div lang="en" className="mt-16 border-t border-white/8 pt-10">
              <h2 className="title">This page does not exist.</h2>
              <p className="mt-3 max-w-[44ch] text-ash">
                The address may have changed. Projects and contact are on the home page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/en" className="pill pill-light">
                  Back to home
                </Link>
                <Link href="/en#projetos" className="pill pill-glass">
                  See projects
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
