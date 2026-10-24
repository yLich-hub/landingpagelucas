import { cacheLife } from "next/cache";
import { connection, type NextRequest } from "next/server";
import { links } from "@/content/shared";

/**
 * O tempo de agora em Cascavel, lido da API pública do Clima Cascavel.
 * A API dele não manda CORS, então o navegador pergunta para cá e o servidor busca lá.
 * Nada é inventado: sem dado válido (ou com dado expirado) a resposta é { ok: false } e o selo some.
 * ?lang=en devolve o nome da condição em inglês.
 */

export type ClimaNow =
  { ok: true; tempC: number; label: string | null; time: string; status: "fresh" | "stale" } | { ok: false };

type Reading = { tempC: number; code: number | null; time: string; status: "fresh" | "stale" } | null;

// mesmos rótulos do Clima Cascavel (src/lib/weather/wmo-codes.ts); inglês pela tabela WMO do Open-Meteo
const WMO: Record<number, [pt: string, en: string]> = {
  0: ["céu limpo", "clear sky"],
  1: ["predominantemente limpo", "mainly clear"],
  2: ["parcialmente nublado", "partly cloudy"],
  3: ["nublado", "overcast"],
  45: ["nevoeiro", "fog"],
  48: ["nevoeiro com geada", "depositing rime fog"],
  51: ["garoa fraca", "light drizzle"],
  53: ["garoa moderada", "moderate drizzle"],
  55: ["garoa intensa", "dense drizzle"],
  56: ["garoa congelante fraca", "light freezing drizzle"],
  57: ["garoa congelante intensa", "dense freezing drizzle"],
  61: ["chuva fraca", "slight rain"],
  63: ["chuva moderada", "moderate rain"],
  65: ["chuva forte", "heavy rain"],
  66: ["chuva congelante fraca", "light freezing rain"],
  67: ["chuva congelante forte", "heavy freezing rain"],
  71: ["neve fraca", "slight snow"],
  73: ["neve moderada", "moderate snow"],
  75: ["neve forte", "heavy snow"],
  77: ["grãos de neve", "snow grains"],
  80: ["pancadas de chuva fracas", "slight rain showers"],
  81: ["pancadas de chuva moderadas", "moderate rain showers"],
  82: ["pancadas de chuva muito fortes", "violent rain showers"],
  85: ["pancadas de neve fracas", "slight snow showers"],
  86: ["pancadas de neve fortes", "heavy snow showers"],
  95: ["trovoada", "thunderstorm"],
  96: ["trovoada com granizo fraco", "thunderstorm with slight hail"],
  97: ["trovoada forte", "heavy thunderstorm"],
  99: ["trovoada com granizo forte", "thunderstorm with heavy hail"],
};

function parse(body: unknown): Reading {
  const b = body as {
    current?: { temperatureC?: unknown; weatherCode?: unknown; time?: unknown };
    freshness?: { current?: { status?: unknown } };
  };
  const temp = b?.current?.temperatureC;
  const code = b?.current?.weatherCode;
  const time = typeof b?.current?.time === "string" ? b.current.time.match(/T(\d{2}:\d{2})/)?.[1] : undefined;
  const status = b?.freshness?.current?.status;
  if (typeof temp !== "number" || !Number.isFinite(temp) || !time) return null;
  if (status !== "fresh" && status !== "stale") return null; // expirado ou desconhecido: não mostra
  return { tempC: Math.round(temp), code: typeof code === "number" ? code : null, time, status };
}

async function readNow(): Promise<Reading> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 3600 });
  const res = await fetch(links.climaApi, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  // falha lança: erro não entra no cache
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parse(await res.json());
}

export async function GET(request: NextRequest) {
  await connection(); // responde na hora; quem guarda é o cache de readNow
  const lang = request.nextUrl.searchParams.get("lang") === "en" ? 1 : 0;
  let data: ClimaNow = { ok: false };
  try {
    const r = await readNow();
    if (r)
      data = {
        ok: true,
        tempC: r.tempC,
        label: r.code === null ? null : (WMO[r.code]?.[lang] ?? null),
        time: r.time,
        status: r.status,
      };
  } catch {
    data = { ok: false };
  }
  return Response.json(data, { headers: { "cache-control": "no-store" } });
}
