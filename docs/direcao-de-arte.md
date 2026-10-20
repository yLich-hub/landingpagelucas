# Direção de arte — lucas.vieira

## Ideia central: o ponto

A marca de hoje é `lucas.vieira` com um único ponto âmbar. Esse ponto vira o filme:
**um pixel âmbar pisca no escuro como um cursor; ao rolar, ele cresce e vira a janela por onde
se vê o trabalho.** É a história real dele: alguém que passou anos do lado do atendimento
(CAPS, Wizard, Certto) e agora escreve o software, sem inventar o que mostra ao usuário
("O texto da lei ele nunca escreve", "Nada inventado").

Tom: calmo, preciso, um pouco de humor de terminal (`> nada inventado_`). Nada de "rockstar dev".

## Referências de movimento (Fase 2)

Abertas em 19/10/2026, capturadas em headless em 4 pontos de rolagem. Só técnica; nada de layout, marca ou código.

| Site | SOTD | Técnica que entra aqui |
| --- | --- | --- |
| Huy Phan — https://huyml.co (awwwards.com/sites/huy-phan-vol-2) | 14/10/2026 | contador gigante de projeto que rola dígito a dígito → **anos da trajetória rolando** (2018 → 2026) |
| Maria Vasilyeva — https://www.mariavasilyeva.com | 09/10/2026 | linha fina de miniaturas que explode em colagem → **leque das telas do Clima** abrindo a partir de uma fila |
| Jesper Landberg — http://jesperlandberg.com | 29/09/2026 | carrossel de projetos curvo, guiado pela rolagem → **rolagem horizontal das 7 telas do Ipsis** com parallax (sem a curva 3D, para o custo caber) |
| Meer Mohsin — https://www.meermohsin.me | 26/09/2026 | tipografia cinética que se monta palavra por palavra e troca de fundo em bloco → **manifesto aceso palavra por palavra** |
| Gil Huybrecht — https://gilhuybrecht.com | 21/09/2026 | grade de quadros, contador "available September" no topo → status **"Disponível"** no hero |
| Régua de ritmo | — | páginas de produto da Apple: título-afirmação + uma imagem por tela, seções claras como respiro |

## Roteiro de cenas (home)

| # | Cena | O que o visitante sente | Técnica | Ativo real |
| --- | --- | --- | --- | --- |
| 1 | **O ponto** (hero) | "quem é esse? é dev de verdade" | logo SVG inline sobre campo de pixels em WebGL; pin + `clip-path` quadrado que nasce do ponto e abre até a primeira tela | logo vetorizado; `ipsis/landing.webp` |
| 2 | **O convite** (manifesto) | o lado humano: atendimento → código | palavras acendendo com scrub (gradiente recortado); foto entra com máscara | frase dele: "Sou movido por soluções que unam organização administrativa e excelência no relacionamento com o cliente."; `perfil/lucas-retrato.webp` |
| 3 | **Ipsis** (papel) | "isso é sério, tem critério" | pin com 3 passos (problema → decisão → números) trocando a tela ao lado; números contam | `ipsis/landing*.webp`, números do README |
| 4 | **Sete telas** | "tem produto inteiro, não só landing" | rolagem horizontal fixa + parallax via `containerAnimation`; carrossel nativo no celular | `ipsis/tela-1…7.webp` + rótulos reais |
| 5 | **Nada inventado** (Clima) | cuidado com dado e acessibilidade | leque de 5 telas abrindo com scrub | `clima/*.webp` |
| 6 | **A trajetória** | consistência, 8 anos de estrada | pin; ano gigante rola dígito a dígito (2018 → 2020 → 2022 → 2023 → 2026) e o cargo troca; marquee da stack | CV |
| 7 | **Monte o convite** (papel) — conversão | "é fácil chamar ele" | configurador: motivo + modalidade + nome → e-mail ou WhatsApp com a mensagem pronta | e-mail do site; celular do CV (a confirmar) |
| 8 | **Vamos conversar?** | fechamento | pixel âmbar volta como cursor; CTAs, cidade, mapa sob demanda, redes, CV e diploma | dados do site |

Detalhe de marca transformado em cena: **o ponto âmbar** (abre a porta na cena 1, pisca como cursor
na cena 8, marca o item ativo na trajetória e aparece como "pixel de status" no hero).

Páginas internas: `/projetos/ipsis` e `/projetos/clima-cascavel` (capítulos alternando texto e captura,
revelação simples), e o 404.

## Tipografia (escolhida por espécime)

Espécime em `docs/especimes.html` (4 pares sobre o logo, um título real e uma captura real).

**Escolhido: A — Inter Tight 600 + Silkscreen.**
- Inter Tight em 600 com tracking −0,045em dá a cara de página de produto da Apple e lê bem em
  títulos longos em português (a Silkscreen em caixa alta do site atual pesava a leitura).
- Silkscreen é a fonte do logo atual: vira a **assinatura**, só no ponto do logo, no `> nada inventado_`
  e nos rótulos de terminal. Continuidade de marca sem levar o pixel para o texto corrido.
- B (Geist) ficou parecida demais com "template Vercel"; C (Instrument Serif) é bonita mas diz
  "editorial/luxo", não engenharia; D (Archivo caixa alta) grita e cansa em frase longa.

Carregamento: `next/font/google`, Inter Tight só pesos 400/500/600; Silkscreen 400 com `preload: false`.

## Paleta (tokens)

Frio, como o site atual, com um único acento âmbar herdado da marca.

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| ink | #09090c | fundo principal | — |
| ink-2 | #101015 | seções | — |
| ink-3 | #17171d | cards | — |
| ink-4 | #22222a | bordas suaves | — |
| cream | #f3f1ec | texto no escuro | 17,6:1 sobre ink |
| ash | #a3a3ad | texto de apoio | 8,0:1 sobre ink |
| paper | #efede7 | seções claras | — |
| paper-2 | #e3e0d7 | cards no papel | — |
| smoke | #5a5a63 | apoio no papel | 5,8:1 sobre paper; 5,2:1 sobre paper-2 |
| amber | #fbbf24 | marca (ponto, rótulos no escuro, botões) | 11,9:1 sobre ink; nunca texto sobre papel |
| amber-deep | #7a4f00 | rótulos sobre papel | 6,1:1 sobre paper; 5,4:1 sobre paper-2 |
| wa | #1a7f45 | botão WhatsApp | 5,0:1 com branco |

## Linguagem de movimento

- Tudo ligado à rolagem (`scrub`), ease-out longo; nada saltitante.
- Lenis 1.1 s; ScrollTrigger sincronizado.
- WebGL: campo de pixels (grade de quadradinhos acesos por ruído, luz âmbar que segue o ponteiro e cresce
  com a rolagem do hero). Começa na 1ª interação ou após 8 s, resolução reduzida, pausa fora da tela/aba.
- Movimento reduzido: tudo parado e legível; leque já aberto; números já no valor.

## Rebranding: o que muda, o que fica

| Fica | Muda | Por quê |
| --- | --- | --- |
| `lucas.vieira` com ponto âmbar | logo vetorizado (Inter Tight + ponto quadrado em pixel) | marca reconhecível, agora em SVG para favicon/OG |
| fundo escuro frio + âmbar | entram seções claras de papel | ritmo Apple, e o Ipsis (UI clara) fica em casa |
| todo o texto dele, CV, diploma | títulos em Inter Tight, não Silkscreen | leitura |
| conteúdo centralizado | `src/content/site.ts` | mesmo princípio do site atual |
| — | Clima Cascavel entra como 2º projeto | já está no ar e não aparecia |
| — | montador de convite (e-mail/WhatsApp) | dar um caminho de contato com a mensagem pronta |
| — | OG e favicon próprios | hoje apontam para placeholder e para o ícone do Astro |

## Revisão com a skill `frontend-design` (20/10/2026)

O plano foi revisto contra os "padrões de página gerada" que a skill lista:
- **Escuro + um acento forte**: mantido de propósito. O âmbar #fbbf24 sobre #0b0b0f já é a marca do site atual; trocar seria perder reconhecimento. Para não virar o clichê, o acento aparece quase só no **ponto** (logo, porta, cursor, marcador da trajetória) e nas pílulas principais, e as seções de papel quebram o escuro.
- **Legendas com " · "** (meta strings): removidas dos rótulos dos projetos; cada rótulo diz uma coisa só.
- **Numeração 01/02/03**: só na trajetória, que é sequência de verdade (anos). As telas do Ipsis levam o nome da tela, sem número.
- **Mono para rótulos pequenos**: a Silkscreen só aparece no ponto e no `> nada inventado_`; rótulos ficam em Inter Tight, em caixa normal.
- **Ousadia em um lugar só**: o ponto que vira porta. O resto fica quieto: sem hover em todo card, sem fade-in em cada seção da home (as cenas são guiadas pela rolagem).
