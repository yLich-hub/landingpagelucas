import Image from "next/image";
import Link from "next/link";
import { contact, files, getContent, paths, social, type Locale } from "@/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = c.ui.footer;
  const cv = locale === "en" ? (files.cvEn ?? files.cv) : files.cv;
  const link = "inline-flex min-h-11 items-center text-ash hover:text-cream";
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
            {c.person.role}, {c.person.city}. {t.available} {c.person.availability}.
          </p>
        </div>
        <nav aria-label={t.projects}>
          <h2 className="text-sm font-medium text-cream">{t.projects}</h2>
          <ul className="mt-3 space-y-1">
            {c.projects.map((p) => (
              <li key={p.slug}>
                <Link href={paths.project(locale, p.slug)} className={link}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.contact}>
          <h2 className="text-sm font-medium text-cream">{t.contact}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={`mailto:${contact.email}`} className={`${link} break-all`}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={social.github} className={link}>
                GitHub
              </a>
            </li>
            <li>
              <a href={social.linkedin} className={link}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={social.instagram} className={link}>
                Instagram
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label={t.documents}>
          <h2 className="text-sm font-medium text-cream">{t.documents}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a href={cv} download className={link}>
                {t.cv}
              </a>
            </li>
            <li>
              <a href={files.diploma} download className={link}>
                {t.diploma}
              </a>
            </li>
            <li>
              <a href={social.siteRepo} className={link}>
                {t.siteCode}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="wrap mt-14 text-sm text-ash">
        <span className="font-pixel text-amber" aria-hidden>
          &gt;{" "}
        </span>
        {t.made}
      </p>
    </footer>
  );
}
