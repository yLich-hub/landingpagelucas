import Image from "next/image";
import Link from "next/link";
import { contact, files, person, projects, social } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-ink pb-28 pt-16 md:pb-16">
      <div className="wrap grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Image
            src="/images/marca/logo-claro.svg"
            alt="lucas.vieira"
            width={467}
            height={83}
            unoptimized
            className="h-6 w-auto"
          />
          <p className="mt-5 max-w-xs text-[0.95rem] text-ash">
            {person.role}, {person.city}. Disponível para trabalho {person.availability}.
          </p>
        </div>
        <nav aria-label="Projetos">
          <h2 className="text-sm font-medium text-cream">Projetos</h2>
          <ul className="mt-3 space-y-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="inline-flex min-h-11 items-center text-ash hover:text-cream"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Contato e redes">
          <h2 className="text-sm font-medium text-cream">Contato</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 items-center break-all text-ash hover:text-cream"
              >
                {contact.email}
              </a>
            </li>
            <li>
              <a href={social.github} className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                GitHub
              </a>
            </li>
            <li>
              <a href={social.linkedin} className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={social.instagram} className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                Instagram
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Documentos">
          <h2 className="text-sm font-medium text-cream">Documentos</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={files.cv} download className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                Currículo (PDF)
              </a>
            </li>
            <li>
              <a href={files.diploma} download className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                Diploma de Administração (PDF)
              </a>
            </li>
            <li>
              <a href={social.siteRepo} className="inline-flex min-h-11 items-center text-ash hover:text-cream">
                Código deste site
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="wrap mt-14 text-sm text-ash">
        <span className="font-pixel text-amber" aria-hidden>
          &gt;{" "}
        </span>
        Feito em Cascavel, com Next.js. Todas as telas são dos projetos reais.
      </p>
    </footer>
  );
}
