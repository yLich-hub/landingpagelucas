export interface GrupoStack {
  grupo: string;
  itens: string[];
}

// ⚠️ Pré-preenchido com base no projeto Jesbick e neste site.
// Edite à vontade — regra do guia: só o que você defenderia numa entrevista.
export const stack: GrupoStack[] = [
  { grupo: "Linguagens", itens: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { grupo: "Frameworks", itens: ["Next.js", "React", "Astro", "Tailwind CSS"] },
  { grupo: "Ferramentas", itens: ["Git & GitHub", "Vercel", "Supabase", "VS Code"] },
  { grupo: "Bancos de dados", itens: ["PostgreSQL", "pgvector"] },
];
