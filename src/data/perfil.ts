import foto from "../assets/foto-perfil.jpg";

export const perfil = {
  nome: "Lucas Maciel Vieira",
  marca: "lucas.vieira", // logo da nav; o primeiro "." fica na cor de destaque
  cargo: "Estudante de Engenharia de Software",
  posicionamento:
    "Em transição da administração para o desenvolvimento de software. Primeiro projeto full-stack no ar: pesquisa jurídica com busca híbrida, em Next.js, TypeScript e Postgres.",
  bioCurta:
    "Estudante de Engenharia de Software na FAG, em transição da administração para o desenvolvimento. Primeiro projeto full-stack em produção.",
  // um item por parágrafo
  bioMedia: [
    "Bacharel em administração formado pelo Centro Universitário Assis Gurgacz e com fluidez no idioma inglês (New York School).",
    "No ano de 2026 iniciei a faculdade de Engenharia de Software pelo Centro Universitário Assis Gurgacz.",
    "Minha trajetória é marcada pelo foco no atendimento ao cliente e na eficiência operacional. Iniciei minha carreira no CAPS III, onde desenvolvi bases sólidas em rotinas administrativas e recepção. Na sequência, atuei no setor operacional da Wizard, sendo responsável pelo suporte a alunos e responsáveis, além de apoiar a gestão administrativa da unidade.",
    "Integrei a equipe de Pós-Vendas na Certto no ano de 2023 até 2026. Atuava estrategicamente na retenção e fidelização de clientes, realizando o gerenciamento da base, oferta de upgrades de planos e coleta de feedbacks para melhoria contínua dos serviços. Sou movido por soluções que unam organização administrativa e excelência no relacionamento com o cliente.",
  ],
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
