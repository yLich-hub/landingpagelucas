export interface Experiencia {
  cargo: string;
  empresa: string;
  periodo: string; // "jan 2024 — atual"
  bullets: string[]; // 2–3 conquistas concretas
}

export interface Formacao {
  curso: string;
  instituicao: string;
  ano: string;
}

export const experiencias: Experiencia[] = [
  {
    cargo: "PREENCHER",
    empresa: "PREENCHER",
    periodo: "PREENCHER",
    bullets: ["PREENCHER — o que você fez, com resultado concreto"],
  },
];

export const formacoes: Formacao[] = [
  {
    curso: "PREENCHER",
    instituicao: "PREENCHER",
    ano: "PREENCHER",
  },
];
