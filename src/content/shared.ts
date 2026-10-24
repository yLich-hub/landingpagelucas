// Dados que não mudam entre idiomas. Os textos ficam em pt.ts e en.ts.

export type Locale = "pt" | "en";
// Origens: site antigo (landingpagelucas.vercel.app), CV em PDF, GitHub, READMEs dos projetos.

export const site = {
  name: "Lucas Maciel Vieira",
  mark: "lucas.vieira", // logo do site antigo
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://landingpagelucas.vercel.app",
};

export const contact = {
  email: "lucasmacielvieira55@gmail.com", // site antigo (o CV traz um @hotmail antigo)
  // CV em PDF publicado no site: "45 99991-3183 (Mobile)".
  // WhatsApp confirmado pelo Lucas em 20/10/2026. Para esconder o WhatsApp do site, deixe whatsappNumber vazio.
  whatsappNumber: "5545999913183",
  phoneDisplay: "(45) 99991-3183",
};

export const social = {
  github: "https://github.com/yLich-hub",
  // Confirmado pelo Lucas em 20/10/2026 (o CV antigo ainda traz /in/lucas-maciel-vieira-952865223/).
  linkedin: "https://www.linkedin.com/in/lucasmacielvieira/",
  instagram: "https://www.instagram.com/lucasmacielvieira/",
  siteRepo: "https://github.com/yLich-hub/landingpagelucas", // este site substituiu o Astro no mesmo repositório (20/10/2026)
};

export const files = {
  // TODO: quando houver currículo em inglês, colocar em public/ e apontar cvEn para ele (en.ts usa cvEn ?? cv).
  cv: "/curriculo-lucas-maciel-vieira.pdf",
  cvEn: undefined as string | undefined,
  diploma: "/diploma-administracao.pdf", // cópia com RG e data de nascimento tarjados (site antigo)
};

export const links = {
  ipsisLive: "https://ipsis-juridico.vercel.app",
  ipsisRepo: "https://github.com/yLich-hub/Ipsis",
  climaLive: "https://cascavel-clima.vercel.app",
  climaRepo: "https://github.com/yLich-hub/cascavel-clima",
  climaApi: "https://cascavel-clima.vercel.app/api/weather",
  mapEmbed: "https://www.google.com/maps?q=Cascavel,+Paran%C3%A1&z=12&output=embed",
  mapOpen: "https://www.google.com/maps/place/Cascavel+-+PR",
};

/** Stack do site antigo ("só o que você defenderia numa entrevista"); nomes de tecnologia não se traduzem. */
export const stackItems = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL"],
  frameworks: ["Next.js", "React", "Astro", "Tailwind CSS"],
  tools: ["Git & GitHub", "Vercel", "Supabase", "VS Code"],
  databases: ["PostgreSQL", "pgvector"],
};

export const projectStacks = {
  ipsis: [
    "Next.js 15",
    "TypeScript",
    "Supabase",
    "PostgreSQL + pgvector",
    "OpenAI",
    "Python",
    "Tailwind CSS",
    "Vitest + Playwright",
  ],
  clima: [
    "Next.js 16",
    "TypeScript",
    "Zod",
    "Open-Meteo",
    "NOAA CPC",
    "Vitest",
    "Tailwind CSS",
    "PWA",
    "GitHub Actions",
    "Vercel",
  ],
};

// Lighthouse 12 no celular, site publicado do Clima, 20/10/2026, mediana de 3 medições (README do projeto)
export const climaLighthouse = [
  { key: "home", performance: 91, accessibility: 100, lcpSeconds: 2.4 },
  { key: "elnino", performance: 93, accessibility: 100, lcpSeconds: 2.1 },
  { key: "about", performance: 99, accessibility: 100, lcpSeconds: 2.0 },
] as const;
