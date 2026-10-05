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
  diploma?: string; // PDF em public/; vazio = sem botão de download
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
    cargo: "Pós-Vendas",
    empresa: "Certto Telecom",
    periodo: "2023 — 2026",
  },
];

export const formacoes: Formacao[] = [
  {
    curso: "Engenharia de Software (em curso)",
    instituicao: "FAG — Centro Universitário da Fundação Assis Gurgacz",
  },
  {
    curso: "Bacharelado em Administração",
    instituicao: "FAG — Centro Universitário da Fundação Assis Gurgacz",
    // cópia com RG e data de nascimento tarjados; o original nunca vai para public/
    diploma: "/diploma-administracao.pdf",
  },
];
