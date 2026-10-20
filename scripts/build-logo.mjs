// Gera a marca em vetor a partir da fonte (não depende de fonte no navegador):
// logo, favicon, apple-icon e imagens de compartilhamento.
// Uso: npm run logo
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const fontFile = (w) =>
  path.join(root, `node_modules/@fontsource/inter-tight/files/inter-tight-latin-${w}-normal.woff`);
const load = (file) => {
  const buf = readFileSync(file);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const semibold = load(fontFile(600));
const regular = load(fontFile(400));

const INK = "#09090c";
const CREAM = "#f3f1ec";
const ASH = "#a3a3ad";
const AMBER = "#fbbf24";

/** Texto em contornos, com tracking em em (negativo aperta). */
function textPath(font, text, x, y, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  let cursor = x;
  const parts = [];
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  glyphs.forEach((g, i) => {
    parts.push(g.getPath(cursor, y, size).toPathData(2));
    let adv = g.advanceWidth * scale;
    if (i < glyphs.length - 1) adv += font.getKerningValue(g, glyphs[i + 1]) * scale;
    cursor += adv + tracking * size;
  });
  return { d: parts.join(""), end: cursor - tracking * size };
}

// Logo: "lucas" + ponto quadrado (pixel âmbar) + "vieira"
const SIZE = 100;
const TRACK = -0.045;
const baseline = 100;
const left = textPath(semibold, "lucas", 0, baseline, SIZE, TRACK);
const dot = 13; // lado do pixel, em unidades do viewBox
const dotX = left.end + 5;
const right = textPath(semibold, "vieira", dotX + dot + 5, baseline, SIZE, TRACK);
/** Caixa de um texto desenhado glifo a glifo. */
function boxOf(font, text, x, y, size) {
  const p = new opentype.Path();
  [...text].forEach((ch) => p.extend(font.charToGlyph(ch).getPath(x, y, size)));
  return p.getBoundingBox();
}
const bbox = boxOf(semibold, "lucasvieira", 0, baseline, SIZE);
const top = Math.floor(bbox.y1) - 2;
const width = Math.ceil(right.end) + 2;
const height = Math.ceil(baseline - top) + 4;

const logo = (
  fill,
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${top} ${width} ${height}" width="${width}" height="${height}">
<title>lucas.vieira</title>
<path fill="${fill}" d="${left.d}${right.d}"/>
<rect data-dot="" x="${dotX.toFixed(2)}" y="${baseline - dot}" width="${dot}" height="${dot}" fill="${AMBER}"/>
</svg>
`;
mkdirSync(path.join(root, "public/images/marca"), { recursive: true });
writeFileSync(path.join(root, "public/images/marca/logo.svg"), logo("currentColor"));
writeFileSync(path.join(root, "public/images/marca/logo-claro.svg"), logo(CREAM));
writeFileSync(path.join(root, "public/images/marca/logo-escuro.svg"), logo(INK));

// Favicon: "l" + pixel âmbar sobre o fundo da marca
const l = textPath(semibold, "l", 0, 0, 300, 0);
const lBox = boxOf(semibold, "l", 0, 0, 300);
const lW = lBox.x2 - lBox.x1;
const icon = (s) => {
  const px = 64;
  const groupW = lW + 26 + px;
  const ox = (512 - groupW) / 2 - lBox.x1;
  const base = 256 + (lBox.y2 - lBox.y1) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${s}" height="${s}">
<rect width="512" height="512" rx="112" fill="${INK}"/>
<path fill="${CREAM}" transform="translate(${ox.toFixed(1)} ${base.toFixed(1)})" d="${l.d}"/>
<rect x="${(ox + lBox.x2 + 26).toFixed(1)}" y="${(base - px).toFixed(1)}" width="${px}" height="${px}" fill="${AMBER}"/>
</svg>
`;
};
writeFileSync(path.join(root, "src/app/icon.svg"), icon(512));
await sharp(Buffer.from(icon(180)))
  .png()
  .toFile(path.join(root, "src/app/apple-icon.png"));

// Imagem de compartilhamento 1200x630: campo de pixels, logo e a linha de posicionamento
const W = 1200;
const H = 630;
let grid = "";
for (let y = 0; y < H; y += 18) {
  for (let x = 0; x < W; x += 18) {
    const d = Math.hypot(x - 960, y - 150) / 900;
    const n = (Math.sin(x * 0.031) + Math.cos(y * 0.047 + x * 0.011)) * 0.5;
    const a = Math.max(0, 0.32 - d * 0.36 + n * 0.06);
    if (a > 0.02) grid += `<rect x="${x}" y="${y}" width="6" height="6" fill="${AMBER}" opacity="${a.toFixed(3)}"/>`;
  }
}
const ogScale = 1.6;
const tagline = textPath(regular, "Estudante de Engenharia de Software · Cascavel — PR", 0, 0, 36, -0.012);
const tagline2 = textPath(regular, "Projetos: Ipsis (pesquisa jurídica) e Clima Cascavel", 0, 0, 28, -0.01);
const og = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="${INK}"/>
${grid}
<rect width="${W}" height="${H}" fill="url(#v)"/>
<defs><radialGradient id="v" cx=".3" cy=".75" r=".9"><stop offset="0" stop-color="${INK}" stop-opacity=".92"/><stop offset="1" stop-color="${INK}" stop-opacity="0"/></radialGradient></defs>
<g transform="translate(80 ${300 - top * ogScale}) scale(${ogScale})">
<path fill="${CREAM}" d="${left.d}${right.d}"/>
<rect x="${dotX.toFixed(2)}" y="${baseline - dot}" width="${dot}" height="${dot}" fill="${AMBER}"/>
</g>
<path fill="${CREAM}" transform="translate(84 ${300 + height * ogScale + 64})" d="${tagline.d}"/>
<path fill="${ASH}" transform="translate(84 ${300 + height * ogScale + 116})" d="${tagline2.d}"/>
</svg>`;
for (const name of ["opengraph-image.jpg", "twitter-image.jpg"]) {
  await sharp(Buffer.from(og))
    .jpeg({ quality: 88 })
    .toFile(path.join(root, "src/app", name));
  writeFileSync(
    path.join(root, "src/app", name.replace(".jpg", ".alt.txt")),
    "lucas.vieira — Lucas Maciel Vieira, estudante de Engenharia de Software em Cascavel, PR",
  );
}
console.log("logo", width, "x", height, "· ícones e OG gerados");
