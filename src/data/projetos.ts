import type { ImageMetadata } from "astro";
import jesbick from "../assets/projetos/jesbick.png";

export interface Projeto {
  nome: string;
  descricao: string;
  problema: string; // que dor ele resolve
  stack: string[];
  repo: string;
  demo?: string;
  imagem: ImageMetadata; // importar de src/assets: caminho errado quebra o build
  destaque?: string; // resultado concreto
}

// Estrutura da copy: Problema → O que eu construí → Stack → Resultado
export const projetos: Projeto[] = [
  {
    nome: "Jesbick",
    descricao:
      "Construí uma busca híbrida sobre a Lei 11.343/2006 e o Código Penal, com geração de resposta à acusação em que toda citação resolve para o texto lido do banco — nunca para texto gerado pelo modelo.",
    problema:
      "Advogado criminalista busca pelo apelido do instituto (“tráfico privilegiado”), que não aparece no texto da lei — e busca semântica sozinha confunde crimes de redação quase idêntica. Citar texto errado em peça protocolada causa dano real ao cliente.",
    stack: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL + pgvector", "Python"],
    repo: "https://github.com/yLich-hub/Jesbick",
    demo: "https://jesbick.vercel.app/login",
    imagem: jesbick,
    destaque: "Corpus jurídico limpo e auditado: 1.632 embeddings, busca híbrida verificada",
  },
];
