// ÚNICA fonte de dados do site. Cada dado traz a origem; lacunas ficam com TODO.
// Origens: site atual (landingpagelucas.vercel.app), CV em PDF, GitHub, READMEs dos projetos.

export const person = {
  name: "Lucas Maciel Vieira",
  mark: "lucas.vieira", // logo do site atual
  role: "Estudante de Engenharia de Software",
  city: "Cascavel — PR",
  cityFull: "Cascavel, Paraná, Brasil",
  // site atual: posicionamento
  positioning:
    "Em transição da administração para o desenvolvimento de software. Primeiro projeto full-stack no ar: pesquisa jurídica com busca híbrida, em Next.js, TypeScript e Postgres.",
  shortBio:
    "Estudante de Engenharia de Software na FAG, em transição da administração para o desenvolvimento. Primeiro projeto full-stack em produção.",
  availability: "remoto, híbrido ou presencial", // site atual
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://landingpagelucas.vercel.app",
};

export const contact = {
  email: "lucasmacielvieira55@gmail.com", // site atual (o CV traz um @hotmail antigo)
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
  cv: "/curriculo-lucas-maciel-vieira.pdf",
  diploma: "/diploma-administracao.pdf", // cópia com RG e data de nascimento tarjados (site atual)
};

/** Frase dele (bio do site e do CV). Vira o manifesto. */
export const manifesto = {
  label: "O convite",
  quote: "Sou movido por soluções que unam organização administrativa e excelência no relacionamento com o cliente.",
  body: [
    "Bacharel em administração formado pelo Centro Universitário Assis Gurgacz e com fluidez no idioma inglês (New York School).",
    "No ano de 2026 iniciei a faculdade de Engenharia de Software pelo Centro Universitário Assis Gurgacz.",
  ],
  // bio completa do site atual, para a página "sobre" do rodapé/projetos
  longBio: [
    "Minha trajetória é marcada pelo foco no atendimento ao cliente e na eficiência operacional. Iniciei minha carreira no CAPS III, onde desenvolvi bases sólidas em rotinas administrativas e recepção. Na sequência, atuei no setor operacional da Wizard, sendo responsável pelo suporte a alunos e responsáveis, além de apoiar a gestão administrativa da unidade.",
    "Integrei a equipe de Pós-Vendas na Certto no ano de 2023 até 2026. Atuava estrategicamente na retenção e fidelização de clientes, realizando o gerenciamento da base, oferta de upgrades de planos e coleta de feedbacks para melhoria contínua dos serviços.",
  ],
};

export type Stop = { year: string; title: string; place: string; period: string; kind: "trabalho" | "estudo" };

/** Datas do CV em PDF. */
export const journey: Stop[] = [
  {
    year: "2018",
    title: "Bacharelado em Administração",
    place: "Centro Universitário FAG",
    period: "fev/2018 — nov/2021",
    kind: "estudo",
  },
  {
    year: "2020",
    title: "Estagiário",
    place: "CAPS III — Centro de Atenção Psicossocial",
    period: "out/2020 — out/2021",
    kind: "trabalho",
  },
  {
    year: "2022",
    title: "Auxiliar administrativo",
    place: "Wizard Cascavel",
    period: "mai/2022 — fev/2023",
    kind: "trabalho",
  },
  // saída em julho de 2026, confirmada pelo Lucas em 20/10/2026
  { year: "2023", title: "Pós-vendas", place: "Certto Telecom", period: "mar/2023 — jul/2026", kind: "trabalho" },
  {
    year: "2026",
    title: "Engenharia de Software",
    place: "Centro Universitário FAG",
    period: "jan/2026 — dez/2029 (previsão)",
    kind: "estudo",
  },
];

export const education = [
  { course: "Engenharia de Software (em curso)", school: "FAG — Centro Universitário da Fundação Assis Gurgacz" },
  {
    course: "Bacharelado em Administração",
    school: "FAG — Centro Universitário da Fundação Assis Gurgacz",
    diploma: files.diploma,
  },
];

/** Stack do site atual ("só o que você defenderia numa entrevista"). */
export const stack = [
  { group: "Linguagens", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { group: "Frameworks", items: ["Next.js", "React", "Astro", "Tailwind CSS"] },
  { group: "Ferramentas", items: ["Git & GitHub", "Vercel", "Supabase", "VS Code"] },
  { group: "Bancos de dados", items: ["PostgreSQL", "pgvector"] },
];

export type Metric = { value: number; display: string; label: string; decimals?: number };

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  claim: string; // título-afirmação
  summary: string;
  problem: string;
  solution: string;
  principle: string;
  metrics: Metric[];
  stack: string[];
  live?: string;
  repo: string;
  liveNote?: string;
};

export const projects: Project[] = [
  {
    slug: "ipsis",
    name: "Ipsis",
    kicker: "Pesquisa jurídica para advocacia criminal",
    // landing do Ipsis
    claim: "O modelo escreve a argumentação. O texto da lei ele nunca escreve.",
    summary: "Consulta e geração de peças para advocacia criminal, no recorte de tráfico de drogas.",
    // site atual
    problem:
      "Advogado criminalista busca pelo apelido do instituto (“tráfico privilegiado”), que não aparece no texto da lei — e busca semântica sozinha confunde crimes de redação quase idêntica. Citar texto errado em peça protocolada causa dano real ao cliente.",
    solution:
      "A busca híbrida funde rubrica, texto e semântica sobre a Lei 11.343/2006, o Código Penal e o CPP; o modelo redige só a argumentação, e toda citação resolve para o texto lido do banco — nunca para texto gerado. A resposta à acusação sai em DOCX, com dosimetria trifásica e precedentes do STJ.",
    // README do Ipsis
    principle: "30% do escopo com 100% de acabamento > sistema amplo e quebrado.",
    metrics: [
      { value: 1340, display: "1.340", label: "artigos conferidos contra o Planalto" },
      { value: 3771, display: "3.771", label: "dispositivos com vetor" },
      { value: 249, display: "249", label: "verificações automáticas em todo push" },
      { value: 61, display: "61", label: "precedentes qualificados do STJ" },
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "Supabase",
      "PostgreSQL + pgvector",
      "OpenAI",
      "Python",
      "Tailwind CSS",
      "Vitest + Playwright",
    ],
    live: "https://ipsis-juridico.vercel.app",
    liveNote: "as telas ficam atrás de login; as capturas abaixo vêm do próprio repositório",
    repo: "https://github.com/yLich-hub/Ipsis",
  },
  {
    slug: "clima-cascavel",
    name: "Clima Cascavel",
    kicker: "Previsão do tempo para Cascavel",
    // princípio do README do Clima Cascavel
    claim: "Nada inventado.",
    summary: "Condições atuais e previsão do tempo para Cascavel, Paraná, com contexto educativo sobre El Niño.",
    problem:
      "Previsão, alerta oficial e contexto climático costumam aparecer misturados — e um site de tempo que mostra valor de exemplo quando a API falha engana quem vai sair de casa.",
    solution:
      "Next.js com cache no servidor da API gratuita Open-Meteo, tratamento explícito de dado velho e de falha do provedor. Sem dado válido, o site mostra “indisponível”, nunca valores de exemplo. As cenas de fundo mudam com o tempo em Cascavel e são desenhadas em código (CSS, SVG e canvas).",
    principle: "Previsão ≠ alerta oficial ≠ contexto climático.",
    metrics: [
      { value: 10, display: "10", label: "minutos de cache no servidor" },
      { value: 4.5, display: "4,5:1", label: "contraste mínimo garantido por teste", decimals: 1 },
    ],
    stack: ["Next.js 16", "TypeScript", "Open-Meteo", "Zod", "Vitest", "Tailwind CSS", "Vercel"],
    live: "https://cascavel-clima.vercel.app",
    repo: "https://github.com/yLich-hub/cascavel-clima",
  },
];

/** Repositórios menores (GitHub). */
export const studies = [
  {
    name: "Calculadora em Java",
    note: "primeiro contato com Java, escrita no bloco de notas e testada no terminal",
    repo: "https://github.com/yLich-hub/calculadorajava",
  },
  {
    name: "Mural de serviços da turma",
    note: "trabalho em grupo para praticar branches, pull requests e revisão de código",
    repo: "https://github.com/yLich-hub/mural-servicos-turma",
  },
  { name: "Calc-notas", note: "Python", repo: "https://github.com/yLich-hub/calc-notas" },
];

/** Montador de convite (a peça que converte). */
export const invite = {
  reasons: [
    { id: "estagio", label: "Vaga de estágio", sentence: "Vi seu portfólio e quero falar sobre uma vaga de estágio" },
    { id: "junior", label: "Vaga júnior", sentence: "Vi seu portfólio e quero falar sobre uma vaga júnior" },
    {
      id: "projeto",
      label: "Projeto freelance",
      sentence: "Vi seu portfólio e tenho um projeto freelance para conversar",
    },
    { id: "conversa", label: "Só um café", sentence: "Vi seu portfólio e queria marcar um café para conversar" },
  ],
  modes: [
    { id: "remoto", label: "Remoto" },
    { id: "hibrido", label: "Híbrido" },
    { id: "presencial", label: "Presencial" },
  ],
  subject: "Contato pelo portfólio",
};

export const messages = {
  fab: "Olá, Lucas! Vi seu portfólio e quero conversar.",
};

export const navigation = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#trajetoria", label: "Trajetória" },
  { href: "/#convite", label: "Contato" },
];

export const seo = {
  defaultTitle: "Lucas Maciel Vieira — Estudante de Engenharia de Software",
  titleTemplate: "%s · lucas.vieira",
  description:
    "Estudante de Engenharia de Software na FAG, em Cascavel (PR), em transição da administração para o desenvolvimento. Projetos: Ipsis (pesquisa jurídica com busca híbrida) e Clima Cascavel.",
  keywords: [
    "Lucas Maciel Vieira",
    "Engenharia de Software",
    "desenvolvedor",
    "Next.js",
    "TypeScript",
    "Cascavel",
    "portfólio",
  ],
};
