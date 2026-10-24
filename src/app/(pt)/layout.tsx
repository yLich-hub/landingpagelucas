import type { Viewport } from "next";
import { RootShell, rootMetadata } from "@/components/RootShell";
import "../globals.css";

// raiz do site em Português; o site inteiro é estático: nada renderiza por requisição
export const ensureStatic = "navigation";
export const metadata = rootMetadata("pt");
export const viewport: Viewport = { themeColor: "#09090c", colorScheme: "dark" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="pt">{children}</RootShell>;
}
