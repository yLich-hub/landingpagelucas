import type { MetadataRoute } from "next";
import { person, projects } from "@/content/site";

// data fixa da última revisão do conteúdo (sem new Date(): a rota é estática)
const updated = "2026-10-20";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: person.url, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: new URL(`/projetos/${p.slug}`, person.url).toString(),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
