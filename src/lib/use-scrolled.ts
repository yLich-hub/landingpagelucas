"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  addEventListener("scroll", cb, { passive: true });
  addEventListener("resize", cb);
  return () => {
    removeEventListener("scroll", cb);
    removeEventListener("resize", cb);
  };
};

/** true quando a página rolou mais que `fraction` da altura da tela (ou `minPx`). */
export function useScrolledPast(fraction: number, minPx = 0) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > Math.max(minPx, window.innerHeight * fraction),
    () => false,
  );
}
