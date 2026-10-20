import Image from "next/image";
import { contact, education, files, person, social } from "@/content/site";
import { photos } from "@/content/photos";
import { hasWhatsapp, whatsappUrl } from "@/lib/links";
import { messages } from "@/content/site";
import { LazyMap } from "../LazyMap";
import { IconDownload, IconGithub, IconInstagram, IconLinkedin, IconWhatsapp } from "../icons";

const MAP_EMBED = "https://www.google.com/maps?q=Cascavel,+Paran%C3%A1&z=12&output=embed";
const MAP_OPEN = "https://www.google.com/maps/place/Cascavel+-+PR";

/** Cena 8 — fechamento: o ponto volta como cursor; contato, cidade, formação e redes. */
export function ContactScene() {
  return (
    <section aria-labelledby="conversar-titulo" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div aria-hidden className="absolute inset-0 opacity-25">
        <Image src={photos.climaCloudy.src} alt="" fill sizes="100vw" className="object-cover blur-2xl" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ink),rgb(9_9_12/.7)_40%,var(--color-ink))]"
      />

      <div className="wrap relative">
        <h2 id="conversar-titulo" className="display max-w-[12ch]">
          <span className="caret">Vamos conversar?</span>
        </h2>
        <p className="lead mt-6 max-w-[40ch] text-ash">Aberto a oportunidades. O caminho mais rápido é o e-mail:</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-4 inline-block break-all py-1.5 text-[clamp(1.375rem,3.4vw,2.5rem)] font-semibold tracking-[-0.03em] text-amber underline decoration-amber/40 underline-offset-[0.18em] hover:decoration-amber"
        >
          {contact.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          {hasWhatsapp && (
            <a href={whatsappUrl(messages.fab)} target="_blank" rel="noopener noreferrer" className="pill pill-wa">
              <IconWhatsapp width={18} height={18} />
              Chamar no WhatsApp
            </a>
          )}
          <a href={files.cv} download className="pill pill-light">
            <IconDownload width={18} height={18} />
            Baixar currículo (PDF)
          </a>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
          <div className="card p-7">
            <h3 className="text-sm text-ash">Onde</h3>
            <p className="title mt-2">{person.city}</p>
            <p className="mt-2 text-ash">Disponível para trabalho {person.availability}.</p>
          </div>
          <div className="card p-7">
            <h3 className="text-sm text-ash">Formação</h3>
            <ul className="mt-3 space-y-3">
              {education.map((e) => (
                <li key={e.course}>
                  <p className="font-medium">{e.course}</p>
                  <p className="text-sm text-ash">{e.school}</p>
                  {e.diploma && (
                    <a href={e.diploma} download className="more-link text-sm">
                      Baixar diploma (PDF)
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-sm text-ash">Redes</h3>
            <ul className="mt-3 space-y-1">
              {[
                { href: social.github, label: "GitHub", Icon: IconGithub },
                { href: social.linkedin, label: "LinkedIn", Icon: IconLinkedin },
                { href: social.instagram, label: "Instagram", Icon: IconInstagram },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} className="inline-flex min-h-11 items-center gap-3 font-medium hover:text-amber">
                    <Icon />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <LazyMap embedUrl={MAP_EMBED} openUrl={MAP_OPEN} title="Mapa de Cascavel, Paraná" />
          </div>
        </div>
      </div>
    </section>
  );
}
