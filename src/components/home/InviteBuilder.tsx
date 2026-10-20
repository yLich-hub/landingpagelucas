"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { contact, invite } from "@/content/site";
import { photos } from "@/content/photos";
import { hasWhatsapp, mailtoUrl, whatsappUrl } from "@/lib/links";
import { IconMail, IconWhatsapp } from "../icons";

type Reason = (typeof invite.reasons)[number];
type Mode = (typeof invite.modes)[number];

export function buildInviteMessage({
  reason,
  mode,
  name,
  company,
  notes,
}: {
  reason: Reason;
  mode: Mode;
  name: string;
  company: string;
  notes: string;
}) {
  const who = name.trim() || "[seu nome]";
  const lines = [
    `Olá, Lucas! Aqui é ${who}${company.trim() ? `, da ${company.trim()}` : ""}.`,
    `${reason.sentence}, no modelo ${mode.label.toLowerCase()}.`,
  ];
  if (notes.trim()) lines.push("", notes.trim());
  return lines.join("\n");
}

/** Cena 7 — a peça que converte: escolhas → mensagem pronta → e-mail ou WhatsApp. */
export function InviteBuilder() {
  const id = useId();
  const [reason, setReason] = useState<Reason>(invite.reasons[0]);
  const [mode, setMode] = useState<Mode>(invite.modes[0]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const message = useMemo(
    () => buildInviteMessage({ reason, mode, name, company, notes }),
    [reason, mode, name, company, notes],
  );

  const send = (channel: "email" | "whatsapp") => {
    if (name.trim().length < 2) {
      setError("Escreva seu nome para a mensagem.");
      document.getElementById(`${id}-nome`)?.focus();
      return;
    }
    setError("");
    const url = channel === "email" ? mailtoUrl(message, `${reason.label} — ${invite.subject}`) : whatsappUrl(message);
    if (channel === "whatsapp") return void window.open(url, "_blank", "noopener,noreferrer");
    // âncora em vez de location.href: abre o cliente de e-mail sem sair da página
    const a = document.createElement("a");
    a.href = url;
    a.click();
  };

  const option = (pressed: boolean) =>
    `pill pill-sm ${pressed ? "pill-ink" : "pill-line-ink"} aria-pressed:shadow-[0_0_0_2px_var(--color-paper),0_0_0_4px_var(--color-ink)]`;

  return (
    <section id="convite" aria-labelledby="convite-form-titulo" className="on-paper bg-paper py-28 text-ink md:py-40">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="label">Contato</p>
          <h2 id="convite-form-titulo" className="headline mt-3 max-w-[14ch]">
            Monte o convite.
          </h2>
          <p className="lead mt-5 max-w-[40ch] text-smoke">
            Escolha o assunto e o formato. A mensagem sai pronta no seu e-mail{hasWhatsapp ? " ou no WhatsApp" : ""}.
          </p>

          <form
            className="mt-10 space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              send("email");
            }}
            noValidate
          >
            <fieldset className="min-w-0">
              <legend className="text-sm font-medium">Sobre o que é?</legend>
              <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto bg-paper px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                {invite.reasons.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={reason.id === r.id}
                    onClick={() => setReason(r)}
                    className={option(reason.id === r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="text-sm font-medium">Formato</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {invite.modes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={mode.id === m.id}
                    onClick={() => setMode(m)}
                    className={option(mode.id === m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Seu nome</span>
                <input
                  id={`${id}-nome`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? `${id}-erro` : undefined}
                  className="mt-2 block h-12 w-full rounded-2xl bg-white px-4 text-base shadow-[inset_0_0_0_1px_rgb(9_9_12/.14)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-ink)]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Empresa (opcional)</span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                  className="mt-2 block h-12 w-full rounded-2xl bg-white px-4 text-base shadow-[inset_0_0_0_1px_rgb(9_9_12/.14)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-ink)]"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium">Algo mais? (opcional)</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-2 block w-full resize-y rounded-2xl bg-white px-4 py-3 text-base shadow-[inset_0_0_0_1px_rgb(9_9_12/.14)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-ink)]"
              />
            </label>
          </form>
        </div>

        {/* prévia */}
        <div className="min-w-0 lg:pt-24">
          <div className="rounded-[28px] bg-ink p-6 text-cream shadow-[0_50px_100px_-40px_rgb(30_25_10/.55)] md:p-8">
            <div className="flex items-center gap-3">
              <Image
                src={photos.lucasFace.src}
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="font-medium">Lucas Maciel Vieira</p>
                <p className="truncate text-sm text-ash">{contact.email}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-ash">Sua mensagem</p>
            <p key={`${reason.id}-${mode.id}`} className="swap-in mt-2 whitespace-pre-wrap text-lg leading-relaxed">
              {message}
            </p>
            {error && (
              <p id={`${id}-erro`} role="alert" className="mt-5 text-[#fca5a5]">
                {error}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => send("email")} className="pill pill-light">
                <IconMail width={18} height={18} />
                Enviar por e-mail
              </button>
              {hasWhatsapp && (
                <button type="button" onClick={() => send("whatsapp")} className="pill pill-wa">
                  <IconWhatsapp width={18} height={18} />
                  Enviar pelo WhatsApp
                </button>
              )}
            </div>
          </div>
          <p className="mt-5 text-sm text-smoke">
            Prefere copiar? O e-mail é{" "}
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4"
            >
              {contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
