import type { ImageMetadata } from "astro";
import ipsis from "../assets/projetos/ipsis.png";

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
    nome: "Ipsis",
    descricao:
      "Construí um sistema de consulta e geração de peças para advocacia criminal, no recorte de tráfico de drogas. A busca híbrida funde rubrica, texto e semântica sobre a Lei 11.343/2006, o Código Penal e o CPP; o modelo redige só a argumentação, e toda citação resolve para o texto lido do banco — nunca para texto gerado. A resposta à acusação sai em DOCX, com dosimetria trifásica e precedentes do STJ.",
    problema:
      "Advogado criminalista busca pelo apelido do instituto (“tráfico privilegiado”), que não aparece no texto da lei — e busca semântica sozinha confunde crimes de redação quase idêntica. Citar texto errado em peça protocolada causa dano real ao cliente.",
    stack: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL + pgvector", "OpenAI", "Python", "Tailwind CSS", "Vitest + Playwright"],
    repo: "https://github.com/yLich-hub/Ipsis",
    // sem demo: o sistema está fechado para novos cadastros
    imagem: ipsis,
    destaque: "Corpus conferido contra o Planalto: 1.340 artigos e 3.771 dispositivos com vetor · 249 verificações automáticas em todo push",
  },
];
