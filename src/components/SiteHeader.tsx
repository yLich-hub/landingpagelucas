"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { files, getContent, paths, type Locale } from "@/content";
import { useScrolledPast } from "@/lib/use-scrolled";
import { IconClose, IconMenu } from "./icons";
import { LangSwitch } from "./LangSwitch";

export function SiteHeader({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = c.ui.header;
  const cv = locale === "en" ? (files.cvEn ?? files.cv) : files.cv;
  const pathname = usePathname();
  const isHome = pathname === paths.home(locale);
  const scrolled = useScrolledPast(isHome ? 1.75 : 0, 24);
  const menu = useRef<HTMLDialogElement>(null);

  // na home o cabeçalho some no topo (o logo e o seletor de idioma já estão no hero)
  const hidden = isHome && !scrolled;

  return (
    <>
      <header
        data-hidden={hidden}
        className="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-quart)] data-[hidden=true]:not-focus-within:-translate-y-full"
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href={paths.home(locale)}
            className="-m-2 inline-flex min-h-11 items-center p-2"
            aria-label={t.homeAria}
          >
            <Image
              src="/images/marca/logo-claro.svg"
              alt=""
              width={467}
              height={83}
              unoptimized
              className="h-[1.15rem] w-auto"
            />
          </Link>
          <div className="flex items-center gap-2">
            <nav aria-label={t.mainNav} className="hidden items-center gap-1 md:flex">
              {c.navigation.map((item) => (
                <Link
                  key={item.hash}
                  href={paths.anchor(locale, item.hash)}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] text-ash transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LangSwitch locale={locale} />
            <a href={cv} className="pill pill-sm pill-light ml-1 hidden md:inline-flex" download>
              {t.downloadCv}
            </a>
            <button
              type="button"
              className="pill pill-sm pill-glass md:hidden"
              aria-label={t.openMenu}
              onClick={() => menu.current?.showModal()}
            >
              <IconMenu />
            </button>
          </div>
        </div>
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 bg-ink/72 shadow-[inset_0_-1px_0_rgb(255_255_255/.06)] backdrop-blur-xl transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <dialog ref={menu} className="sheet" aria-label={t.menu}>
        <div className="wrap flex h-16 items-center justify-between">
          <Image
            src="/images/marca/logo-claro.svg"
            alt="lucas.vieira"
            width={467}
            height={83}
            unoptimized
            className="h-[1.15rem] w-auto"
          />
          <button
            type="button"
            className="pill pill-sm pill-glass"
            aria-label={t.closeMenu}
            onClick={() => menu.current?.close()}
          >
            <IconClose />
          </button>
        </div>
        <nav aria-label={t.mobileNav} className="wrap mt-10 flex flex-col">
          {[{ hash: "", label: t.home }, ...c.navigation].map((item) => (
            <Link
              key={item.hash || "home"}
              href={item.hash ? paths.anchor(locale, item.hash) : paths.home(locale)}
              onClick={() => menu.current?.close()}
              className="headline border-b border-white/8 py-4"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={cv} download className="pill pill-light">
              {t.downloadCvPdf}
            </a>
            <LangSwitch locale={locale} landmark={false} />
          </div>
        </nav>
      </dialog>
    </>
  );
}
