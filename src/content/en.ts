// English copy. Same shape as pt.ts (type Content). Facts are the same as in pt.ts; only the language changes.
// Brazilian context is spelled out for international readers (STJ, Planalto, Brazilian law).
import type { Content, Project, Stop } from "./pt";
import { files, links, projectStacks, stackItems, type Locale } from "./shared";

export const en: Content = {
  locale: "en" as Locale,
  htmlLang: "en",
  ogLocale: "en_US",
  numberLocale: "en-US",

  person: {
    role: "Software Engineering student",
    city: "Cascavel, Brazil",
    positioning:
      "Moving from business administration into software development. First full-stack project live: legal research with hybrid search, built with Next.js, TypeScript and Postgres.",
    shortBio:
      "Software Engineering student at FAG, in Brazil, moving from business administration into software development. First full-stack project in production.",
    // "estou em busca de vagas para trabalhar fora" (Lucas, 23/10/2026)
    availability: "remote, hybrid or on-site work, including international roles",
  },

  manifesto: {
    label: "In my own words",
    quote:
      "I'm driven by solutions that bring together administrative organization and excellence in customer relationships.",
    body: [
      // CV de 20/10/2026: certificados Cambridge PET e KET
      "Bachelor's in Business Administration from Centro Universitário Assis Gurgacz. Fluent in English (New York School; Cambridge PET and KET certificates).",
      "In 2026 I started a Software Engineering degree at Centro Universitário Assis Gurgacz.",
    ],
    caption: "Lucas Maciel Vieira, Cascavel, Brazil",
  },

  journey: [
    {
      year: "2018",
      title: "Bachelor's in Business Administration",
      place: "Centro Universitário FAG",
      period: "Feb 2018 — Nov 2021",
    },
    { year: "2020", title: "Intern", place: "CAPS III — Psychosocial Care Center", period: "Oct 2020 — Oct 2021" },
    {
      year: "2022",
      title: "Administrative assistant",
      place: "Wizard Cascavel (language school)",
      period: "May 2022 — Mar 2023",
    },
    {
      year: "2023",
      title: "After-sales and customer retention",
      place: "Certto Telecom",
      period: "Mar 2023 — Jul 2026",
    },
    { year: "2026", title: "Software Engineering", place: "Centro Universitário FAG", period: "since Feb 2026" },
  ] as Stop[],

  education: [
    { course: "Software Engineering (in progress)", school: "FAG — Centro Universitário da Fundação Assis Gurgacz" },
    {
      course: "Bachelor's in Business Administration",
      school: "FAG — Centro Universitário da Fundação Assis Gurgacz",
      diploma: files.diploma as string | undefined,
    },
  ],

  stack: [
    { group: "Languages", items: stackItems.languages },
    { group: "Frameworks", items: stackItems.frameworks },
    { group: "Tools", items: stackItems.tools },
    { group: "Databases", items: stackItems.databases },
  ],

  projects: [
    {
      slug: "ipsis",
      name: "Ipsis",
      kicker: "Legal research for criminal defense",
      claim: "The model writes the argument. It never writes the text of the law.",
      summary:
        "Legal research and brief drafting for Brazilian criminal defense lawyers, focused on drug-trafficking cases.",
      problem:
        "Defense lawyers search by a doctrine's nickname (“privileged trafficking”), which never appears in the statute itself — and semantic search alone confuses crimes with almost identical wording. Citing the wrong text in a filed brief does real harm to the client.",
      solution:
        "Hybrid search merges section headings, full text and semantics over Brazil's Drug Law (11.343/2006), Penal Code and Code of Criminal Procedure. The model drafts only the argument, and every citation resolves to text read from the database — never to generated text. The response to the indictment comes out as a DOCX file, with three-phase sentencing and precedents from Brazil's Superior Court of Justice (STJ).",
      principle: "30% of the scope with 100% of the polish > a broad, broken system.",
      metrics: [
        { value: 1340, display: "1,340", label: "articles checked against the official federal source" },
        { value: 3771, display: "3,771", label: "legal provisions with embeddings" },
        { value: 249, display: "249", label: "automated checks on every push" },
        { value: 61, display: "61", label: "curated precedents from the STJ" },
      ],
      stack: projectStacks.ipsis,
      live: links.ipsisLive,
      liveNote: "the screens sit behind a login, so the captures below come from the repository itself",
      repo: links.ipsisRepo,
    },
    {
      slug: "clima-cascavel",
      name: "Clima Cascavel",
      kicker: "Weather forecast and El Niño, live",
      claim: "Nothing made up.",
      summary:
        "Current conditions and forecast for Cascavel, in southern Brazil, with El Niño told as a story and tracked live with NOAA data.",
      problem:
        "Forecasts, official alerts and climate context often get mixed up — and a weather site that shows sample values when the API fails misleads people deciding whether to head out.",
      solution:
        "Next.js with server-side caching for two public sources: Open-Meteo (every 10 min) and NOAA (every 6 h). Each fetch has a timeout, one retry and the last good reading kept for 24 h. Without valid data the site says “unavailable”, never sample values; stale data is shown with its age.",
      principle: "Forecast ≠ official alert ≠ climate context.",
      metrics: [
        { value: 539, display: "539", label: "automated tests on every push" },
        { value: 2, display: "2", label: "live sources: Open-Meteo and NOAA" },
        { value: 30, display: "30", label: "minutes between monitoring checks" },
        { value: 4.5, display: "4.5:1", label: "minimum contrast enforced by tests", decimals: 1 },
      ],
      stack: projectStacks.clima,
      live: links.climaLive,
      repo: links.climaRepo,
    },
  ] as Project[],

  clima: {
    story: {
      title: "El Niño, told as a story.",
      lead: "A scroll-pinned scene: the illustrated ocean cools and warms in four steps, and the last one shows NOAA's real reading for that week.",
      steps: [
        "An ocean that moves the planet's climate",
        "When the Pacific cools",
        "When the Pacific warms",
        "And how is the Pacific right now?",
      ],
    },
    chapters: {
      live: {
        title: "The Pacific, live.",
        text: "The “Now in the Pacific” panel reads three public NOAA files (weekly, RONI and the monthly bulletin) and shows the official status, the Niño 3.4 gauge and the last 52 weeks. The charts come with a data table and keyboard navigation. When a new bulletin is out, the site flags it at the top and opens a GitHub issue to review the copy.",
      },
      day: {
        title: "Rain, hour by hour.",
        text: "The day detail has tabs for seven days and bars of forecast rain per hour, with chance and temperature on read-out, plus a table with every hour. While the tab is open, the data refreshes on its own.",
      },
    },
    flow: [
      { name: "Open-Meteo", note: "forecast, 10-min cache" },
      { name: "NOAA CPC", note: "El Niño, 6-h cache" },
      {
        name: "Next.js server",
        note: "validates every response (Zod and strict parsers), 8-s timeout, one retry and the last good reading for 24 h",
      },
      { name: "/api/weather and /api/enso", note: "normalized JSON; expired data is dropped" },
      { name: "Screen", note: "data age computed on every request" },
    ],
    quality: [
      {
        title: "CI on every push",
        text: "lint, types, 539 tests, build and visual QA in a real browser (desktop and mobile).",
      },
      {
        title: "Monitoring",
        text: "every 30 min it checks pages and APIs; if the forecast goes stale or NOAA stops updating, GitHub sends an email.",
      },
      {
        title: "Installable app",
        text: "a PWA with a bottom menu on mobile and an offline page; no weather data is stored on the device.",
      },
      {
        title: "Careful motion",
        text: "lightning flashes at most twice (WCAG 2.3.1); rain pauses off-screen; with reduced motion, everything stays still.",
      },
    ],
    lighthousePages: { home: "Home", elnino: "El Niño", about: "About" },
    lighthouseNote:
      "Lighthouse 12 on mobile, live site, Oct 20, 2026. Median of 3 runs; best practices and SEO at 100 and CLS 0 on all three pages.",
    gallery: {
      home: { title: "Home", note: "with the bottom menu" },
      day: { title: "Day detail", note: "rain hour by hour" },
      laNina: { title: "La Niña", note: "the Pacific cools" },
      now: { title: "El Niño now", note: "NOAA's reading" },
      live: { title: "Now in the Pacific", note: "official status" },
    },
  },

  invite: {
    reasons: [
      {
        id: "estagio",
        label: "Internship",
        sentence: "I saw your portfolio and would like to talk about an internship",
      },
      {
        id: "junior",
        label: "Junior role",
        sentence: "I saw your portfolio and would like to talk about a junior role",
      },
      {
        id: "projeto",
        label: "Freelance project",
        sentence: "I saw your portfolio and have a freelance project to discuss",
      },
      { id: "conversa", label: "Just a chat", sentence: "I saw your portfolio and would like to set up a quick chat" },
    ],
    modes: [
      { id: "remoto", label: "Remote", phrase: "remote" },
      { id: "hibrido", label: "Hybrid", phrase: "hybrid" },
      { id: "presencial", label: "On-site", phrase: "on-site" },
    ],
    subject: "Contact from your portfolio",
    greeting: (who: string, company: string) => `Hi Lucas! This is ${who}${company ? ` from ${company}` : ""}.`,
    line: (sentence: string, phrase: string) => `${sentence} (${phrase}).`,
    nameFallback: "[your name]",
  },

  messages: { fab: "Hi Lucas! I saw your portfolio and would like to talk." },

  navigation: [
    { hash: "projetos", label: "Projects" },
    { hash: "trajetoria", label: "Journey" },
    { hash: "convite", label: "Contact" },
  ],

  seo: {
    defaultTitle: "Lucas Maciel Vieira — Software Engineering Student",
    titleTemplate: "%s · lucas.vieira",
    description:
      "Software Engineering student in Brazil, moving from business administration into software development. Projects: Ipsis (legal research with hybrid search) and Clima Cascavel (weather and live El Niño data). Open to international roles.",
    keywords: [
      "Lucas Maciel Vieira",
      "Software Engineering",
      "developer",
      "Next.js",
      "TypeScript",
      "Brazil",
      "portfolio",
    ],
    ipsisDescription:
      "Legal research and brief drafting for criminal defense. The model never writes the text of the law.",
  },

  ui: {
    skip: "Skip to content",
    header: {
      home: "Home",
      homeAria: "lucas.vieira, go to the home page",
      mainNav: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
      mobileNav: "Mobile menu",
      downloadCv: "Résumé (PT)",
      downloadCvPdf: "Download résumé (PDF, in Portuguese)",
      language: "Language",
    },
    hero: {
      aria: "Introduction",
      roleIn: "in",
      seeProjects: "See projects",
      downloadCv: "Résumé (PDF, in Portuguese)",
      available: "Available for",
      doorLabel: "Ipsis, the first project live",
      doorTitle: "From customer service to code.",
    },
    ipsis: {
      label: "Main project",
      steps: ["The problem", "The decision", "The result"],
      seeProject: "See the project",
      seeCode: "See the code",
      openLive: "Open Ipsis live",
    },
    screens: {
      label: "Inside Ipsis",
      title: "Seven screens, from chat to sentencing.",
      aria: "Ipsis screens, scroll sideways",
      note: "The screens are in Portuguese: Ipsis is built for Brazilian law.",
    },
    climaScene: {
      label: "Second project:",
      pixel: "> no valid data, “unavailable”",
      phonesTitle: "On a phone, it installs like an app.",
      phonesText: "Bottom menu, offline page and no weather data kept on the device.",
      phonesAria: "Clima Cascavel mobile screens, scroll sideways",
      phones: ["Home, with the bottom menu", "El Niño, told as a story", "The Pacific, live"],
      seeProject: "See the project",
      openSite: "Open the site",
    },
    climaNow: { now: "Now in Cascavel:", reading: "reading from", tz: " BRT", source: "served by the project's API" },
    journey: {
      label: "The journey",
      title: "From business administration to code, in five stops.",
      stackTitle: "What I use today",
    },
    invite: {
      label: "Contact",
      title: "Build the invite.",
      lead: "Pick the topic and the format. The message comes out ready in your email",
      leadWhatsapp: " or on WhatsApp",
      reason: "What is it about?",
      format: "Format",
      name: "Your name",
      company: "Company (optional)",
      notes: "Anything else? (optional)",
      yourMessage: "Your message",
      sendEmail: "Send by email",
      sendWhatsapp: "Send on WhatsApp",
      nameError: "Add your name to the message.",
      copy: "Prefer to copy it? The email is",
    },
    contact: {
      title: "Shall we talk?",
      lead: "Open to opportunities, including international roles. Email is the fastest way:",
      whatsapp: "Message on WhatsApp",
      downloadCv: "Download résumé (PDF, in Portuguese)",
      where: "Where",
      available: "Available for",
      education: "Education",
      downloadDiploma: "Download diploma (PDF, in Portuguese)",
      profiles: "Profiles",
      mapTitle: "Map of Cascavel, Paraná, Brazil",
      openMap: "Open in Google Maps",
    },
    footer: {
      projects: "Projects",
      contact: "Contact",
      documents: "Documents",
      cv: "Résumé (PDF, in Portuguese)",
      diploma: "Business Administration diploma (PDF, in Portuguese)",
      siteCode: "Source code of this site",
      available: "Available for",
      made: "Made in Cascavel, Brazil, with Next.js. Every screen shown comes from the real projects.",
    },
    fab: {
      region: "Quick contact",
      whatsappAria: "Chat with Lucas on WhatsApp",
      emailAria: "Email Lucas",
      whatsapp: "WhatsApp",
      email: "Email",
    },
    project: {
      breadcrumb: "Breadcrumb",
      projects: "Projects",
      openSite: "Open the site",
      seeCode: "See the code",
      liveIntro: "The site is live;",
      screensNote: "The screens are in Portuguese: both products are built for Brazilian users.",
      howBuilt: "How it was built",
      numbers: "By the numbers",
      stack: "Stack",
      phonesAria: "Mobile screens, scroll sideways",
      next: "Next project",
      see: "See",
      buildInvite: "Build an invite",
      problem: "The problem",
      decision: "The decision",
      ipsisGallery: "Seven screens, from chat to sentencing.",
      climaGallery: "On a phone, it installs like an app.",
    },
    climaInside: {
      flowTitle: "From provider to screen, nothing made up.",
      qualityTitle: "Tested before it ships.",
      lighthouseTitle: "Lighthouse on mobile",
      lighthouseCaption: "Lighthouse scores by page",
      cols: ["Page", "Performance", "Accessibility", "LCP"],
    },
    climaStory: { step: (i: number, n: number) => `Step ${i} of ${n}` },
  },
};
