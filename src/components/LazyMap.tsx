"use client";

import { useEffect, useRef, useState } from "react";

// ⚠ o iframe do Google Maps pesa ~75 kB de JS e o loading="lazy" dispara cedo em página longa
export function LazyMap({ embedUrl, openUrl, title }: { embedUrl: string; openUrl: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="card relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full md:min-h-80">
      {show ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-noir absolute inset-0 size-full border-0"
        />
      ) : (
        <div className="flex size-full items-center justify-center p-6">
          <a href={openUrl} target="_blank" rel="noopener noreferrer" className="pill pill-glass">
            Abrir no Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
