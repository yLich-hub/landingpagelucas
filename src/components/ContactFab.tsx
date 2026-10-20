"use client";

import { usePathname } from "next/navigation";
import { messages } from "@/content/site";
import { hasWhatsapp, mailtoUrl, whatsappUrl } from "@/lib/links";
import { useScrolledPast } from "@/lib/use-scrolled";
import { IconMail, IconWhatsapp } from "./icons";

/** Botão flutuante em todas as páginas: WhatsApp quando há número; senão, e-mail. */
export function ContactFab() {
  // na home entra depois do hero, para não disputar com os botões principais
  const pastHero = useScrolledPast(0.9);
  const shown = usePathname() !== "/" || pastHero;
  const href = hasWhatsapp ? whatsappUrl(messages.fab) : mailtoUrl(messages.fab);
  const label = hasWhatsapp ? "WhatsApp" : "E-mail";
  return (
    <aside aria-label="Contato rápido">
      <a
        href={href}
        target={hasWhatsapp ? "_blank" : undefined}
        rel={hasWhatsapp ? "noopener noreferrer" : undefined}
        aria-label={hasWhatsapp ? "Conversar com o Lucas pelo WhatsApp" : "Mandar um e-mail para o Lucas"}
        data-shown={shown}
        className={`pill fixed right-4 z-40 size-14 p-0 shadow-[0_18px_40px_-12px_rgb(0_0_0/.7)] transition-[opacity,transform,background-color] duration-500 data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-4 data-[shown=false]:opacity-0 md:right-6 md:size-auto md:px-5 md:py-3 ${
          hasWhatsapp ? "pill-wa" : "pill-amber"
        }`}
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        {hasWhatsapp ? <IconWhatsapp width={22} height={22} /> : <IconMail width={22} height={22} />}
        <span className="hidden md:inline">{label}</span>
      </a>
    </aside>
  );
}
