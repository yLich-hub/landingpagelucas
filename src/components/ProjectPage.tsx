import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Photo } from "@/content/photos";
import { getContent, paths, type Locale, type Project } from "@/content";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/schema";
import { Metric } from "./home/Metric";
import { IconArrowUpRight, IconChevron, IconGithub } from "./icons";
import { JsonLd } from "./JsonLd";

type Gallery = { title: string; note?: string; photo: Photo }[];

/** Página interna de projeto: hero com a tela principal, capítulos alternando texto e captura. */
export function ProjectPage({
  locale,
  project,
  hero,
  chapters,
  gallery,
  galleryTitle,
  galleryLayout = "grid",
  extra,
}: {
  locale: Locale;
  project: Project;
  hero: Photo;
  chapters: { title: string; text: string; photo: Photo }[];
  gallery: Gallery;
  galleryTitle: string;
  /** "phones": capturas de celular inteiras, em moldura de aparelho */
  galleryLayout?: "grid" | "phones";
  /** seções próprias do projeto, entre os capítulos e os números */
  extra?: ReactNode;
}) {
  const c = getContent(locale);
  const t = c.ui.project;
  const next = c.projects.find((p) => p.slug !== project.slug)!;
  return (
    <>
      <section className="bg-ink pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="wrap">
          <nav aria-label={t.breadcrumb} className="text-sm text-ash">
            <Link
              href={paths.anchor(locale, "projetos")}
              className="inline-flex min-h-11 items-center gap-1 hover:text-cream"
            >
              <IconChevron className="rotate-180" />
              {t.projects}
            </Link>
          </nav>
          <p className="label mt-6">{project.kicker}</p>
          <h1 className="display mt-4 max-w-[16ch]">{project.name}</h1>
          <p className="lead mt-6 max-w-[46ch] text-ash">
            {project.claim} {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.live && (
              <a href={project.live} className="pill pill-light">
                {t.openSite}
                <IconArrowUpRight width={16} height={16} />
              </a>
            )}
            <a href={project.repo} className="pill pill-glass">
              <IconGithub width={18} height={18} />
              {t.seeCode}
            </a>
          </div>
          {project.liveNote && (
            <p className="mt-4 text-sm text-ash">
              {t.liveIntro} {project.liveNote}.
            </p>
          )}
          {t.screensNote && <p className="mt-2 text-sm text-ash">{t.screensNote}</p>}
        </div>
        <div className="wrap mt-14 md:mt-20">
          <div className="shot relative aspect-[16/10]">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              preload
              sizes="(min-width: 1312px) 76rem, 92vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="capitulos" className="bg-ink py-16 md:py-28">
        <h2 id="capitulos" className="sr-only">
          {t.howBuilt}
        </h2>
        <div className="wrap space-y-24 md:space-y-36">
          {chapters.map((c, i) => (
            <article
              key={c.title}
              className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16"
            >
              <div data-reveal className={i % 2 ? "md:order-2" : ""}>
                <h3 className="headline">{c.title}</h3>
                <p className="mt-5 max-w-[46ch] text-lg text-ash">{c.text}</p>
              </div>
              <div
                data-reveal
                style={{ ["--reveal-delay" as string]: "120ms" }}
                className="shot relative aspect-[16/10]"
              >
                <Image
                  src={c.photo.src}
                  alt={c.photo.alt}
                  fill
                  sizes="(min-width: 768px) 56vw, 92vw"
                  className="object-cover object-top"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {extra}

      <section aria-labelledby="numeros" className="on-paper bg-paper py-24 text-ink md:py-32">
        <div className="wrap">
          <h2 id="numeros" className="title">
            {t.numbers}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {project.metrics.map((m) => (
              <Metric key={m.label} metric={m} numberLocale={c.numberLocale} />
            ))}
          </div>
          <blockquote className="headline mt-20 max-w-[22ch]">“{project.principle}”</blockquote>
          <div className="mt-16">
            <h2 className="text-sm font-medium text-smoke">{t.stack}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full bg-paper-2 px-4 py-2 text-[0.95rem] font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="galeria" className="bg-ink-2 py-24 md:py-32">
        <div className="wrap">
          <h2 id="galeria" className="headline max-w-[20ch]">
            {galleryTitle}
          </h2>
          {galleryLayout === "phones" ? (
            <ul
              aria-label={t.phonesAria}
              tabIndex={0}
              className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
            >
              {gallery.map((g, i) => (
                <li
                  key={g.photo.src}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
                  className="w-[62vw] max-w-[16rem] shrink-0 snap-center lg:w-auto lg:max-w-none"
                >
                  <div
                    className="relative overflow-hidden rounded-[2rem] bg-ink-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/.9),inset_0_0_0_1px_rgb(255_255_255/.1)] ring-[5px] ring-ink-4"
                    style={{ aspectRatio: `${g.photo.width} / ${g.photo.height}` }}
                  >
                    <Image
                      src={g.photo.src}
                      alt={g.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 15rem, 62vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold tracking-[-0.02em]">{g.title}</h3>
                  {g.note && <p className="text-ash">{g.note}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <li key={g.photo.src} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
                  <div
                    className="shot relative"
                    style={{
                      aspectRatio:
                        g.photo.width / g.photo.height < 0.8 ? "4 / 5" : `${g.photo.width} / ${g.photo.height}`,
                    }}
                  >
                    <Image
                      src={g.photo.src}
                      alt={g.photo.alt}
                      fill
                      loading={i < 6 ? "eager" : "lazy"}
                      sizes="(min-width: 1024px) 26rem, (min-width: 640px) 46vw, 92vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold tracking-[-0.02em]">{g.title}</h3>
                  {g.note && <p className="text-ash">{g.note}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-label={t.next} className="bg-ink py-24">
        <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-ash">{t.next}</p>
            <p className="headline mt-2">{next.name}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={paths.project(locale, next.slug)} className="pill pill-light">
              {t.see} {next.name}
            </Link>
            <Link href={paths.anchor(locale, "convite")} className="pill pill-glass">
              {t.buildInvite}
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={projectJsonLd(project, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: t.projects, path: paths.anchor(locale, "projetos") },
          { name: project.name, path: paths.project(locale, project.slug) },
        ])}
      />
    </>
  );
}
