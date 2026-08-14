export interface Projeto {
  nome: string;
  descricao: string;
  problema: string; // que dor ele resolve
  stack: string[];
  repo: string;
  demo?: string;
  imagem: string;
  destaque?: string; // resultado concreto
}

// ⚠️ Regra do guia: 3 a 5 projetos bem explicados. Estrutura da copy:
// Problema → O que eu construí → Stack → Resultado
export const projetos: Projeto[] = [
  {
    nome: "PREENCHER — Nome do Projeto",
    descricao: "Uma frase clara do que ele faz.",
    problema: "O contexto: por que você construiu isso.",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
    repo: "https://github.com/usuario/repo",
    demo: "https://projeto.vercel.app",
    imagem: "/images/projetos/projeto-1.webp",
    destaque: "Resultado concreto, se existir",
  },
];
