# Dossiê — Lucas Maciel Vieira

Levantamento feito em 19/10/2026 para o rebranding de https://landingpagelucas.vercel.app.
Não é uma empresa, é uma marca pessoal: a "conversão" aqui é um recrutador ou cliente
entrar em contato com o pedido de conversa já escrito.

## Identificação

| Campo | Valor | Fonte |
| --- | --- | --- |
| Nome | Lucas Maciel Vieira | site, CV, GitHub |
| Marca usada no site atual | `lucas.vieira` (o primeiro "." na cor de destaque) | código do site (`src/data/perfil.ts`) |
| Posicionamento | Estudante de Engenharia de Software, em transição da administração para o desenvolvimento | site |
| Cidade | Cascavel — PR | site, CV |
| Disponibilidade | remoto, híbrido ou presencial | site |
| E-mail público | lucasmacielvieira55@gmail.com | site (o CV traz um @hotmail antigo; vale o do site) |
| Telefone | 45 99991-3183 (Mobile) | CV em PDF publicado no próprio site. WhatsApp confirmado pelo Lucas em 20/10/2026, liberado para o site. |
| GitHub | https://github.com/yLich-hub | site, API do GitHub |
| LinkedIn | https://www.linkedin.com/in/lucasmacielvieira/ | confirmado pelo Lucas em 20/10/2026 (o site antigo e o CV ainda apontam para `/in/lucas-maciel-vieira-952865223/`) |
| Instagram | https://www.instagram.com/lucasmacielvieira/ | informado pelo usuário |

## Status das fontes

| Fonte | Status | URL | Observação |
| --- | --- | --- | --- |
| Site atual | `ok` | https://landingpagelucas.vercel.app | Astro 7, uma página. Código público lido: https://github.com/yLich-hub/landingpagelucas |
| Currículo (PDF) | `ok` | https://landingpagelucas.vercel.app/curriculo-lucas-maciel-vieira.pdf | datas exatas de cargos e formação |
| Diploma (PDF) | `ok` | https://landingpagelucas.vercel.app/diploma-administracao.pdf | cópia com RG e nascimento tarjados (comentário no código) — reaproveitada como está |
| Perfil do Google (Maps) | `não existe` | — | pessoa física, sem perfil de negócio. Busca: `"Lucas Maciel Vieira" Cascavel` |
| Instagram | `login pendente` | https://www.instagram.com/lucasmacielvieira/ | sem login: nome "Maciel", bio "@scinternacional ❤ / Engenharia de Software", 639 seguidores, 1.018 seguindo, 4 posts visíveis em 640 px (2019–2026, fotos pessoais). Destaques e posts completos exigem login. |
| LinkedIn | `login pendente` | https://www.linkedin.com/in/lucasmacielvieira/ | authwall. O conteúdo do CV (exportado do LinkedIn) cobre o essencial. |
| GitHub | `ok` | https://github.com/yLich-hub | 8 repositórios públicos, conta criada em 16/09/2025 |
| Projeto Ipsis | `ok` | https://ipsis-juridico.vercel.app · https://github.com/yLich-hub/Ipsis | landing pública; telas internas atrás de login, capturadas a partir de `Design_system/estado-atual.html` do repositório |
| Projeto Clima Cascavel | `ok` | https://cascavel-clima.vercel.app · https://github.com/yLich-hub/cascavel-clima | capturado ao vivo (céu limpo, 19/10/2026 23h) + capturas do README (nublado, garoa) |
| Jogo do número secreto | `ok`, não usado | https://jogo-nine-pi-52.vercel.app | exercício de curso; a ilustração não parece ser dele → fica fora |
| Cardápio/catálogo | `não existe` | — | substituído pelo "catálogo" de projetos e pelo montador de convite |
| Outras redes (Facebook, YouTube, TikTok) | `não existe` | — | nenhuma citada no site, CV ou GitHub |
| Pesquisa aberta | `não existe` | WebSearch `"Lucas Maciel Vieira" Cascavel` | nenhuma reportagem ou menção pública; resultados eram homônimos. Skill `deep-research` não usada: a busca direta bastou e não havia o que aprofundar. |

## Conteúdo real

### Bio (site e CV, texto dele)
- "Bacharel em administração formado pelo Centro Universitário Assis Gurgacz e com fluidez no idioma inglês (New York School)."
- "No ano de 2026 iniciei a faculdade de Engenharia de Software pelo Centro Universitário Assis Gurgacz."
- "Minha trajetória é marcada pelo foco no atendimento ao cliente e na eficiência operacional. [...]"
- **Frase da casa (vira o manifesto):** "Sou movido por soluções que unam organização administrativa e excelência no relacionamento com o cliente."
- Frase dos projetos (vira cena): "O modelo escreve a argumentação. O texto da lei ele nunca escreve." (landing do Ipsis) e "Nada inventado." (princípio do Clima Cascavel).

### Experiência (CV)
| Cargo | Empresa | Período |
| --- | --- | --- |
| Estagiário | CAPS III — Centro de Atenção Psicossocial | out/2020 — out/2021 |
| Auxiliar administrativo | Wizard Cascavel | mai/2022 — fev/2023 |
| Pós-vendas | Certto Telecom | mar/2023 — jul/2026 (saída confirmada pelo Lucas em 20/10/2026) |

### Formação (CV)
- Engenharia de Software — Centro Universitário FAG — jan/2026 a dez/2029 (previsão)
- Bacharelado em Administração — Centro Universitário FAG — fev/2018 a nov/2021

### Stack declarada no site
Linguagens: TypeScript, JavaScript, Python, SQL · Frameworks: Next.js, React, Astro, Tailwind CSS ·
Ferramentas: Git & GitHub, Vercel, Supabase, VS Code · Bancos: PostgreSQL, pgvector.
O código do site avisa: "Pré-preenchido [...] só o que você defenderia numa entrevista." → mantido como está.

### Projetos
**Ipsis** — consulta e geração de peças para advocacia criminal (tráfico de drogas).
- Problema, solução e números copiados do site e do README.
- Números reais: 3 leis, 1.340 artigos, 3.771 dispositivos com vetor; 164 asserções Vitest + 85 pytest (= 249 no CI) + 12 Playwright; 7 telas; saída em DOCX.
- Stack: Next.js 15, TypeScript, Supabase (Postgres 17 + pgvector), OpenAI, Python, Tailwind CSS, Vitest + Playwright.
- No ar: https://ipsis-juridico.vercel.app (telas atrás de login).

**Clima Cascavel** — previsão do tempo para Cascavel com contexto sobre El Niño.
- Next.js 16 + TypeScript, cache no servidor da API Open-Meteo, cenas animadas em CSS/SVG/canvas, contraste WCAG garantido por teste, raios dentro do limite da WCAG 2.3.1.
- No ar: https://cascavel-clima.vercel.app

**Estudos (repositórios menores):** calculadora em Java (primeiro contato com Java, escrita no bloco de notas), calc-notas (Python), mural-servicos-turma (trabalho em grupo para praticar Git, branches e PRs, com Pedro Krupinski e Nathan de Sousa Ribeiro).

## Biblioteca de ativos

Todos são do próprio Lucas (foto dele, capturas dos projetos dele). Em `public/images/`.

| Arquivo | Tipo | Origem | Onde aparece | Resolução | Autorização |
| --- | --- | --- | --- | --- | --- |
| perfil/lucas-retrato.webp | foto | retrato enviado pelo Lucas em 20/10/2026 | manifesto, JSON-LD | 1333×2000 | do próprio usuário |
| perfil/lucas-rosto.webp | foto | recorte do retrato | avatar do convite | 256×256 | do próprio usuário |
| ipsis/landing.webp | captura | https://ipsis-juridico.vercel.app (topo, 2×) | hero (porta), cena Ipsis | 1920×1200 | projeto dele |
| ipsis/landing-citacao.webp | captura | idem, rolagem 900 | cena Ipsis | 1920×1200 | idem |
| ipsis/landing-decisoes.webp | captura | idem, rolagem 1800 | página do projeto | 1920×1200 | idem |
| ipsis/landing-celular.webp | captura | idem, 390 px, 3× | cena Ipsis | 780×1688 | idem |
| ipsis/landing-longa.webp | captura | `src/assets/projetos/ipsis.png` do site atual | página do projeto | 1440×2520 | idem |
| ipsis/tela-1…7.webp | captura | `Design_system/estado-atual.html` do repositório Ipsis | rolagem horizontal | 1920×1236 | idem |
| clima/inicio.webp, inicio-dias.webp | captura | https://cascavel-clima.vercel.app (19/10/2026, 2×) | cena Clima | 1920×1200 | idem |
| clima/el-nino.webp, el-nino-dados.webp | captura | https://cascavel-clima.vercel.app/el-nino | cena Clima | 1920×1200 | idem |
| clima/inicio-celular.webp | captura | idem, 390 px, 3× | leque | 780×1688 | idem |
| clima/inicio-nublado.webp | captura | `docs/screenshots` do repositório | leque | 1440×900 | idem |
| clima/inicio-garoa-celular.webp, el-nino-celular.webp | captura | idem | leque | 250×498 (pequenas) | idem |
| curriculo-lucas-maciel-vieira.pdf, diploma-administracao.pdf | PDF | site atual | botões | — | idem |

Total: 21 imagens, 2 PDFs. **Vídeo: nenhum** → o hero usa motion graphics (WebGL). Logo: o atual é só texto
(`lucas.vieira` na Silkscreen); foi redesenhado em vetor (`scripts/build-logo.mjs`). O favicon atual é o
padrão do Astro, não é marca.

## Site atual: o que tem e o que fraqueja (rebranding)
- **Estrutura:** nav, hero, sobre, stack (com marquee), projetos (1 card), experiência, formação, contato, rodapé.
- **Cores:** fundo #0B0B0F, texto #F2F2F5, acento âmbar #FBBF24.
- **Tipografia:** Silkscreen (pixel, títulos), Inter (texto), JetBrains Mono, Archivo.
- **Pontos fortes:** conteúdo honesto e centralizado em `src/data`, zero JS, rápido, botões de CV e diploma.
- **Pontos fracos:** hero é texto num fundo liso; nenhum projeto aparece em tela grande; o Clima Cascavel
  (já no ar) não está no site; o título em pixel font em caixa alta pesa a leitura; o `og:image` e o
  `og:url` apontam para `seu-dominio.vercel.app` (placeholder); favicon do Astro; nenhum caminho de
  contato além do e-mail.
