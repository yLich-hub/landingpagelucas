# Portfólio — Lucas Maciel Vieira

## O que é
Landing page única de portfólio e currículo. Público: recrutadores técnicos e
tech leads. Objetivo: em 10 segundos saber quem eu sou, em 60 ter acesso a CV,
GitHub, LinkedIn e projetos.

## Stack
- Astro (site estático)
- Tailwind CSS
- TypeScript
- Deploy: Vercel

## Estrutura
- `src/data/` — TODO o conteúdo (perfil, projetos, stack, experiência). Editar aqui,
  nunca hardcodar texto em componente.
- `src/components/` — um componente por seção
- `src/styles/global.css` — tokens de design em variáveis CSS
- `public/` — CV em PDF, imagens, favicon

## Design system
- Fundo: `--bg` #0B0B0F | Elevado: `--bg-elevated` #14141B
- Texto: `--fg` #F2F2F5 | Secundário: `--fg-muted` #8A8A9A
- Acento: `--accent` #FBBF24 (âmbar quente) — usado com parcimônia, é o único ponto de cor
- Display: Archivo | Corpo: Inter | Mono: JetBrains Mono (a confirmar)
- Escala de tipo com `clamp()`, sem media query para tamanho de fonte
- Raio de borda: 4px. Sem sombra difusa; separação por borda de 1px.

## Regras obrigatórias
- Mobile-first. Todo componente tem que funcionar em 375px.
- Sempre usar as variáveis CSS. Nunca hex solto no componente.
- Contraste mínimo 4.5:1 em texto.
- Toda imagem com `alt`, `width`, `height` e `loading="lazy"` abaixo da dobra.
- `prefers-reduced-motion` respeitado em qualquer animação.
- Links externos: `target="_blank" rel="noopener noreferrer"`.
- Nenhum JS no cliente sem necessidade real (sem `client:*` desnecessário).
- Sem dependência nova sem eu aprovar antes.
- Português do Brasil em todo o conteúdo visível.

## Como eu quero trabalhar
- Uma seção por vez. Não gere o site inteiro de uma vez.
- Antes de gerar, me diga em 2 linhas a abordagem.
- Depois de gerar, explique as decisões não óbvias do código.
- Se eu pedir algo que quebre uma regra acima, aponte antes de fazer.

## Referência visual
Inspiração: landing "Octo SMM" (Humeniakk / by.shiva) — dark, acento neon,
tipografia display gigante, textura granulada, marquee, cards com sticky scroll.
IMPORTANTE: inspiração estrutural apenas. Não replicar assets nem o layout
literal. Identidade visual é própria.

## Desenvolvimento
Dev server em background: `astro dev --background`
(gerenciar com `astro dev stop`, `astro dev status`, `astro dev logs`).
Docs: https://docs.astro.build
