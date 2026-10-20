import { education, person, projects, social, stack } from "@/content/site";
import type { Project } from "@/content/site";

const abs = (path: string) => new URL(path, person.url).toString();

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: person.url,
    name: `${person.name} — portfólio`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Person",
      "@id": `${person.url}#lucas`,
      name: person.name,
      alternateName: person.mark,
      jobTitle: person.role,
      description: person.shortBio,
      image: abs("/images/perfil/lucas-retrato.webp"),
      url: person.url,
      address: { "@type": "PostalAddress", addressLocality: "Cascavel", addressRegion: "PR", addressCountry: "BR" },
      alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      knowsLanguage: ["pt-BR", "en"],
      knowsAbout: stack.flatMap((g) => g.items),
      sameAs: [social.github, social.linkedin, social.instagram],
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    codeRepository: project.repo,
    url: abs(`/projetos/${project.slug}`),
    programmingLanguage: "TypeScript",
    runtimePlatform: project.stack.join(", "),
    author: { "@id": `${person.url}#lucas` },
    ...(project.live ? { targetProduct: { "@type": "WebApplication", name: project.name, url: project.live } } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Início", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
