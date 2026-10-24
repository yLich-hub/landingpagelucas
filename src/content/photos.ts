// Uma entrada por imagem em /public/images, com o texto alternativo nos dois idiomas.
// Para trocar uma imagem, substitua o arquivo mantendo o nome (ou mude o nome aqui para não pegar cache).
// Origem de cada uma: docs/dossie.md (biblioteca de ativos).
import type { Locale } from "./shared";

export type Photo = { src: string; alt: string; width: number; height: number };
type Source = { src: string; alt: { pt: string; en: string }; width: number; height: number };

const p = (src: string, pt: string, en: string, width: number, height: number): Source => ({
  src,
  alt: { pt, en },
  width,
  height,
});

const sources = {
  // retrato enviado pelo Lucas em 20/10/2026
  lucas: p(
    "/images/perfil/lucas-retrato.webp",
    "Lucas Maciel Vieira sentado num banco claro, de camiseta vermelha e calça bege, em fundo escuro",
    "Lucas Maciel Vieira sitting on a light stool, in a red T-shirt and beige trousers, against a dark backdrop",
    1333,
    2000,
  ),
  lucasFace: p(
    "/images/perfil/lucas-rosto.webp",
    "Rosto de Lucas Maciel Vieira",
    "Lucas Maciel Vieira's face",
    256,
    256,
  ),

  ipsisLanding: p(
    "/images/ipsis/landing.webp",
    "Página inicial do Ipsis: “O modelo escreve a argumentação. O texto da lei ele nunca escreve.” e uma consulta de exemplo",
    "Ipsis landing page, in Portuguese: “The model writes the argument. It never writes the text of the law.” above a sample query",
    1920,
    1200,
  ),
  ipsisCitation: p(
    "/images/ipsis/landing-citacao.webp",
    "Resposta do Ipsis com a citação do art. 42 da Lei 11.343/2006 aberta, lida do corpus e com a data da redação",
    "An Ipsis answer with the citation of article 42 of Brazil's Drug Law open, read from the corpus and dated",
    1920,
    1200,
  ),
  ipsisDecisions: p(
    "/images/ipsis/landing-decisoes.webp",
    "Seção “As três decisões que definem o projeto” na página do Ipsis",
    "The “three decisions that define the project” section of the Ipsis page",
    1920,
    1200,
  ),

  // Clima Cascavel: capturas do site publicado em 23/10/2026 (depois das atualizações de 20/10)
  clima: p(
    "/images/clima/inicio-2026-10.webp",
    "Início do Clima Cascavel à noite: nublado, 18 °C, cards de vidro de vento, sol e índice UV sobre a cena de nuvens",
    "Clima Cascavel home at night: overcast, 18 °C, glass cards for wind, sun and UV index over the cloud scene",
    1920,
    1200,
  ),
  climaDayDetail: p(
    "/images/clima/detalhe-do-dia.webp",
    "Card “Detalhe do dia”: abas em pílula dos sete dias, gráfico de chuva hora a hora e a lista das próximas horas",
    "“Day detail” card: pill tabs for seven days, an hourly rain chart and the list of the next hours",
    1920,
    1200,
  ),
  climaStory: [
    p(
      "/images/clima/historia-1.webp",
      "História do El Niño, passo 1: “Um oceano que mexe com o clima do planeta”, com o mar ilustrado azul",
      "El Niño story, step 1: “An ocean that moves the planet's climate”, with the illustrated ocean in blue",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-2.webp",
      "Passo 2, La Niña: “Quando o Pacífico esfria”, com o mar ilustrado em azul frio",
      "Step 2, La Niña: “When the Pacific cools”, with the illustrated ocean in cold blue",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-3.webp",
      "Passo 3, El Niño: “Quando o Pacífico esquenta”, com o mar ilustrado aquecendo",
      "Step 3, El Niño: “When the Pacific warms”, with the illustrated ocean warming up",
      1920,
      1200,
    ),
    p(
      "/images/clima/historia-4.webp",
      "Passo 4: “E como está o Pacífico agora?”, com +3,3 °C na região Niño 3.4 segundo o NOAA",
      "Step 4: “And how is the Pacific right now?”, showing +3.3 °C in the Niño 3.4 region according to NOAA",
      1920,
      1200,
    ),
  ],
  climaLive: p(
    "/images/clima/el-nino-ao-vivo.webp",
    "Painel “Agora no Pacífico”: situação oficial do NOAA (El Niño em curso), régua do Niño 3.4 em +3,3 °C e gráfico das últimas 52 semanas",
    "“Now in the Pacific” panel: NOAA's official status (El Niño under way), the Niño 3.4 gauge at +3.3 °C and a chart of the last 52 weeks",
    1920,
    1200,
  ),
  climaAbout: p(
    "/images/clima/sobre.webp",
    "Página Sobre e fontes: previsão do tempo, alertas oficiais e contexto climático explicados como três coisas diferentes",
    "About and sources page: weather forecast, official alerts and climate context explained as three different things",
    1920,
    1200,
  ),
  climaMobile: p(
    "/images/clima/inicio-celular-2026-10.webp",
    "Início do Clima Cascavel no celular, com o menu inferior de app instalável",
    "Clima Cascavel home on a phone, with the installable app's bottom menu",
    780,
    1688,
  ),
  climaDayDetailMobile: p(
    "/images/clima/detalhe-celular.webp",
    "Detalhe do dia no celular: abas dos dias e chuva hora a hora",
    "Day detail on a phone: day tabs and rain hour by hour",
    780,
    1688,
  ),
  climaLaNinaMobile: p(
    "/images/clima/historia-la-nina-celular.webp",
    "História do El Niño no celular, passo La Niña, com o mar azul",
    "El Niño story on a phone, La Niña step, with the blue ocean",
    780,
    1688,
  ),
  climaNowMobile: p(
    "/images/clima/historia-agora-celular.webp",
    "História do El Niño no celular, último passo: +3,3 °C no Pacífico agora",
    "El Niño story on a phone, last step: +3.3 °C in the Pacific right now",
    780,
    1688,
  ),
  climaLiveMobile: p(
    "/images/clima/el-nino-ao-vivo-celular.webp",
    "Painel “Agora no Pacífico” no celular, com a situação oficial do NOAA",
    "“Now in the Pacific” panel on a phone, with NOAA's official status",
    780,
    1688,
  ),
};

/** As sete telas do Ipsis (Design_system/estado-atual.html do repositório), com o rótulo real de cada uma. */
const screens = [
  {
    n: 1,
    pt: ["Consulta", "chat, painel de fonte, dosimetria e histórico"],
    en: ["Search", "chat, source panel, sentencing and history"],
  },
  {
    n: 2,
    pt: ["Jurisprudência", "entendimento consolidado e precedentes do STJ"],
    en: ["Case law", "settled positions and precedents from the STJ"],
  },
  {
    n: 3,
    pt: ["Dosimetria", "cálculo trifásico ao vivo, sem banco"],
    en: ["Sentencing", "live three-phase calculation, no database"],
  },
  {
    n: 4,
    pt: ["Vade Mecum", "grade de ramos e leitor de 75 legislações"],
    en: ["Statute library", "areas of law and a reader for 75 federal statutes"],
  },
  {
    n: 5,
    pt: ["Clientes", "cadastro do escritório, com RLS por sessão"],
    en: ["Clients", "law-firm records, with row-level security per session"],
  },
  {
    n: 6,
    pt: ["Fontes e atualizações", "vigília sobre a data de corte"],
    en: ["Sources and updates", "a watch on the corpus cut-off date"],
  },
  {
    n: 7,
    pt: ["Configurações", "perfil, garantias, fontes, aparência, segurança"],
    en: ["Settings", "profile, guarantees, sources, appearance, security"],
  },
] as const;

const resolve = (s: Source, l: Locale): Photo => ({ src: s.src, alt: s.alt[l], width: s.width, height: s.height });

type Photos = { [K in keyof typeof sources]: (typeof sources)[K] extends Source[] ? Photo[] : Photo };

export function getPhotos(l: Locale): Photos {
  return Object.fromEntries(
    Object.entries(sources).map(([k, v]) => [k, Array.isArray(v) ? v.map((s) => resolve(s, l)) : resolve(v, l)]),
  ) as Photos;
}

export function getIpsisScreens(l: Locale) {
  return screens.map((s) => {
    const [title, note] = s[l];
    const alt = l === "en" ? `Ipsis ${title} screen, in Portuguese: ${note}` : `Tela ${title} do Ipsis: ${note}`;
    return { n: s.n, title, note, photo: { src: `/images/ipsis/tela-${s.n}.webp`, alt, width: 1920, height: 1236 } };
  });
}
