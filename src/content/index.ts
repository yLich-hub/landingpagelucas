import { en } from "./en";
import { pt, type Content, type Project } from "./pt";
import type { Locale } from "./shared";

export type { Content, Project, Locale };
export type { Metric, Stop } from "./pt";
export { contact, files, links, site, social, climaLighthouse } from "./shared";

export const locales: Locale[] = ["pt", "en"];

export function getContent(locale: Locale): Content {
  return locale === "en" ? en : pt;
}

/** Endereços de cada idioma. O português fica na raiz (links antigos continuam valendo). */
export const paths = {
  home: (l: Locale) => (l === "en" ? "/en" : "/"),
  anchor: (l: Locale, hash: string) => (l === "en" ? `/en#${hash}` : `/#${hash}`),
  project: (l: Locale, slug: Project["slug"]) => (l === "en" ? `/en/projects/${slug}` : `/projetos/${slug}`),
};

/** A mesma página no outro idioma (para o seletor PT/EN e o hreflang). */
export function translatePath(pathname: string, to: Locale): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const project = clean.match(/^\/(?:en\/projects|projetos)\/([^/]+)$/)?.[1] as Project["slug"] | undefined;
  if (project) return paths.project(to, project);
  return paths.home(to);
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}
