"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { files, navigation } from "@/content/site";
import { useScrolledPast } from "@/lib/use-scrolled";
import { IconClose, IconMenu } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolledPast(isHome ? 1.75 : 0, 24);
  const menu = useRef<HTMLDialogElement>(null);

  // na home o cabeçalho some no topo (o logo já está no hero)
  const hidden = isHome && !scrolled;

  return (
    <>
      <header
        data-hidden={hidden}
        className="fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out-quart)] data-[hidden=true]:not-focus-within:-translate-y-full"
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href="/"
            className="-m-2 inline-flex min-h-11 items-center p-2"
            aria-label="lucas.vieira, ir para o início"
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
          <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] text-ash transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
            <a href={files.cv} className="pill pill-sm pill-light ml-2" download>
              Baixar currículo
            </a>
          </nav>
          <button
            type="button"
            className="pill pill-sm pill-glass md:hidden"
            aria-label="Abrir menu"
            onClick={() => menu.current?.showModal()}
          >
            <IconMenu />
          </button>
        </div>
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 bg-ink/72 shadow-[inset_0_-1px_0_rgb(255_255_255/.06)] backdrop-blur-xl transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </header>

      <dialog ref={menu} className="sheet" aria-label="Menu">
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
            aria-label="Fechar menu"
            onClick={() => menu.current?.close()}
          >
            <IconClose />
          </button>
        </div>
        <nav aria-label="Menu do celular" className="wrap mt-10 flex flex-col">
          {[{ href: "/", label: "Início" }, ...navigation].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => menu.current?.close()}
              className="headline border-b border-white/8 py-4"
            >
              {item.label}
            </Link>
          ))}
          <a href={files.cv} download className="pill pill-light mt-10 self-start">
            Baixar currículo (PDF)
          </a>
        </nav>
      </dialog>
    </>
  );
}
