import type { Metric as M } from "@/content";

/** Número real no HTML; a contagem é só enfeite por cima. */
export function Metric({ metric, numberLocale, className }: { metric: M; numberLocale: string; className?: string }) {
  const suffix = metric.display.replace(/^[\d.,]+/, "");
  return (
    <div className={className}>
      <p
        className="tabular text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-none tracking-[-0.045em]"
        data-count={metric.value}
        data-decimals={metric.decimals ?? 0}
        data-suffix={suffix}
        data-locale={numberLocale}
      >
        {metric.display}
      </p>
      <p className="mt-2 max-w-[22ch] text-[0.95rem] leading-snug opacity-80">{metric.label}</p>
    </div>
  );
}
