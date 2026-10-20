import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink pt-24">
      <div className="wrap">
        <p className="font-pixel text-amber" aria-hidden>
          <span className="caret">&gt; 404</span>
        </p>
        <h1 className="display mt-6 max-w-[14ch]">Esta página não existe.</h1>
        <p className="lead mt-6 max-w-[40ch] text-ash">
          O endereço pode ter mudado. Os projetos e o contato estão no início.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="pill pill-light">
            Voltar ao início
          </Link>
          <Link href="/#projetos" className="pill pill-glass">
            Ver projetos
          </Link>
        </div>
      </div>
    </section>
  );
}
