// Uma entrada por imagem em /public/images. Para trocar, substitua o arquivo mantendo o nome.
// Origem de cada uma: docs/dossie.md (biblioteca de ativos).

export type Photo = { src: string; alt: string; width: number; height: number };

const p = (src: string, alt: string, width: number, height: number): Photo => ({ src, alt, width, height });

export const photos = {
  // retrato enviado pelo Lucas em 20/10/2026
  lucas: p(
    "/images/perfil/lucas-retrato.webp",
    "Lucas Maciel Vieira sentado num banco claro, de camiseta vermelha e calça bege, em fundo escuro",
    1333,
    2000,
  ),
  lucasFace: p("/images/perfil/lucas-rosto.webp", "Rosto de Lucas Maciel Vieira", 256, 256),

  ipsisLanding: p(
    "/images/ipsis/landing.webp",
    "Página inicial do Ipsis: “O modelo escreve a argumentação. O texto da lei ele nunca escreve.” e uma consulta de exemplo",
    1920,
    1200,
  ),
  ipsisCitation: p(
    "/images/ipsis/landing-citacao.webp",
    "Resposta do Ipsis com a citação do art. 42 da Lei 11.343/2006 aberta, lida do corpus e com a data da redação",
    1920,
    1200,
  ),
  ipsisDecisions: p(
    "/images/ipsis/landing-decisoes.webp",
    "Seção “As três decisões que definem o projeto” na página do Ipsis",
    1920,
    1200,
  ),
  ipsisMobile: p("/images/ipsis/landing-celular.webp", "Página inicial do Ipsis no celular", 780, 1688),
  ipsisLong: p(
    "/images/ipsis/landing-longa.webp",
    "Página do Ipsis inteira, da manchete às três decisões do projeto",
    1440,
    2520,
  ),

  clima: p(
    "/images/clima/inicio.webp",
    "Clima Cascavel à noite: céu limpo, 15 °C, vento, arco do sol e índice UV em cards de vidro",
    1920,
    1200,
  ),
  climaDays: p(
    "/images/clima/inicio-dias.webp",
    "Clima Cascavel: curva de temperatura dos próximos sete dias",
    1920,
    1200,
  ),
  climaCloudy: p(
    "/images/clima/inicio-nublado.webp",
    "Clima Cascavel em dia nublado: 24 °C, sensação térmica e chance de chuva",
    1440,
    900,
  ),
  climaElNino: p(
    "/images/clima/el-nino.webp",
    "Página El Niño do Clima Cascavel, com o aviso de que um dia de chuva não pode ser atribuído ao fenômeno",
    1920,
    1200,
  ),
  climaElNinoData: p("/images/clima/el-nino-dados.webp", "Página El Niño: situação atual com fonte e data", 1920, 1200),
  climaMobile: p(
    "/images/clima/inicio-celular.webp",
    "Clima Cascavel no celular, cena de céu limpo à noite",
    780,
    1688,
  ),
  climaDrizzleMobile: p(
    "/images/clima/inicio-garoa-celular.webp",
    "Clima Cascavel no celular, cena de garoa",
    250,
    498,
  ),
  climaElNinoMobile: p("/images/clima/el-nino-celular.webp", "Página El Niño no celular", 250, 498),
};

/** As sete telas do Ipsis (Design_system/estado-atual.html do repositório), com o rótulo real de cada uma. */
export const ipsisScreens = [
  { n: 1, title: "Consulta", note: "chat, painel de fonte, dosimetria e histórico", route: "/consulta" },
  { n: 2, title: "Jurisprudência", note: "entendimento consolidado e precedentes do STJ", route: "/jurisprudencia" },
  { n: 3, title: "Dosimetria", note: "cálculo trifásico ao vivo, sem banco", route: "/dosimetria" },
  { n: 4, title: "Vade Mecum", note: "grade de ramos e leitor de 75 legislações", route: "/vademecum" },
  { n: 5, title: "Clientes", note: "cadastro do escritório, com RLS por sessão", route: "/clientes" },
  { n: 6, title: "Fontes e atualizações", note: "vigília sobre a data de corte", route: "/fontes" },
  { n: 7, title: "Configurações", note: "perfil, garantias, fontes, aparência, segurança", route: "/configuracoes" },
].map((s) => ({
  ...s,
  photo: p(`/images/ipsis/tela-${s.n}.webp`, `Tela ${s.title} do Ipsis: ${s.note}`, 1920, 1236),
}));
