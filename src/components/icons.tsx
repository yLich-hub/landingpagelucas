import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

export const IconWhatsapp = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.81.82-3-.2-.31a8.2 8.2 0 1 1 6.94 3.83Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.04-.39-1.99-1.23a7.4 7.4 0 0 1-1.37-1.71c-.15-.25-.02-.38.1-.5.12-.12.26-.3.38-.45.12-.15.17-.25.25-.42.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.73 2.64 4.2 3.7.58.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);
export const IconMail = (p: P) => (
  <svg
    {...base}
    {...p}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
export const IconGithub = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
export const IconLinkedin = (p: P) => (
  <svg {...base} {...p} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const IconDownload = (p: P) => (
  <svg
    {...base}
    {...p}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
  </svg>
);
export const IconArrowUpRight = (p: P) => (
  <svg
    {...base}
    {...p}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);
export const IconChevron = (p: P) => (
  <svg
    {...base}
    width={16}
    height={16}
    {...p}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 6 6 6-6 6" />
  </svg>
);
export const IconMenu = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
