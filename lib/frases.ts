// Banco de frases técnicas para relatórios e registros. São pontos de partida:
// o profissional adapta ao caso e responde tecnicamente pelo texto final.

export type GrupoFrases = { titulo: string; dica: string; frases: string[] };

export const FRASES: GrupoFrases[] = [
  {
    titulo: "Demanda e motivo do atendimento",
    dica: "Abra o documento descrevendo a demanda sem rotular o paciente.",
    frases: [
      "O atendimento foi buscado pela própria pessoa, que relata dificuldades em lidar com situações de estresse no ambiente de trabalho.",
      "A demanda inicial refere-se a sofrimento psíquico associado a mudanças recentes na rotina familiar.",
      "O encaminhamento para avaliação psicológica partiu da escola, em razão de dificuldades de atenção e de relacionamento com colegas.",
      "A queixa principal, nas palavras da pessoa atendida, diz respeito a sensação persistente de preocupação e dificuldade para dormir.",
      "A pessoa atendida procurou acompanhamento psicológico após período de luto, buscando espaço de elaboração e acolhimento.",
      "A solicitação do documento foi feita pelo(a) próprio(a) interessado(a), para fins de apresentação à instituição indicada.",
    ],
  },
  {
    titulo: "Procedimentos e instrumentos",
    dica: "Descreva o que foi feito, sem excesso de detalhe técnico.",
    frases: [
      "Foram realizados encontros semanais com duração de 50 minutos, por meio de entrevistas psicológicas e observação clínica.",
      "O processo de avaliação psicológica incluiu entrevista inicial, entrevistas de devolutiva e aplicação de instrumentos aprovados pelo Conselho Federal de Psicologia.",
      "Utilizaram-se entrevistas semiestruturadas, observação do comportamento durante os atendimentos e análise de documentos fornecidos pela escola.",
      "As informações foram obtidas exclusivamente por meio de atendimentos presenciais realizados entre as datas indicadas neste documento.",
      "Quando necessário, foram consideradas informações complementares obtidas com autorização expressa da pessoa atendida.",
      "Os atendimentos ocorreram na modalidade online, por plataforma de vídeo, observadas as orientações do CFP para serviços psicológicos mediados por tecnologia.",
    ],
  },
  {
    titulo: "Observação e análise",
    dica: "Prefira descrever comportamentos observados a atribuir rótulos.",
    frases: [
      "Durante os atendimentos, a pessoa mostrou-se colaborativa, com discurso organizado e coerente com o contexto relatado.",
      "Observou-se oscilação de humor associada a situações específicas de conflito familiar, com melhora gradual ao longo do processo.",
      "A análise dos dados obtidos indica que as dificuldades relatadas se relacionam a fatores contextuais e relacionais, e não a uma condição isolada.",
      "Verificou-se melhora na capacidade de identificar e nomear emoções, e no uso de estratégias de enfrentamento ao longo dos atendimentos.",
      "Os resultados devem ser compreendidos de forma dinâmica, considerando o momento de vida e o contexto da pessoa avaliada.",
      "As informações aqui apresentadas refletem o momento da avaliação e podem sofrer alterações com o tempo e com o processo terapêutico.",
    ],
  },
  {
    titulo: "Conclusão e encaminhamento",
    dica: "Conclua com o que é possível afirmar, sem extrapolar a finalidade.",
    frases: [
      "Conclui-se que a pessoa atendida apresenta condições psicológicas compatíveis com a finalidade solicitada.",
      "Recomenda-se a continuidade do acompanhamento psicológico, com reavaliação em prazo a ser definido em conjunto.",
      "Sugere-se avaliação complementar com profissional da área médica, a critério da pessoa atendida e de sua rede de cuidado.",
      "Não foram identificados, no período avaliado, elementos que contraindiquem a participação na atividade em questão.",
      "Recomenda-se ao ambiente escolar a adoção de estratégias de apoio, conforme orientações compartilhadas com a família.",
      "Este documento não deve ser utilizado para fins diferentes do apontado na identificação, conforme a Resolução CFP nº 06/2019.",
    ],
  },
  {
    titulo: "Registro de sessão (evolução)",
    dica: "Registros objetivos, em linguagem neutra e sem julgamento.",
    frases: [
      "Sessão dedicada à elaboração de conflitos recentes no relacionamento conjugal; foram exploradas alternativas de comunicação.",
      "A pessoa relatou melhora do sono e redução da frequência dos episódios de ansiedade desde o último encontro.",
      "Foram trabalhadas técnicas de regulação emocional, com orientação para prática entre as sessões.",
      "Combinado que a pessoa registrará, ao longo da semana, as situações em que perceber aumento de tensão.",
      "Sessão remarcada por solicitação da pessoa atendida, com aviso prévio, sem prejuízo ao processo.",
      "Discutido o planejamento do processo terapêutico para o próximo período, com ajustes de frequência.",
    ],
  },
  {
    titulo: "Comunicação com pacientes e responsáveis",
    dica: "Mensagens profissionais, claras e acolhedoras.",
    frases: [
      "Olá! Passando para confirmar nossa sessão de amanhã, às {horário}. Se precisar remarcar, me avise com antecedência, por favor.",
      "Recebi seu aviso de cancelamento. Podemos remarcar para {dia} às {horário}? Fico no aguardo.",
      "Informo que o pagamento da sessão pode ser feito por Pix até o dia do atendimento. Segue a chave: {chave}.",
      "Antes de iniciarmos, gostaria de reforçar que tudo o que conversamos aqui é sigiloso, nos termos do Código de Ética Profissional.",
      "Compreendo sua preocupação. Para garantir o sigilo, informações sobre o atendimento só serão compartilhadas com sua autorização.",
      "Foi um prazer acompanhar seu processo. Se desejar retomar no futuro, as portas continuam abertas.",
    ],
  },
];
