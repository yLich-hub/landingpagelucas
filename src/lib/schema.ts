import { getContent, paths, site, social, type Locale, type Project } from "@/content";
import { stackItems } from "@/content/shared";

const abs = (path: string) => new URL(path, site.url).toString();

export function personJsonLd(locale: Locale) {
  const c = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: abs(paths.home(locale)),
    name: `${site.name} — ${locale === "en" ? "portfolio" : "portfólio"}`,
    inLanguage: c.htmlLang,
    mainEntity: {
      "@type": "Person",
      "@id": `${site.url}#lucas`,
      name: site.name,
      alternateName: site.mark,
      jobTitle: c.person.role,
      description: c.person.shortBio,
      image: abs("/images/perfil/lucas-retrato.webp"),
      url: abs(paths.home(locale)),
      address: { "@type": "PostalAddress", addressLocality: "Cascavel", addressRegion: "PR", addressCountry: "BR" },
      alumniOf: c.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      knowsLanguage: ["pt-BR", "en"],
      knowsAbout: Object.values(stackItems).flat(),
      sameAs: [social.github, social.linkedin, social.instagram],
    },
  };
}

export function projectJsonLd(project: Project, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    inLanguage: getContent(locale).htmlLang,
    codeRepository: project.repo,
    url: abs(paths.project(locale, project.slug)),
    programmingLanguage: "TypeScript",
    runtimePlatform: project.stack.join(", "),
    author: { "@id": `${site.url}#lucas` },
    ...(project.live ? { targetProduct: { "@type": "WebApplication", name: project.name, url: project.live } } : {}),
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  const home = { name: getContent(locale).ui.header.home, path: paths.home(locale) };
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [home, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
