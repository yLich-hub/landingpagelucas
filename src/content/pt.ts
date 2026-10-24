// Textos em português. en.ts tem exatamente o mesmo formato (o tipo Content vem daqui).
// Cada dado traz a origem; lacunas ficam com TODO.
import { files, links, projectStacks, stackItems, type Locale } from "./shared";

export type Metric = { value: number; display: string; label: string; decimals?: number };
export type Stop = { year: string; title: string; place: string; period: string };
export type Project = {
  slug: "ipsis" | "clima-cascavel";
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

export const pt = {
  locale: "pt" as Locale,
  htmlLang: "pt-BR",
  ogLocale: "pt_BR",
  numberLocale: "pt-BR",

  person: {
    role: "Estudante de Engenharia de Software",
    city: "Cascavel — PR",
    // site antigo: posicionamento
    positioning:
      "Em transição da administração para o desenvolvimento de software. Primeiro projeto full-stack no ar: pesquisa jurídica com busca híbrida, em Next.js, TypeScript e Postgres.",
    shortBio:
      "Estudante de Engenharia de Software na FAG, em transição da administração para o desenvolvimento. Primeiro projeto full-stack em produção.",
    availability: "remoto, híbrido ou presencial", // site antigo
  },

  /** Frase dele (bio do site e do CV). Vira o manifesto. */
  manifesto: {
    label: "O convite",
    quote: "Sou movido por soluções que unam organização administrativa e excelência no relacionamento com o cliente.",
    body: [
      "Bacharel em administração formado pelo Centro Universitário Assis Gurgacz e com fluidez no idioma inglês (New York School).",
      "No ano de 2026 iniciei a faculdade de Engenharia de Software pelo Centro Universitário Assis Gurgacz.",
    ],
    caption: "Lucas Maciel Vieira, Cascavel — PR",
  },

  /** Datas do CV em PDF (versão de 20/10/2026, exportada do LinkedIn). */
  journey: [
    {
      year: "2018",
      title: "Bacharelado em Administração",
      place: "Centro Universitário FAG",
      period: "fev/2018 — nov/2021",
    },
    {
      year: "2020",
      title: "Estagiário",
      place: "CAPS III — Centro de Atenção Psicossocial",
      period: "out/2020 — out/2021",
    },
    { year: "2022", title: "Auxiliar administrativo", place: "Wizard Cascavel", period: "mai/2022 — mar/2023" },
    // saída em julho de 2026, confirmada pelo Lucas em 20/10/2026
    { year: "2023", title: "Pós-vendas", place: "Certto Telecom", period: "mar/2023 — jul/2026" },
    { year: "2026", title: "Engenharia de Software", place: "Centro Universitário FAG", period: "desde fev/2026" },
  ] as Stop[],

  education: [
    { course: "Engenharia de Software (em curso)", school: "FAG — Centro Universitário da Fundação Assis Gurgacz" },
    {
      course: "Bacharelado em Administração",
      school: "FAG — Centro Universitário da Fundação Assis Gurgacz",
      diploma: files.diploma as string | undefined,
    },
  ],

  stack: [
    { group: "Linguagens", items: stackItems.languages },
    { group: "Frameworks", items: stackItems.frameworks },
    { group: "Ferramentas", items: stackItems.tools },
    { group: "Bancos de dados", items: stackItems.databases },
  ],

  projects: [
    {
      slug: "ipsis",
      name: "Ipsis",
      kicker: "Pesquisa jurídica para advocacia criminal",
      // landing do Ipsis
      claim: "O modelo escreve a argumentação. O texto da lei ele nunca escreve.",
      summary: "Consulta e geração de peças para advocacia criminal, no recorte de tráfico de drogas.",
      // site antigo
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
      stack: projectStacks.ipsis,
      live: links.ipsisLive,
      liveNote: "as telas ficam atrás de login; as capturas abaixo vêm do próprio repositório",
      repo: links.ipsisRepo,
    },
    {
      slug: "clima-cascavel",
      name: "Clima Cascavel",
      kicker: "Previsão do tempo e El Niño ao vivo",
      // princípio do README do Clima Cascavel
      claim: "Nada inventado.",
      summary:
        "Condições atuais e previsão do tempo para Cascavel, Paraná, com o El Niño explicado como história e acompanhado ao vivo pelos dados do NOAA.",
      problem:
        "Previsão, alerta oficial e contexto climático costumam aparecer misturados — e um site de tempo que mostra valor de exemplo quando a API falha engana quem vai sair de casa.",
      // README do Clima Cascavel (20/10/2026)
      solution:
        "Next.js com cache no servidor para duas fontes públicas: Open-Meteo (a cada 10 min) e NOAA (a cada 6 h). Cada busca tem timeout, uma retentativa e o último dado bom guardado por 24 h. Sem dado válido, o site mostra “indisponível”, nunca valores de exemplo; dado velho aparece com aviso de idade.",
      principle: "Previsão ≠ alerta oficial ≠ contexto climático.",
      metrics: [
        // `npx vitest run` em 23/10/2026: 25 arquivos, 539 testes
        { value: 539, display: "539", label: "testes automáticos em todo push" },
        { value: 2, display: "2", label: "fontes ao vivo: Open-Meteo e NOAA" },
        { value: 30, display: "30", label: "minutos entre as checagens do monitoramento" },
        { value: 4.5, display: "4,5:1", label: "contraste mínimo garantido por teste", decimals: 1 },
      ],
      stack: projectStacks.clima,
      live: links.climaLive,
      repo: links.climaRepo,
    },
  ] as Project[],

  /** Partes do Clima Cascavel que só aparecem na página do projeto (README de 20/10/2026). */
  clima: {
    story: {
      title: "O El Niño contado como história.",
      lead: "Uma cena presa à rolagem: o mar ilustrado esfria e esquenta em quatro passos, e o último mostra o dado real do NOAA daquela semana.",
      steps: [
        "Um oceano que mexe com o clima do planeta",
        "Quando o Pacífico esfria",
        "Quando o Pacífico esquenta",
        "E como está o Pacífico agora?",
      ],
    },
    chapters: {
      live: {
        title: "O Pacífico ao vivo.",
        text: "O painel “Agora no Pacífico” lê três arquivos públicos do NOAA (semanal, RONI e o boletim mensal) e mostra a situação oficial, a régua do Niño 3.4 e as últimas 52 semanas. Os gráficos têm tabela e navegação por teclado. Quando sai boletim novo, o site avisa no topo e abre uma issue no GitHub para revisar os textos.",
      },
      day: {
        title: "A chuva, hora a hora.",
        text: "O detalhe do dia tem abas com os sete dias e barras de chuva prevista por hora, com chance e temperatura na leitura e uma tabela com todas as horas. Com a aba aberta, os dados se atualizam sozinhos.",
      },
    },
    // como o dado chega à tela (README, seção Arquitetura)
    flow: [
      { name: "Open-Meteo", note: "previsão, cache de 10 min" },
      { name: "NOAA CPC", note: "El Niño, cache de 6 h" },
      {
        name: "Servidor Next.js",
        note: "valida cada resposta (Zod e parsers estritos), timeout de 8 s, retentativa e último dado bom por 24 h",
      },
      { name: "/api/weather e /api/enso", note: "JSON normalizado; dado expirado some" },
      { name: "Tela", note: "idade do dado calculada a cada acesso" },
    ],
    // README, seção Qualidade
    quality: [
      {
        title: "CI em todo push",
        text: "lint, tipos, 539 testes, build e QA visual no navegador (computador e celular).",
      },
      {
        title: "Monitoramento",
        text: "a cada 30 min confere páginas e APIs; se a previsão envelhecer ou o NOAA parar, o GitHub avisa por e-mail.",
      },
      {
        title: "App instalável",
        text: "PWA com menu inferior no celular e página sem conexão; nenhum dado do tempo fica guardado no aparelho.",
      },
      {
        title: "Movimento com cuidado",
        text: "raios com no máximo 2 clarões (WCAG 2.3.1); chuva pausa fora da tela; quem reduz animações vê tudo parado.",
      },
    ],
    lighthousePages: { home: "Início", elnino: "El Niño", about: "Sobre" },
    lighthouseNote:
      "Lighthouse 12 no celular, site publicado, 20/10/2026. Mediana de 3 medições; boas práticas e SEO em 100 e CLS 0 nas três páginas.",
    gallery: {
      home: { title: "Início", note: "com o menu inferior" },
      day: { title: "Detalhe do dia", note: "chuva hora a hora" },
      laNina: { title: "La Niña", note: "o Pacífico esfria" },
      now: { title: "El Niño agora", note: "o dado do NOAA" },
      live: { title: "Agora no Pacífico", note: "situação oficial" },
    },
  },

  /** Montador de convite (a peça que converte). */
  invite: {
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
      { id: "remoto", label: "Remoto", phrase: "no modelo remoto" },
      { id: "hibrido", label: "Híbrido", phrase: "no modelo híbrido" },
      { id: "presencial", label: "Presencial", phrase: "no modelo presencial" },
    ],
    subject: "Contato pelo portfólio",
    greeting: (who: string, company: string) => `Olá, Lucas! Aqui é ${who}${company ? `, da ${company}` : ""}.`,
    line: (sentence: string, phrase: string) => `${sentence}, ${phrase}.`,
    nameFallback: "[seu nome]",
  },

  messages: { fab: "Olá, Lucas! Vi seu portfólio e quero conversar." },

  navigation: [
    { hash: "projetos", label: "Projetos" },
    { hash: "trajetoria", label: "Trajetória" },
    { hash: "convite", label: "Contato" },
  ],

  seo: {
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
    ipsisDescription: "Consulta e geração de peças para advocacia criminal. O texto da lei o modelo nunca escreve.",
  },

  /** Textos da interface (botões, rótulos, títulos de cena). */
  ui: {
    skip: "Pular para o conteúdo",
    header: {
      home: "Início",
      homeAria: "lucas.vieira, ir para o início",
      mainNav: "Navegação principal",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      menu: "Menu",
      mobileNav: "Menu do celular",
      downloadCv: "Baixar currículo",
      downloadCvPdf: "Baixar currículo (PDF)",
      language: "Idioma",
    },
    hero: {
      aria: "Apresentação",
      roleIn: "em",
      seeProjects: "Ver projetos",
      downloadCv: "Baixar currículo",
      available: "Disponível para trabalho",
      doorLabel: "Ipsis, o primeiro projeto no ar",
      doorTitle: "Do atendimento ao código.",
    },
    ipsis: {
      label: "Projeto principal",
      steps: ["O problema", "A decisão", "O resultado"],
      seeProject: "Ver o projeto",
      seeCode: "Ver código",
      openLive: "Abrir o Ipsis no ar",
    },
    screens: {
      label: "O Ipsis por dentro",
      title: "Sete telas, do chat à dosimetria.",
      aria: "Telas do Ipsis, role para o lado",
      note: "",
    },
    climaScene: {
      label: "Segundo projeto:",
      pixel: "> sem dado válido, “indisponível”",
      phonesTitle: "No celular, instala como app.",
      phonesText: "Menu inferior, página sem conexão e nada do tempo guardado no aparelho.",
      phonesAria: "Telas do Clima Cascavel no celular, role para o lado",
      phones: ["Início, com o menu inferior", "A história do El Niño", "O Pacífico ao vivo"],
      seeProject: "Ver o projeto",
      openSite: "Abrir o site",
    },
    climaNow: { now: "Agora em Cascavel:", reading: "dado das", tz: "", source: "lido da API do projeto" },
    journey: {
      label: "A trajetória",
      title: "Da administração ao código, em cinco paradas.",
      stackTitle: "O que eu uso hoje",
    },
    invite: {
      label: "Contato",
      title: "Monte o convite.",
      lead: "Escolha o assunto e o formato. A mensagem sai pronta no seu e-mail",
      leadWhatsapp: " ou no WhatsApp",
      reason: "Sobre o que é?",
      format: "Formato",
      name: "Seu nome",
      company: "Empresa (opcional)",
      notes: "Algo mais? (opcional)",
      yourMessage: "Sua mensagem",
      sendEmail: "Enviar por e-mail",
      sendWhatsapp: "Enviar pelo WhatsApp",
      nameError: "Escreva seu nome para a mensagem.",
      copy: "Prefere copiar? O e-mail é",
    },
    contact: {
      title: "Vamos conversar?",
      lead: "Aberto a oportunidades. O caminho mais rápido é o e-mail:",
      whatsapp: "Chamar no WhatsApp",
      downloadCv: "Baixar currículo (PDF)",
      where: "Onde",
      available: "Disponível para trabalho",
      education: "Formação",
      downloadDiploma: "Baixar diploma (PDF)",
      profiles: "Redes",
      mapTitle: "Mapa de Cascavel, Paraná",
      openMap: "Abrir no Google Maps",
    },
    footer: {
      projects: "Projetos",
      contact: "Contato",
      documents: "Documentos",
      cv: "Currículo (PDF)",
      diploma: "Diploma de Administração (PDF)",
      siteCode: "Código deste site",
      available: "Disponível para trabalho",
      made: "Feito em Cascavel, com Next.js. Todas as telas são dos projetos reais.",
    },
    fab: {
      region: "Contato rápido",
      whatsappAria: "Conversar com o Lucas pelo WhatsApp",
      emailAria: "Mandar um e-mail para o Lucas",
      whatsapp: "WhatsApp",
      email: "E-mail",
    },
    project: {
      breadcrumb: "Trilha",
      projects: "Projetos",
      openSite: "Abrir o site",
      seeCode: "Ver código",
      liveIntro: "O site está no ar;",
      screensNote: "",
      howBuilt: "Como foi feito",
      numbers: "Em números",
      stack: "Stack",
      phonesAria: "Telas no celular, role para o lado",
      next: "Próximo projeto",
      see: "Ver",
      buildInvite: "Montar um convite",
      problem: "O problema",
      decision: "A decisão",
      ipsisGallery: "As sete telas, do chat à dosimetria.",
      climaGallery: "No celular, instala como app.",
    },
    climaInside: {
      flowTitle: "Do provedor à tela, sem inventar.",
      qualityTitle: "Testado antes de chegar ao ar.",
      lighthouseTitle: "Lighthouse no celular",
      lighthouseCaption: "Notas do Lighthouse por página",
      cols: ["Página", "Performance", "Acessibilidade", "LCP"],
    },
    climaStory: { step: (i: number, n: number) => `Passo ${i} de ${n}` },
  },
};

export type Content = typeof pt;
