import { Inter_Tight, Silkscreen } from "next/font/google";

// Uma definição só, usada pelas duas raízes (português e inglês)
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
  display: "swap",
  preload: false,
});
