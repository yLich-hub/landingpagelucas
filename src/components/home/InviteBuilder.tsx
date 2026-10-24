"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { contact, getContent, type Content, type Locale } from "@/content";
import { getPhotos } from "@/content/photos";
import { hasWhatsapp, mailtoUrl, whatsappUrl } from "@/lib/links";
import { IconMail, IconWhatsapp } from "../icons";

type Invite = Content["invite"];
type Reason = Invite["reasons"][number];
type Mode = Invite["modes"][number];

export function buildInviteMessage(
  invite: Invite,
  { reason, mode, name, company, notes }: { reason: Reason; mode: Mode; name: string; company: string; notes: string },
) {
  const lines = [
    invite.greeting(name.trim() || invite.nameFallback, company.trim()),
    invite.line(reason.sentence, mode.phrase),
  ];
  if (notes.trim()) lines.push("", notes.trim());
  return lines.join("\n");
}

/** Cena 7 — a peça que converte: escolhas → mensagem pronta → e-mail ou WhatsApp. */
export function InviteBuilder({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { invite } = c;
  const t = c.ui.invite;
  const photos = getPhotos(locale);
  const id = useId();
  const [reasonId, setReasonId] = useState(invite.reasons[0].id);
  const [modeId, setModeId] = useState(invite.modes[0].id);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(false);
  const reason = invite.reasons.find((r) => r.id === reasonId) ?? invite.reasons[0];
  const mode = invite.modes.find((m) => m.id === modeId) ?? invite.modes[0];

  const message = useMemo(
    () => buildInviteMessage(invite, { reason, mode, name, company, notes }),
    [invite, reason, mode, name, company, notes],
  );

  const send = (channel: "email" | "whatsapp") => {
    if (name.trim().length < 2) {
      setError(true);
      document.getElementById(`${id}-nome`)?.focus();
      return;
    }
    setError(false);
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
          <p className="label">{t.label}</p>
          <h2 id="convite-form-titulo" className="headline mt-3 max-w-[14ch]">
            {t.title}
          </h2>
          <p className="lead mt-5 max-w-[40ch] text-smoke">
            {t.lead}
            {hasWhatsapp ? t.leadWhatsapp : ""}.
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
              <legend className="text-sm font-medium">{t.reason}</legend>
              <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto bg-paper px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
                {invite.reasons.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={reason.id === r.id}
                    onClick={() => setReasonId(r.id)}
                    className={option(reason.id === r.id)}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="min-w-0">
              <legend className="text-sm font-medium">{t.format}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {invite.modes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={mode.id === m.id}
                    onClick={() => setModeId(m.id)}
                    className={option(mode.id === m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">{t.name}</span>
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
                <span className="text-sm font-medium">{t.company}</span>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                  className="mt-2 block h-12 w-full rounded-2xl bg-white px-4 text-base shadow-[inset_0_0_0_1px_rgb(9_9_12/.14)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_var(--color-ink)]"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium">{t.notes}</span>
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
            <p className="mt-6 text-sm text-ash">{t.yourMessage}</p>
            <p key={`${reason.id}-${mode.id}`} className="swap-in mt-2 whitespace-pre-wrap text-lg leading-relaxed">
              {message}
            </p>
            {error && (
              <p id={`${id}-erro`} role="alert" className="mt-5 text-[#fca5a5]">
                {t.nameError}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => send("email")} className="pill pill-light">
                <IconMail width={18} height={18} />
                {t.sendEmail}
              </button>
              {hasWhatsapp && (
                <button type="button" onClick={() => send("whatsapp")} className="pill pill-wa">
                  <IconWhatsapp width={18} height={18} />
                  {t.sendWhatsapp}
                </button>
              )}
            </div>
          </div>
          <p className="mt-5 text-sm text-smoke">
            {t.copy}{" "}
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
