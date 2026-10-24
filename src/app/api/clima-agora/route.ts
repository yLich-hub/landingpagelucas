import { cacheLife } from "next/cache";
import { connection } from "next/server";
import { climaDetails } from "@/content/site";

/**
 * O tempo de agora em Cascavel, lido da API pública do Clima Cascavel.
 * A API dele não manda CORS, então o navegador pergunta para cá e o servidor busca lá.
 * Nada é inventado: sem dado válido (ou com dado expirado) a resposta é { ok: false } e o selo some.
 */

export type ClimaNow =
  { ok: true; tempC: number; label: string | null; time: string; status: "fresh" | "stale" } | { ok: false };

// mesmos rótulos do Clima Cascavel (src/lib/weather/wmo-codes.ts)
const WMO: Record<number, string> = {
  0: "céu limpo",
  1: "predominantemente limpo",
  2: "parcialmente nublado",
  3: "nublado",
  45: "nevoeiro",
  48: "nevoeiro com geada",
  51: "garoa fraca",
  53: "garoa moderada",
  55: "garoa intensa",
  56: "garoa congelante fraca",
  57: "garoa congelante intensa",
  61: "chuva fraca",
  63: "chuva moderada",
  65: "chuva forte",
  66: "chuva congelante fraca",
  67: "chuva congelante forte",
  71: "neve fraca",
  73: "neve moderada",
  75: "neve forte",
  77: "grãos de neve",
  80: "pancadas de chuva fracas",
  81: "pancadas de chuva moderadas",
  82: "pancadas de chuva muito fortes",
  85: "pancadas de neve fracas",
  86: "pancadas de neve fortes",
  95: "trovoada",
  96: "trovoada com granizo fraco",
  97: "trovoada forte",
  99: "trovoada com granizo forte",
};

function parse(body: unknown): ClimaNow {
  const b = body as {
    current?: { temperatureC?: unknown; weatherCode?: unknown; time?: unknown };
    freshness?: { current?: { status?: unknown } };
  };
  const temp = b?.current?.temperatureC;
  const code = b?.current?.weatherCode;
  const time = typeof b?.current?.time === "string" ? b.current.time.match(/T(\d{2}:\d{2})/)?.[1] : undefined;
  const status = b?.freshness?.current?.status;
  if (typeof temp !== "number" || !Number.isFinite(temp) || !time) return { ok: false };
  if (status !== "fresh" && status !== "stale") return { ok: false }; // expirado ou desconhecido: não mostra
  return {
    ok: true,
    tempC: Math.round(temp),
    label: typeof code === "number" ? (WMO[code] ?? null) : null,
    time,
    status,
  };
}

async function readNow(): Promise<ClimaNow> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 3600 });
  const res = await fetch(climaDetails.liveApi, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  // falha lança: erro não entra no cache
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parse(await res.json());
}

export async function GET() {
  await connection(); // responde na hora; quem guarda é o cache de readNow
  let data: ClimaNow;
  try {
    data = await readNow();
  } catch {
    data = { ok: false };
  }
  return Response.json(data, { headers: { "cache-control": "no-store" } });
}
