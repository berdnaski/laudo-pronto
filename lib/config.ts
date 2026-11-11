/** Só aceita link de verdade: "pendente" ou vazio caem no fallback. */
const link = (v?: string) => (v && /^https?:\/\/\S+$/.test(v.trim()) ? v.trim() : "");
/** Só aceita data válida. */
const data = (v?: string) => (v && !Number.isNaN(Date.parse(v.trim())) ? v.trim() : "");

export const OFERTA = {
  preco: "17,90",
  /** Plano Completo: tudo do Essencial + laudo, parecer, evolução, contratos, consultório e frases. */
  precoCompleto: "27,90",
  /** Ex.: "ou 3x de R$ 10,15 no cartão" — confira o valor na sua oferta da Cakto. Vazio = não mostra. */
  parcelas: process.env.NEXT_PUBLIC_PARCELAS?.startsWith("ou ") ? process.env.NEXT_PUBLIC_PARCELAS : "",
  checkout: link(process.env.NEXT_PUBLIC_CHECKOUT_URL) || "https://pay.cakto.com.br/3cjotp6_1286972",
  /**
   * Fim REAL do preço de lançamento. Depois dessa data, suba o preço na Cakto.
   * O contador some sozinho quando a data passa. Troque pela variável NEXT_PUBLIC_FIM_LANCAMENTO.
   */
  fimLancamento: data(process.env.NEXT_PUBLIC_FIM_LANCAMENTO) || "2026-11-30T23:59:59-03:00",
  suporte: process.env.NEXT_PUBLIC_EMAIL_SUPORTE?.includes("@") ? process.env.NEXT_PUBLIC_EMAIL_SUPORTE : "suporte@laudopronto.com.br",
  checkoutIA: link(process.env.NEXT_PUBLIC_CHECKOUT_IA_URL),
  checkoutCompleto: link(process.env.NEXT_PUBLIC_CHECKOUT_COMPLETO_URL) || "https://pay.cakto.com.br/p9um7zs_1289547",
  /**
   * Oferta mostrada só no popup de saída (mesmo produto, mais barato).
   * Deixe `precoSaida` vazio enquanto a oferta não existir na Cakto: o popup some sozinho.
   */
  checkoutSaida: link(process.env.NEXT_PUBLIC_CHECKOUT_SAIDA_URL) || "https://pay.cakto.com.br/5szpq3r",
  precoSaida: process.env.NEXT_PUBLIC_PRECO_SAIDA || "14,90",
  checkoutConsultorio: link(process.env.NEXT_PUBLIC_CHECKOUT_CONSULTORIO_URL) || "https://pay.cakto.com.br/36khpqv_1289570",
  checkoutFrases: link(process.env.NEXT_PUBLIC_CHECKOUT_FRASES_URL) || "https://pay.cakto.com.br/35n78e8_1289573",
  checkoutContratos: link(process.env.NEXT_PUBLIC_CHECKOUT_CONTRATOS_URL) || "https://pay.cakto.com.br/b5asgcv_1287256",
};

/** Preço de cada pacote avulso, como está cadastrado na Cakto. Usado nos botões de liberar. */
export const PRECOS: Record<string, string> = {
  essencial: OFERTA.preco,
  completo: OFERTA.precoCompleto,
  contratos: "14,90",
  consultorio: "9,90",
  frases: "7,90",
};
