import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/content/photos";
import type { Project } from "@/content/site";
import { projects } from "@/content/site";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/schema";
import { Metric } from "./home/Metric";
import { IconArrowUpRight, IconChevron, IconGithub } from "./icons";
import { JsonLd } from "./JsonLd";

type Gallery = { title: string; note?: string; photo: Photo }[];

/** Página interna de projeto: hero com a tela principal, capítulos alternando texto e captura. */
export function ProjectPage({
  project,
  hero,
  chapters,
  gallery,
  galleryTitle,
}: {
  project: Project;
  hero: Photo;
  chapters: { title: string; text: string; photo: Photo }[];
  gallery: Gallery;
  galleryTitle: string;
}) {
  const next = projects.find((p) => p.slug !== project.slug)!;
  return (
    <>
      <section className="bg-ink pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="wrap">
          <nav aria-label="Trilha" className="text-sm text-ash">
            <Link href="/#projetos" className="inline-flex min-h-11 items-center gap-1 hover:text-cream">
              <IconChevron className="rotate-180" />
              Projetos
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
                Abrir o site
                <IconArrowUpRight width={16} height={16} />
              </a>
            )}
            <a href={project.repo} className="pill pill-glass">
              <IconGithub width={18} height={18} />
              Ver código
            </a>
          </div>
          {project.liveNote && <p className="mt-4 text-sm text-ash">O site está no ar; {project.liveNote}.</p>}
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
          Como foi feito
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

      <section aria-labelledby="numeros" className="on-paper bg-paper py-24 text-ink md:py-32">
        <div className="wrap">
          <h2 id="numeros" className="title">
            Em números
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {project.metrics.map((m) => (
              <Metric key={m.label} metric={m} />
            ))}
          </div>
          <blockquote className="headline mt-20 max-w-[22ch]">“{project.principle}”</blockquote>
          <div className="mt-16">
            <h2 className="text-sm font-medium text-smoke">Stack</h2>
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
        </div>
      </section>

      <section aria-label="Próximo projeto" className="bg-ink py-24">
        <div className="wrap flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-ash">Próximo projeto</p>
            <p className="headline mt-2">{next.name}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={`/projetos/${next.slug}`} className="pill pill-light">
              Ver {next.name}
            </Link>
            <Link href="/#convite" className="pill pill-glass">
              Montar um convite
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Projetos", path: "/#projetos" },
          { name: project.name, path: `/projetos/${project.slug}` },
        ])}
      />
    </>
  );
}
