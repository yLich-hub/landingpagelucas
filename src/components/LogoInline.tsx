import fs from "node:fs";
import path from "node:path";

/** Logo como SVG inline (aparece no 1º quadro e não concorre a LCP). Lido de /public no build. */
export function LogoInline({ className, label = "lucas.vieira" }: { className?: string; label?: string }) {
  const raw = fs.readFileSync(path.join(process.cwd(), "public/images/marca/logo.svg"), "utf8");
  const svg = raw
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<svg([^>]*?)\swidth="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?)\sheight="[^"]*"/, "<svg$1")
    .replace("<svg", `<svg role="img" aria-label="${label}" focusable="false"`);
  return (
    <span
      className={`block [&>svg]:block [&>svg]:h-auto [&>svg]:w-full ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
