// Textos fixos da interface: títulos de seção, botões, rótulos e textos alternativos.
// O conteúdo sobre você fica em perfil.ts; aqui fica só a "moldura" do site.

export const textos = {
  nav: {
    ariaLabel: "Navegação principal",
    baixarCv: "Baixar CV",
  },
  secoes: {
    sobre: "Sobre",
    stack: "Stack",
    projetos: "Projetos",
    experiencia: "Experiência",
    formacao: "Formação",
    contato: "Contato", // rótulo na nav; o título da seção é contato.titulo
  },
  botoes: {
    verProjetos: "Ver projetos",
    baixarCurriculo: "Baixar currículo (PDF)",
    verCodigo: "Ver código",
    verAoVivo: "Ver ao vivo",
    baixarDiploma: "Baixar diploma (PDF)",
  },
  redes: {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-mail",
  },
  contato: {
    titulo: "Vamos conversar", // o "?" em destaque é adicionado pelo componente
    chamada: "Aberto a oportunidades. O caminho mais rápido é o e-mail:",
  },
  footer: {
    codigoDoSite: "Código deste site",
  },
  alt: {
    foto: (nome: string) => `Foto de ${nome}`,
    projeto: (nome: string) => `Captura de tela do projeto ${nome}`,
  },
};
