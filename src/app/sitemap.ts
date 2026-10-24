import type { MetadataRoute } from "next";
import { getContent, locales, paths, site, translatePath } from "@/content";

// data fixa da última revisão do conteúdo (sem new Date(): a rota é estática)
const updated = "2026-10-23";
const abs = (path: string) => new URL(path, site.url).toString();

/** Cada página nos dois idiomas, com as alternativas de idioma (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [paths.home("pt"), ...getContent("pt").projects.map((p) => paths.project("pt", p.slug))];
  return pages.flatMap((ptPath) =>
    locales.map((l) => ({
      url: abs(translatePath(ptPath, l)),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: ptPath === "/" ? 1 : 0.8,
      alternates: {
        languages: { "pt-BR": abs(translatePath(ptPath, "pt")), en: abs(translatePath(ptPath, "en")) },
      },
    })),
  );
}
