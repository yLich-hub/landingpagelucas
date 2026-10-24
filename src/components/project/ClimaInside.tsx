import { climaDetails } from "@/content/site";

/** Como o dado chega à tela + qualidade (README do Clima Cascavel). Sem animação: é leitura. */
export function ClimaInside({ solution }: { solution: string }) {
  const { flow, quality, lighthouse, lighthouseNote } = climaDetails;
  return (
    <>
      <section aria-labelledby="caminho-titulo" className="bg-ink py-24 md:py-32">
        <div className="wrap">
          <h2 id="caminho-titulo" className="headline max-w-[18ch]">
            Do provedor à tela, sem inventar.
          </h2>
          <p className="lead mt-5 max-w-[52ch] text-ash">{solution}</p>
          <ol className="relative mt-14 grid gap-4 md:grid-cols-5 md:gap-3">
            {/* linha que liga as etapas */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[0.42rem] top-6 w-px bg-amber/40 md:bottom-auto md:left-6 md:right-6 md:top-[0.42rem] md:h-px md:w-auto"
            />
            {flow.map((f, i) => (
              <li
                key={f.name}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className="relative flex gap-4 md:block"
              >
                <span
                  aria-hidden
                  className="relative z-10 mt-1 block size-[0.9rem] shrink-0 bg-amber md:mt-0 md:ml-[1rem]"
                />
                <div className="card flex-1 p-5 md:mt-5">
                  <p className="font-semibold tracking-[-0.02em]">{f.name}</p>
                  <p className="mt-1 text-[0.95rem] leading-snug text-ash">{f.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="qualidade-titulo" className="bg-ink-2 py-24 md:py-32">
        <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h2 id="qualidade-titulo" className="headline max-w-[16ch]">
              Testado antes de chegar ao ar.
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {quality.map((q, i) => (
                <li
                  key={q.title}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}
                  className="card p-6"
                >
                  <h3 className="font-semibold tracking-[-0.02em]">{q.title}</h3>
                  <p className="mt-2 text-ash">{q.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="self-end">
            <h3 className="title">Lighthouse no celular</h3>
            <table className="mt-6 w-full text-left">
              <caption className="sr-only">Notas do Lighthouse por página</caption>
              <thead>
                <tr className="text-sm text-ash">
                  <th scope="col" className="pb-3 font-normal">
                    Página
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    Performance
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    Acessibilidade
                  </th>
                  <th scope="col" className="pb-3 font-normal">
                    LCP
                  </th>
                </tr>
              </thead>
              <tbody className="tabular">
                {lighthouse.map((l) => (
                  <tr key={l.page} className="border-t border-white/8">
                    <th scope="row" className="py-4 font-medium">
                      {l.page}
                    </th>
                    <td className="py-4 text-[1.75rem] font-semibold tracking-[-0.03em]">{l.performance}</td>
                    <td className="py-4 text-[1.75rem] font-semibold tracking-[-0.03em]">{l.accessibility}</td>
                    <td className="py-4 text-ash">{l.lcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-sm text-ash">{lighthouseNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}
