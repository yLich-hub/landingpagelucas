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

  // Clima Cascavel: capturas do site publicado em 23/10/2026 (depois das atualizações de 20/10)
  clima: p(
    "/images/clima/inicio-2026-10.webp",
    "Início do Clima Cascavel à noite: nublado, 18 °C, cards de vidro de vento, sol e índice UV sobre a cena de nuvens",
    1920,
    1200,
  ),
  climaDayDetail: p(
    "/images/clima/detalhe-do-dia.webp",
    "Card “Detalhe do dia”: abas em pílula dos sete dias, gráfico de chuva hora a hora e a lista das próximas horas",
    1920,
    1200,
  ),
  climaStory: [
    p(
      "/images/clima/historia-1.webp",
      "História do El Niño, passo 1: “Um oceano que mexe com o clima do planeta”, com o mar ilustrado azul",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-2.webp",
      "Passo 2, La Niña: “Quando o Pacífico esfria”, com o mar ilustrado em azul frio",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-3.webp",
      "Passo 3, El Niño: “Quando o Pacífico esquenta”, com o mar ilustrado aquecendo",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-4.webp",
      "Passo 4: “E como está o Pacífico agora?”, com +3,3 °C na região Niño 3.4 segundo o NOAA",
      1920,
      1200,
    ),
  ],
  climaLive: p(
    "/images/clima/el-nino-ao-vivo.webp",
    "Painel “Agora no Pacífico”: situação oficial do NOAA (El Niño em curso), régua do Niño 3.4 em +3,3 °C e gráfico das últimas 52 semanas",
    1920,
    1200,
  ),
  climaAbout: p(
    "/images/clima/sobre.webp",
    "Página Sobre e fontes: previsão do tempo, alertas oficiais e contexto climático explicados como três coisas diferentes",
    1920,
    1200,
  ),
  climaMobile: p(
    "/images/clima/inicio-celular-2026-10.webp",
    "Início do Clima Cascavel no celular, com o menu inferior de app instalável",
    780,
    1688,
  ),
  climaDayDetailMobile: p(
    "/images/clima/detalhe-celular.webp",
    "Detalhe do dia no celular: abas dos dias e chuva hora a hora",
    780,
    1688,
  ),
  climaLaNinaMobile: p(
    "/images/clima/historia-la-nina-celular.webp",
    "História do El Niño no celular, passo La Niña, com o mar azul",
    780,
    1688,
  ),
  climaNowMobile: p(
    "/images/clima/historia-agora-celular.webp",
    "História do El Niño no celular, último passo: +3,3 °C no Pacífico agora",
    780,
    1688,
  ),
  climaLiveMobile: p(
    "/images/clima/el-nino-ao-vivo-celular.webp",
    "Painel “Agora no Pacífico” no celular, com a situação oficial do NOAA",
    780,
    1688,
  ),
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
