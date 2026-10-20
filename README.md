# lucas.vieira — portfólio

Rebranding de https://landingpagelucas.vercel.app. Uma home contada em cenas de rolagem (o ponto âmbar do
logo vira a porta para os projetos), duas páginas de projeto e um montador de convite que entrega a
mensagem pronta no e-mail ou no WhatsApp. Todo o conteúdo é real: textos do site atual e do CV, capturas
dos próprios projetos.

- Levantamento e status de cada fonte: [`docs/dossie.md`](docs/dossie.md)
- Direção de arte, roteiro de cenas, tipografia e paleta: [`docs/direcao-de-arte.md`](docs/direcao-de-arte.md)
- Espécime de fontes: [`docs/especimes.html`](docs/especimes.html)

## Rodar localmente

Requer Node.js 22 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # tipos + lint + build de produção
npm run build && npm start
```

## Onde editar

| O quê | Onde |
| --- | --- |
| Textos, projetos, trajetória, stack, contato, redes, SEO | `src/content/site.ts` (única fonte de dados) |
| Fotos e capturas (caminho, texto alternativo, tamanho) | `src/content/photos.ts` + arquivos em `public/images/` |
| Trocar uma imagem | substitua o arquivo em `public/images/…` mantendo o nome; se a imagem antiga continuar aparecendo, apague `.next` e gere de novo |
| Cores, tipografia, botões | `src/app/globals.css` (tokens em `@theme`, componentes em `@layer components`) |
| Cenas da home | `src/components/home/*Scene.tsx` (uma por cena, na ordem de `src/app/page.tsx`) |
| Logo, favicon e imagem de compartilhamento | `npm run logo` (gera tudo a partir de `scripts/build-logo.mjs`) |
| Currículo e diploma | `public/curriculo-lucas-maciel-vieira.pdf`, `public/diploma-administracao.pdf` |
| Esconder o WhatsApp | deixe `contact.whatsappNumber` vazio em `site.ts`: o botão flutuante e o convite passam a usar só e-mail |

## Pendências (confirmar com o Lucas)

Informações:
- [x] **WhatsApp**: `(45) 99991-3183` confirmado pelo Lucas em 20/10/2026 como WhatsApp, liberado para o site.
- [x] **LinkedIn**: `/in/lucasmacielvieira/` confirmado em 20/10/2026. O CV em PDF ainda traz o endereço antigo (`/in/lucas-maciel-vieira-952865223/`): vale gerar o CV de novo pelo LinkedIn.
- [x] **Certto**: saída em julho de 2026 (confirmado em 20/10/2026). O CV em PDF ainda diz "Present".
- [x] **Repositório deste site**: o código novo substituiu o portfólio em Astro no próprio `yLich-hub/landingpagelucas` (20/10/2026); o histórico antigo continua no Git.
- [ ] **E-mail**: o CV traz `@hotmail.com`; o site usa `lucasmacielvieira55@gmail.com` (mantido).

Arquivos:
- [x] **Foto**: retrato de 1333×2000 enviado em 20/10/2026, usado no manifesto e no convite.
- [ ] **Crédito da foto**: se o retrato for de um fotógrafo, informar o nome para o crédito.
- [ ] **Instagram e LinkedIn**: ficaram com login pendente no levantamento (só 4 posts em 640 px visíveis sem conta). Se quiser fotos de lá no site, mande os arquivos ou confirme quais usar.
- [ ] **Vídeo**: não há vídeo dos projetos. Uma gravação de tela do Ipsis ou do Clima (30–60 s, MP4) pode entrar na cena das telas.
- [ ] **Depoimentos**: não existem fontes públicas. Se houver recomendações no LinkedIn, dá para trazer trechos curtos com autorização.
- [ ] **Logo original**: o logo foi redesenhado em vetor (Inter Tight + ponto quadrado). Se houver um arquivo próprio, substitua `public/images/marca/logo.svg`.

## Origem das imagens

| Arquivo | Origem |
| --- | --- |
| `perfil/lucas-retrato.webp`, `perfil/lucas-rosto.webp` | retrato enviado pelo Lucas em 20/10/2026 (recorte do rosto para o avatar) |
| `ipsis/landing*.webp` | capturas de https://ipsis-juridico.vercel.app (19/10/2026) e `src/assets/projetos/ipsis.png` do site atual |
| `ipsis/tela-1…7.webp` | `Design_system/estado-atual.html` do repositório Ipsis (as telas reais ficam atrás de login) |
| `clima/*.webp` | capturas de https://cascavel-clima.vercel.app (19/10/2026) e `docs/screenshots` do repositório |
| `marca/*`, `app/icon.svg`, `app/*-image.jpg` | gerados por `scripts/build-logo.mjs` |

## Verificação feita

- QA visual com Chrome headless (desktop 1440 e celular 390, 12 e 8 posições de rolagem, teste de redimensionamento 750 → 1600): sem erros de console, sem estouro horizontal, nenhuma cena encolhida, fontes e WebGL ativos.
- Convite testado de ponta a ponta (nome obrigatório, escolhas com `aria-pressed`, texto exato no WhatsApp e no e-mail) e alvos de toque ≥ 44 px no celular.
- axe-core (WCAG 2.2 AA + boas práticas) em `/`, `/projetos/ipsis`, `/projetos/clima-cascavel` e 404, desktop e celular: sem violações.
- Lighthouse **no localhost** (índice de desempenho da máquina ~3.300), home: celular Performance 92, LCP 3,3 s, TBT 70 ms, CLS 0; desktop Performance 100, LCP 0,8 s. Medir de novo no ar em https://pagespeed.web.dev depois de publicar.

## Publicar na Vercel

1. `npx vercel whoami` — se não houver sessão, rode `npx vercel login` (você mesmo).
2. Primeira publicação, que cria e vincula o projeto: `npx vercel deploy --yes`.
3. URL definitiva, em produção e em preview:
   ```bash
   npx vercel env add NEXT_PUBLIC_SITE_URL production
   npx vercel env add NEXT_PUBLIC_SITE_URL preview
   ```
   Valor: a URL do projeto (ex.: `https://landingpagelucas.vercel.app`) ou o domínio próprio.
4. `npx vercel deploy --prod --yes`.
5. Conferir: todas as rotas em 200, uma rota inexistente em 404, `sitemap.xml`, `robots.txt`, `canonical` e `og:image` com a URL certa.

`vercel.json` já fixa `"framework": "nextjs"` (sem isso a CLI pode criar o projeto como "Other" e tudo responde 404),
e `.vercelignore` deixa `docs/` fora do deploy. O plano Hobby da Vercel é para uso pessoal e não comercial,
o que serve para um portfólio. Ligar o projeto a um repositório no GitHub faz cada alteração ser publicada sozinha.

### Domínio próprio

1. Vercel → projeto → **Settings → Domains**: adicione o domínio raiz e o `www`.
2. No Registro.br (ou onde o domínio estiver), crie os registros que a Vercel indicar: em geral um `A` no raiz e um `CNAME` no `www`.
3. **Settings → Environment Variables**: troque `NEXT_PUBLIC_SITE_URL` pelo domínio novo e publique de novo (sitemap, Open Graph e JSON-LD passam a usar o domínio).
4. Cadastre o domínio no Google Search Console, envie o `sitemap.xml` e atualize o link do site no LinkedIn, no GitHub e na bio do Instagram.
