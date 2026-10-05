# Portfólio — Lucas Maciel Vieira

Landing page única de portfólio e currículo. Objetivo: em 10 segundos saber quem
eu sou; em 60, ter acesso a CV, GitHub, LinkedIn e projetos.

**No ar:** em breve na Vercel.

## Stack

- [Astro](https://astro.build) — site estático, zero JS no cliente por padrão
- [Tailwind CSS](https://tailwindcss.com) v4
- TypeScript
- Deploy: Vercel

## Estrutura

- `src/data/` — todo o conteúdo (perfil, projetos, stack, experiência) e os
  textos da interface (`textos.ts`). Para atualizar o site, edita-se aqui, não
  nos componentes.
- `src/components/` — um componente por seção
- `src/styles/global.css` — design tokens em variáveis CSS
- `src/assets/` — foto e capturas dos projetos, importadas em `src/data/`
  (otimizadas para WebP no build; caminho errado quebra o build)
- `public/` — CV em PDF, og-image, favicon e fontes auto-hospedadas

## Decisões

- **Dark com um único acento** (âmbar #FBBF24), tipografia display gigante
  (Archivo) com escala fluida via `clamp()`.
- **Fontes locais** (`woff2` em `public/fonts/`) com `font-display: swap` —
  sem request para o Google Fonts.
- **Zero JavaScript no cliente**: marquee e navegação são CSS puro;
  `prefers-reduced-motion` é respeitado.
- Mobile-first, testado a partir de 375px.

## Rodando local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```
