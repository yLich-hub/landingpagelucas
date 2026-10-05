import foto from "../assets/foto-perfil.jpg";

export const perfil = {
  nome: "Lucas Maciel Vieira",
  marca: "lucas.vieira", // logo da nav; o primeiro "." fica na cor de destaque
  cargo: "Estudante de Engenharia de Software",
  posicionamento:
    "Em transição da administração para o desenvolvimento de software. Primeiro projeto full-stack no ar: pesquisa jurídica com busca híbrida, em Next.js, TypeScript e Postgres.",
  bioCurta:
    "Estudante de Engenharia de Software na FAG, em transição da administração para o desenvolvimento. Primeiro projeto full-stack em produção.",
  bioMedia:
    "Sou formado em Administração e curso Engenharia de Software na FAG (Centro Universitário da Fundação Assis Gurgacz), em Cascavel — PR. Antes de migrar para a tecnologia, trabalhei com vendas e rotinas administrativas — experiência que me deu disciplina de processo e contato direto com cliente. Hoje aplico isso no código: meu primeiro projeto full-stack, o Jesbick, está no ar, construído com Next.js, TypeScript e Supabase. Busco minha primeira oportunidade profissional em desenvolvimento.",
  cidade: "Cascavel — PR",
  disponibilidade: "remoto, híbrido ou presencial",
  email: "lucasmacielvieira55@gmail.com",
  github: "https://github.com/yLich-hub",
  linkedin: "https://www.linkedin.com/in/lucas-maciel-vieira-952865223/",
  curriculoPdf: "/curriculo-lucas-maciel-vieira.pdf",
  repositorioSite: "https://github.com/yLich-hub/landingpagelucas",
  foto, // importada de src/assets: caminho errado quebra o build
  // deixe vazio para esconder a faixa de números do hero
  numeros: [] as { valor: string; label: string }[],
};
