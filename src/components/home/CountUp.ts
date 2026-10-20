"use client";

import { gsap } from "@/lib/gsap";

const fmt = (v: number, decimals: number) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Conta de 0 até o valor de data-count. O HTML já traz o número real (legível sem JS);
 * o texto fixo depois do número (ex.: ":1") fica em data-suffix.
 */
export function countUp(el: HTMLElement, duration = 1.6) {
  if (el.dataset.counted) return;
  el.dataset.counted = "1";
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  const suffix = el.dataset.suffix ?? "";
  const c = { v: 0 };
  gsap.to(c, {
    v: target,
    duration,
    ease: "power3.out",
    onUpdate: () => {
      el.textContent = fmt(c.v, decimals) + suffix;
    },
  });
}
