// Modelos de documentos. A estrutura dos documentos oficiais segue a
// Resolução CFP nº 06/2019. O texto gerado é um ponto de partida:
// o psicólogo revisa, ajusta e assina — a responsabilidade técnica é dele.

export type Pacote = "essencial" | "contratos" | "completo" | "consultorio";

export type Campo = {
  id: string;
  rotulo: string;
  tipo: "texto" | "area" | "data" | "opcoes";
  dica?: string;
  exemplo?: string;
  opcoes?: string[];
  obrigatorio?: boolean;
  /** Dado que identifica o paciente: nunca vai para a IA. */
  identifica?: boolean;
  /** Campo de texto livre que pode ser melhorado pela IA. */
  ia?: boolean;
};

export type Profissional = {
  nome: string;
  crp: string;
  cidade: string;
  contato: string;
};

export type Bloco = { titulo?: string; paragrafos: string[] };

export type Documento = {
  titulo: string;
  blocos: Bloco[];
  rodape?: string;
};

export type Modelo = {
  slug: string;
  nome: string;
  pacote: Pacote;
  oficial: boolean;
  resumo: string;
  campos: Campo[];
  montar: (v: Record<string, string>, p: Profissional) => Documento;
};

const hoje = () =>
  new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });

export const dataPorExtenso = (iso?: string) => {
  if (!iso) return hoje();
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ou = (valor: string | undefined, falta: string) =>
  valor && valor.trim() ? valor.trim() : `[${falta}]`;

const paragrafos = (t?: string) =>
  (t || "")
    .split(/\n{2,}|\n/)
    .map((s) => s.trim())
    .filter(Boolean);

const identificacao = (v: Record<string, string>, p: Profissional): Bloco => ({
  titulo: "Identificação",
  paragrafos: [
    `Autor(a)/Responsável técnico(a): ${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}.`,
    `Interessado(a): ${ou(v.paciente, "nome do(a) atendido(a)")}.`,
    `Solicitante: ${ou(v.solicitante, "quem solicitou")}.`,
    `Finalidade: ${ou(v.finalidade, "finalidade do documento")}.`,
  ],
});

const fecho = (v: Record<string, string>, p: Profissional): Bloco => ({
  paragrafos: [`${ou(p.cidade, "Cidade/UF")}, ${dataPorExtenso(v.data)}.`],
});

const avisoSigilo =
  "Este documento é de caráter sigiloso, foi elaborado para a finalidade acima indicada e não deve ser utilizado para fins diferentes do apontado na identificação.";

const camposBase: Campo[] = [
  { id: "paciente", rotulo: "Nome do(a) atendido(a)", tipo: "texto", obrigatorio: true, identifica: true, exemplo: "Maria da Silva" },
  { id: "solicitante", rotulo: "Solicitante", tipo: "texto", dica: "Quem pediu o documento", exemplo: "A própria interessada" },
  { id: "finalidade", rotulo: "Finalidade", tipo: "texto", obrigatorio: true, exemplo: "Apresentação ao empregador" },
];

const campoData: Campo = { id: "data", rotulo: "Data do documento", tipo: "data" };

export const MODELOS: Modelo[] = [
  // ───────────── Pacote essencial (produto principal) ─────────────
  {
    slug: "declaracao",
    nome: "Declaração",
    pacote: "essencial",
    oficial: true,
    resumo: "Comprova comparecimento, acompanhamento, dias e horários. Sem sintomas nem diagnóstico.",
    campos: [
      ...camposBase,
      { id: "tipoAtendimento", rotulo: "Tipo de atendimento", tipo: "opcoes", opcoes: ["psicoterapia", "avaliação psicológica", "orientação psicológica", "acompanhamento psicológico"], obrigatorio: true },
      { id: "periodo", rotulo: "Período / data do atendimento", tipo: "texto", obrigatorio: true, exemplo: "desde 10 de março de 2026" },
      { id: "frequencia", rotulo: "Frequência e horário", tipo: "texto", exemplo: "semanal, às terças-feiras, das 14h às 14h50" },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Declaração",
      blocos: [
        {
          paragrafos: [
            `Declaro, para fins de ${ou(v.finalidade, "finalidade")}, que ${ou(v.paciente, "nome do(a) atendido(a)")} encontra-se em ${ou(v.tipoAtendimento, "tipo de atendimento")} sob minha responsabilidade ${ou(v.periodo, "período")}${v.frequencia ? `, com frequência ${v.frequencia.trim()}` : ""}.`,
            `Solicitante: ${ou(v.solicitante, "solicitante")}.`,
            avisoSigilo,
          ],
        },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "atestado",
    nome: "Atestado psicológico",
    pacote: "essencial",
    oficial: true,
    resumo: "Certifica condição psicológica para justificar faltas, afastamento ou aptidão.",
    campos: [
      ...camposBase,
      { id: "condicao", rotulo: "Condição psicológica observada", tipo: "area", obrigatorio: true, ia: true, dica: "Descreva o quadro que fundamenta o atestado", exemplo: "sintomas de ansiedade que comprometem temporariamente sua capacidade de concentração e desempenho laboral" },
      { id: "cid", rotulo: "CID (opcional)", tipo: "texto", dica: "Só inclua com autorização expressa do(a) atendido(a)" },
      { id: "afastamento", rotulo: "Afastamento / período recomendado", tipo: "texto", exemplo: "afastamento de suas atividades por 7 (sete) dias, a partir desta data" },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Atestado psicológico",
      blocos: [
        {
          paragrafos: [
            `Atesto, para fins de ${ou(v.finalidade, "finalidade")}, a pedido de ${ou(v.solicitante, "solicitante")}, que ${ou(v.paciente, "nome do(a) atendido(a)")} foi atendido(a) por mim e apresenta ${ou(v.condicao, "condição psicológica observada")}${v.cid ? ` (CID ${v.cid.trim()}, informado com autorização do(a) interessado(a))` : ""}.`,
            ...(v.afastamento ? [`Recomenda-se ${v.afastamento.trim()}.`] : []),
            avisoSigilo,
          ],
        },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "relatorio",
    nome: "Relatório psicológico",
    pacote: "essencial",
    oficial: true,
    resumo: "Comunica a atuação profissional: demanda, procedimento, análise e conclusão.",
    campos: [
      ...camposBase,
      { id: "demanda", rotulo: "Descrição da demanda", tipo: "area", obrigatorio: true, ia: true, exemplo: "Paciente buscou atendimento relatando dificuldades no sono e irritabilidade após mudança de emprego." },
      { id: "procedimento", rotulo: "Procedimento", tipo: "area", obrigatorio: true, ia: true, exemplo: "12 sessões de psicoterapia individual, semanais, com 50 minutos, abordagem cognitivo-comportamental." },
      { id: "analise", rotulo: "Análise", tipo: "area", obrigatorio: true, ia: true, exemplo: "Observou-se evolução na identificação de pensamentos automáticos e redução da irritabilidade relatada." },
      { id: "conclusao", rotulo: "Conclusão", tipo: "area", obrigatorio: true, ia: true, exemplo: "Recomenda-se continuidade do acompanhamento psicológico." },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Relatório psicológico",
      blocos: [
        identificacao(v, p),
        { titulo: "Descrição da demanda", paragrafos: paragrafos(ou(v.demanda, "descrição da demanda")) },
        { titulo: "Procedimento", paragrafos: paragrafos(ou(v.procedimento, "procedimento")) },
        { titulo: "Análise", paragrafos: paragrafos(ou(v.analise, "análise")) },
        { titulo: "Conclusão", paragrafos: [...paragrafos(ou(v.conclusao, "conclusão")), avisoSigilo] },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "encaminhamento",
    nome: "Encaminhamento",
    pacote: "essencial",
    oficial: false,
    resumo: "Encaminha o(a) paciente para outro profissional ou serviço com o motivo resumido.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) paciente", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "destino", rotulo: "Encaminhado(a) para", tipo: "texto", obrigatorio: true, exemplo: "avaliação psiquiátrica" },
      { id: "motivo", rotulo: "Motivo do encaminhamento", tipo: "area", obrigatorio: true, ia: true, exemplo: "Persistência de sintomas depressivos com prejuízo funcional, para avaliação da necessidade de intervenção medicamentosa." },
      { id: "contexto", rotulo: "Informações relevantes (opcional)", tipo: "area", ia: true },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Encaminhamento",
      blocos: [
        {
          paragrafos: [
            `Prezado(a) colega,`,
            `Encaminho ${ou(v.paciente, "nome do(a) paciente")}, em acompanhamento psicológico sob minha responsabilidade, para ${ou(v.destino, "profissional/serviço")}.`,
            ...paragrafos(ou(v.motivo, "motivo do encaminhamento")),
            ...paragrafos(v.contexto),
            `Coloco-me à disposição para troca de informações, respeitados os limites do sigilo profissional${p.contato ? `, pelo contato ${p.contato}` : ""}.`,
            `Atenciosamente,`,
          ],
        },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "anamnese",
    nome: "Anamnese adulto",
    pacote: "essencial",
    oficial: false,
    resumo: "Registro estruturado da primeira entrevista: queixa, histórico e rede de apoio.",
    campos: [
      { id: "paciente", rotulo: "Nome", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "idade", rotulo: "Idade", tipo: "texto" },
      { id: "ocupacao", rotulo: "Ocupação", tipo: "texto" },
      { id: "queixa", rotulo: "Queixa principal", tipo: "area", obrigatorio: true, ia: true },
      { id: "historico", rotulo: "Histórico da queixa", tipo: "area", ia: true },
      { id: "saude", rotulo: "Saúde, medicações e tratamentos anteriores", tipo: "area", ia: true },
      { id: "familia", rotulo: "Contexto familiar e rede de apoio", tipo: "area", ia: true },
      { id: "expectativas", rotulo: "Expectativas com o processo", tipo: "area", ia: true },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Anamnese",
      blocos: [
        {
          titulo: "Dados",
          paragrafos: [
            `Nome: ${ou(v.paciente, "nome")}.`,
            `Idade: ${ou(v.idade, "idade")}. Ocupação: ${ou(v.ocupacao, "ocupação")}.`,
            `Data da entrevista: ${dataPorExtenso(v.data)}. Profissional: ${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}.`,
          ],
        },
        { titulo: "Queixa principal", paragrafos: paragrafos(ou(v.queixa, "queixa principal")) },
        { titulo: "Histórico da queixa", paragrafos: paragrafos(ou(v.historico, "não informado")) },
        { titulo: "Saúde e tratamentos", paragrafos: paragrafos(ou(v.saude, "não informado")) },
        { titulo: "Contexto familiar e rede de apoio", paragrafos: paragrafos(ou(v.familia, "não informado")) },
        { titulo: "Expectativas", paragrafos: paragrafos(ou(v.expectativas, "não informado")) },
      ],
      rodape: "Documento de registro interno — sigiloso.",
    }),
  },

  // ───────────── Order bump: contratos e termos ─────────────
  {
    slug: "contrato",
    nome: "Contrato terapêutico",
    pacote: "contratos",
    oficial: false,
    resumo: "Combinados de valor, frequência, faltas, férias e sigilo, prontos para assinar.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) contratante", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "modalidade", rotulo: "Modalidade", tipo: "opcoes", opcoes: ["presencial", "online", "presencial e online"], obrigatorio: true },
      { id: "frequencia", rotulo: "Frequência e duração", tipo: "texto", obrigatorio: true, exemplo: "semanal, sessões de 50 minutos" },
      { id: "valor", rotulo: "Valor e forma de pagamento", tipo: "texto", obrigatorio: true, exemplo: "R$ 180,00 por sessão, pagos via Pix até o dia da sessão" },
      { id: "faltas", rotulo: "Política de faltas e remarcações", tipo: "area", exemplo: "Desmarcações com menos de 24h de antecedência serão cobradas integralmente." },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Contrato de prestação de serviços psicológicos",
      blocos: [
        {
          paragrafos: [
            `Contratada: ${ou(p.nome, "seu nome")}, psicólogo(a), CRP ${ou(p.crp, "00/00000")}.`,
            `Contratante: ${ou(v.paciente, "nome do(a) contratante")}.`,
          ],
        },
        { titulo: "Do serviço", paragrafos: [`Atendimento psicológico na modalidade ${ou(v.modalidade, "modalidade")}, com frequência ${ou(v.frequencia, "frequência")}.`] },
        { titulo: "Dos honorários", paragrafos: [`${ou(v.valor, "valor e forma de pagamento")}.`] },
        { titulo: "Das faltas e remarcações", paragrafos: paragrafos(ou(v.faltas, "política de faltas")) },
        {
          titulo: "Do sigilo",
          paragrafos: [
            "As informações compartilhadas nas sessões são sigilosas, nos termos do Código de Ética Profissional do Psicólogo, ressalvadas as hipóteses previstas no próprio Código.",
            "O tratamento de dados pessoais observa a Lei nº 13.709/2018 (LGPD).",
          ],
        },
        { titulo: "Da rescisão", paragrafos: ["Qualquer das partes pode encerrar o acompanhamento a qualquer tempo, preferencialmente com uma sessão de encerramento."] },
        fecho(v, p),
        { paragrafos: ["_______________________________\nContratante", "_______________________________\nContratada"] },
      ],
    }),
  },
  {
    slug: "tcle",
    nome: "Termo de consentimento (TCLE)",
    pacote: "contratos",
    oficial: false,
    resumo: "Consentimento livre e esclarecido para atendimento, avaliação ou atendimento online.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) atendido(a)", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "responsavel", rotulo: "Responsável legal (se menor de idade)", tipo: "texto", identifica: true },
      { id: "servico", rotulo: "Serviço a ser realizado", tipo: "opcoes", opcoes: ["psicoterapia", "avaliação psicológica", "atendimento psicológico online"], obrigatorio: true },
      { id: "detalhes", rotulo: "Objetivos e procedimentos previstos", tipo: "area", ia: true },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Termo de consentimento livre e esclarecido",
      blocos: [
        {
          paragrafos: [
            `Eu, ${ou(v.responsavel || v.paciente, "nome")}${v.responsavel ? `, responsável legal por ${ou(v.paciente, "nome do(a) atendido(a)")}` : ""}, declaro ter sido informado(a) de forma clara sobre o(a) ${ou(v.servico, "serviço")} a ser realizado(a) por ${ou(p.nome, "seu nome")}, CRP ${ou(p.crp, "00/00000")}.`,
            ...paragrafos(v.detalhes),
            "Fui informado(a) sobre o sigilo profissional e seus limites, sobre o tratamento dos meus dados conforme a LGPD e sobre o direito de interromper o processo a qualquer momento.",
            "Declaro que consinto, de forma livre e esclarecida, com a realização do serviço descrito.",
          ],
        },
        fecho(v, p),
        { paragrafos: ["_______________________________\nAtendido(a) ou responsável legal", "_______________________________\nPsicólogo(a)"] },
      ],
    }),
  },

  // ───────────── Upsell: acesso completo ─────────────
  {
    slug: "laudo",
    nome: "Laudo psicológico",
    pacote: "completo",
    oficial: true,
    resumo: "Resultado de avaliação psicológica, com procedimentos, análise, conclusão e referências.",
    campos: [
      ...camposBase,
      { id: "demanda", rotulo: "Descrição da demanda", tipo: "area", obrigatorio: true, ia: true },
      { id: "procedimento", rotulo: "Procedimento (instrumentos, número de encontros, pessoas ouvidas)", tipo: "area", obrigatorio: true, ia: true },
      { id: "analise", rotulo: "Análise", tipo: "area", obrigatorio: true, ia: true },
      { id: "conclusao", rotulo: "Conclusão", tipo: "area", obrigatorio: true, ia: true },
      { id: "referencias", rotulo: "Referências", tipo: "area", obrigatorio: true, dica: "Obrigatórias no laudo. Uma por linha." },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Laudo psicológico",
      blocos: [
        identificacao(v, p),
        { titulo: "Descrição da demanda", paragrafos: paragrafos(ou(v.demanda, "descrição da demanda")) },
        { titulo: "Procedimento", paragrafos: paragrafos(ou(v.procedimento, "procedimento")) },
        { titulo: "Análise", paragrafos: paragrafos(ou(v.analise, "análise")) },
        { titulo: "Conclusão", paragrafos: [...paragrafos(ou(v.conclusao, "conclusão")), avisoSigilo] },
        { titulo: "Referências", paragrafos: paragrafos(ou(v.referencias, "referências utilizadas")) },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "parecer",
    nome: "Parecer psicológico",
    pacote: "completo",
    oficial: true,
    resumo: "Resposta técnica a uma consulta específica, fundamentada em referências.",
    campos: [
      { id: "paciente", rotulo: "Interessado(a) / caso", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "solicitante", rotulo: "Solicitante da consulta", tipo: "texto", obrigatorio: true },
      { id: "finalidade", rotulo: "Finalidade", tipo: "texto", obrigatorio: true },
      { id: "demanda", rotulo: "Questão a ser respondida", tipo: "area", obrigatorio: true, ia: true },
      { id: "analise", rotulo: "Análise", tipo: "area", obrigatorio: true, ia: true },
      { id: "conclusao", rotulo: "Conclusão", tipo: "area", obrigatorio: true, ia: true },
      { id: "referencias", rotulo: "Referências", tipo: "area", obrigatorio: true },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Parecer psicológico",
      blocos: [
        identificacao(v, p),
        { titulo: "Descrição da demanda", paragrafos: paragrafos(ou(v.demanda, "questão a ser respondida")) },
        { titulo: "Análise", paragrafos: paragrafos(ou(v.analise, "análise")) },
        { titulo: "Conclusão", paragrafos: [...paragrafos(ou(v.conclusao, "conclusão")), avisoSigilo] },
        { titulo: "Referências", paragrafos: paragrafos(ou(v.referencias, "referências")) },
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "evolucao",
    nome: "Registro de evolução",
    pacote: "completo",
    oficial: false,
    resumo: "Registro objetivo de sessão para o prontuário: tema, intervenções e encaminhamentos.",
    campos: [
      { id: "paciente", rotulo: "Paciente", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "sessao", rotulo: "Nº da sessão", tipo: "texto" },
      { id: "tema", rotulo: "Temas trabalhados", tipo: "area", obrigatorio: true, ia: true },
      { id: "intervencoes", rotulo: "Intervenções realizadas", tipo: "area", ia: true },
      { id: "proximos", rotulo: "Combinados / próximos passos", tipo: "area", ia: true },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Registro de evolução",
      blocos: [
        { paragrafos: [`Paciente: ${ou(v.paciente, "paciente")}. Sessão nº ${ou(v.sessao, "—")}. Data: ${dataPorExtenso(v.data)}.`] },
        { titulo: "Temas trabalhados", paragrafos: paragrafos(ou(v.tema, "temas")) },
        { titulo: "Intervenções", paragrafos: paragrafos(ou(v.intervencoes, "não registrado")) },
        { titulo: "Próximos passos", paragrafos: paragrafos(ou(v.proximos, "não registrado")) },
        { paragrafos: [`${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}`] },
      ],
      rodape: "Registro de prontuário — sigiloso.",
    }),
  },
  // ───────────── Pacote consultório (order bump) ─────────────
  {
    slug: "recibo",
    nome: "Recibo de pagamento",
    pacote: "consultorio",
    oficial: false,
    resumo: "Recibo de sessões ou avaliação, pronto para o paciente declarar no imposto de renda.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) pagador(a)", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "cpf", rotulo: "CPF do(a) pagador(a)", tipo: "texto", identifica: true, dica: "Opcional, mas o paciente costuma precisar para o IR" },
      { id: "valor", rotulo: "Valor recebido", tipo: "texto", obrigatorio: true, exemplo: "R$ 720,00 (setecentos e vinte reais)" },
      { id: "referente", rotulo: "Referente a", tipo: "texto", obrigatorio: true, exemplo: "4 sessões de psicoterapia realizadas em outubro de 2026" },
      { id: "forma", rotulo: "Forma de pagamento", tipo: "texto", exemplo: "Pix" },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Recibo",
      blocos: [
        {
          paragrafos: [
            `Recebi de ${ou(v.paciente, "nome do(a) pagador(a)")}${v.cpf ? `, CPF ${v.cpf.trim()}` : ""}, a quantia de ${ou(v.valor, "valor")}, referente a ${ou(v.referente, "serviço prestado")}${v.forma ? `, paga via ${v.forma.trim()}` : ""}.`,
            "Por ser verdade, firmo o presente recibo, dando plena e geral quitação.",
          ],
        },
        fecho(v, p),
        { paragrafos: [`_______________________________\n${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}`] },
      ],
    }),
  },
  {
    slug: "comparecimento",
    nome: "Comprovante de comparecimento",
    pacote: "consultorio",
    oficial: false,
    resumo: "Comprova que o paciente esteve na sessão em um dia e horário, sem revelar conteúdo.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) atendido(a)", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "dia", rotulo: "Data da sessão", tipo: "data", obrigatorio: true },
      { id: "horario", rotulo: "Horário", tipo: "texto", obrigatorio: true, exemplo: "das 14h às 14h50" },
      { id: "finalidade", rotulo: "Para apresentar a", tipo: "texto", exemplo: "empresa / escola / faculdade" },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Comprovante de comparecimento",
      blocos: [
        {
          paragrafos: [
            `Comprovo que ${ou(v.paciente, "nome do(a) atendido(a)")} compareceu a atendimento psicológico em ${dataPorExtenso(v.dia)}, ${ou(v.horario, "horário")}, sob minha responsabilidade${v.finalidade ? `, para apresentação a ${v.finalidade.trim()}` : ""}.`,
            "Este comprovante atesta apenas o comparecimento, sem qualquer informação sobre o conteúdo do atendimento.",
          ],
        },
        fecho(v, p),
        { paragrafos: [`_______________________________\n${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}`] },
      ],
    }),
  },
  {
    slug: "politica-faltas",
    nome: "Política de faltas e cancelamentos",
    pacote: "consultorio",
    oficial: false,
    resumo: "Comunicado claro sobre remarcações, atrasos e cobrança de faltas, para enviar ao paciente.",
    campos: [
      { id: "antecedencia", rotulo: "Antecedência mínima para desmarcar", tipo: "texto", obrigatorio: true, exemplo: "24 horas" },
      { id: "cobranca", rotulo: "Como funciona a cobrança de faltas", tipo: "area", obrigatorio: true, exemplo: "Faltas sem aviso prévio serão cobradas integralmente. Desmarcações dentro do prazo podem ser remarcadas na mesma semana." },
      { id: "atraso", rotulo: "Política de atrasos", tipo: "texto", exemplo: "A sessão termina no horário previsto, sem reposição do tempo perdido." },
      { id: "excecoes", rotulo: "Exceções (opcional)", tipo: "area", ia: true, exemplo: "Imprevistos de saúde e emergências, avisados assim que possível, serão avaliados caso a caso." },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Política de faltas, atrasos e cancelamentos",
      blocos: [
        { paragrafos: [`Para que o acompanhamento transcorra com continuidade e respeito mútuo, ${ou(p.nome, "seu nome")} (CRP ${ou(p.crp, "00/00000")}) informa os combinados abaixo.`] },
        { titulo: "Desmarcações e remarcações", paragrafos: [`Pedidos de desmarcação devem ser feitos com antecedência mínima de ${ou(v.antecedencia, "prazo")}.`] },
        { titulo: "Faltas", paragrafos: paragrafos(ou(v.cobranca, "como funciona a cobrança")) },
        ...(v.atraso ? [{ titulo: "Atrasos", paragrafos: paragrafos(v.atraso) }] : []),
        ...(v.excecoes ? [{ titulo: "Exceções", paragrafos: paragrafos(v.excecoes) }] : []),
        fecho(v, p),
      ],
    }),
  },
  {
    slug: "encerramento",
    nome: "Comunicado de encerramento",
    pacote: "consultorio",
    oficial: false,
    resumo: "Formaliza o fim do acompanhamento (alta, interrupção ou encaminhamento) de forma cuidadosa.",
    campos: [
      { id: "paciente", rotulo: "Nome do(a) atendido(a)", tipo: "texto", obrigatorio: true, identifica: true },
      { id: "motivo", rotulo: "Motivo do encerramento", tipo: "opcoes", opcoes: ["alta terapêutica", "interrupção a pedido do(a) atendido(a)", "encaminhamento a outro profissional", "mudança de cidade ou de modalidade"], obrigatorio: true },
      { id: "ultimo", rotulo: "Data do último atendimento", tipo: "data", obrigatorio: true },
      { id: "orientacoes", rotulo: "Orientações finais (opcional)", tipo: "area", ia: true, exemplo: "Fico à disposição para retomarmos o acompanhamento, se desejar." },
      campoData,
    ],
    montar: (v, p) => ({
      titulo: "Comunicado de encerramento do acompanhamento psicológico",
      blocos: [
        {
          paragrafos: [
            `Comunico o encerramento do acompanhamento psicológico de ${ou(v.paciente, "nome do(a) atendido(a)")}, por motivo de ${ou(v.motivo, "motivo")}. O último atendimento ocorreu em ${dataPorExtenso(v.ultimo)}.`,
            ...paragrafos(v.orientacoes),
            "Os registros do atendimento serão mantidos em sigilo e guardados pelo prazo previsto na regulamentação do Conselho Federal de Psicologia.",
          ],
        },
        fecho(v, p),
        { paragrafos: [`_______________________________\n${ou(p.nome, "seu nome")} — CRP ${ou(p.crp, "00/00000")}`] },
      ],
    }),
  },
];

export const PACOTES: Record<Pacote, { nome: string; descricao: string }> = {
  essencial: { nome: "Essencial", descricao: "Os 5 documentos do dia a dia" },
  contratos: { nome: "Contratos e termos", descricao: "Contrato terapêutico e TCLE" },
  completo: { nome: "Acesso completo", descricao: "Laudo, parecer e evolução" },
  consultorio: { nome: "Pack consultório", descricao: "Recibo, comparecimento, faltas e encerramento" },
};

export const modeloPorSlug = (slug: string) => MODELOS.find((m) => m.slug === slug);
