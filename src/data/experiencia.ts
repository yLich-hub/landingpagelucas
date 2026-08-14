export interface Experiencia {
  cargo: string;
  empresa: string;
  periodo?: string; // "jan 2024 — atual"; vazio = não exibe
  bullets?: string[]; // 2–3 conquistas concretas; vazio = não exibe
}

export interface Formacao {
  curso: string;
  instituicao?: string;
  ano?: string;
}

export const experiencias: Experiencia[] = [
  {
    cargo: "Estagiário",
    empresa: "CAPS 3 — Centro de Atenção Psicossocial",
  },
  {
    cargo: "Auxiliar Administrativo",
    empresa: "Escola de Idiomas Wizard",
  },
  {
    cargo: "Analista de Vendas",
    empresa: "Certto Telecom",
  },
];

export const formacoes: Formacao[] = [
  {
    curso: "Engenharia de Software (em curso)",
    instituicao: "FAG — Centro Universitário da Fundação Assis Gurgacz",
  },
  {
    curso: "Bacharelado em Administração",
  },
];
