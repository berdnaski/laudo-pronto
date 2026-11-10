/**
 * Depoimentos reais de quem usa o Laudo Pronto.
 *
 * Esta lista nasce VAZIA de propósito: a seção de depoimentos só aparece no site
 * quando existe pelo menos um item aqui. Preencha com mensagens que você realmente
 * recebeu, com autorização da pessoa, e o site publica sozinho.
 *
 * - `nome`: como a pessoa quer ser identificada.
 * - `crp`: o CRP dela, que é o que dá peso no seu nicho.
 * - `mensagens`: as falas dela, na ordem. A sua resposta vai em `resposta`.
 */
export type Depoimento = {
  nome: string;
  crp: string;
  cidade?: string;
  data: string;
  mensagens: string[];
  resposta?: string;
};

export const DEPOIMENTOS: Depoimento[] = [];

/**
 * Conteúdo de exemplo, usado só na prévia interna de design (/previa-interna).
 * Nunca é mostrado no site de vendas.
 */
export const DEPOIMENTOS_EXEMPLO: Depoimento[] = [
  {
    nome: "Exemplo — psicóloga",
    crp: "00/00000",
    cidade: "Uberlândia/MG",
    data: "5 de agosto, 09:48",
    mensagens: ["Bom dia!", "Consegui gerar a declaração em menos de 5 minutos", "Saiu certinho no formato que o CFP pede"],
    resposta: "Que bom saber! Qualquer dúvida é só chamar",
  },
  {
    nome: "Exemplo — psicólogo",
    crp: "00/00000",
    cidade: "Campinas/SP",
    data: "12 de agosto, 20:11",
    mensagens: ["Usei hoje para um relatório que eu estava enrolando há dias", "O campo de finalidade me lembrou de uma coisa que eu sempre esquecia"],
    resposta: "É exatamente para isso que os campos são guiados",
  },
  {
    nome: "Exemplo — psicóloga",
    crp: "00/00000",
    cidade: "Recife/PE",
    data: "2 de setembro, 14:30",
    mensagens: ["Baixei em Word e ajustei duas frases, ficou do jeito que eu escrevo", "Valeu demais"],
  },
];
