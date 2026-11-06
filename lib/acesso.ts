import { supabaseAdmin, supabaseDoUsuario } from "@/lib/supabase/servidor";

export type Acesso = { email: string; pacotes: string[] };

export async function usuarioAtual() {
  const sb = await supabaseDoUsuario();
  const { data } = await sb.auth.getUser();
  return data.user;
}

export async function acessoDe(email: string): Promise<Acesso> {
  const { data } = await supabaseAdmin()
    .from("acessos")
    .select("email, pacotes")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  const pacotes: string[] = data?.pacotes ?? [];
  // A assinatura de IA libera todos os modelos.
  if (pacotes.includes("ia")) pacotes.push("essencial", "contratos", "completo");
  return { email, pacotes: [...new Set(pacotes)] };
}

/** Mapeia o produto/oferta da Cakto para o pacote que ele libera. */
export function pacoteDoProduto(ids: (string | undefined)[]): string | null {
  const mapa: Record<string, string | undefined> = {
    essencial: process.env.CAKTO_PRODUTO_ESSENCIAL,
    contratos: process.env.CAKTO_PRODUTO_CONTRATOS,
    completo: process.env.CAKTO_PRODUTO_COMPLETO,
    ia: process.env.CAKTO_PRODUTO_IA,
  };
  for (const [pacote, configurado] of Object.entries(mapa)) {
    if (!configurado) continue;
    const aceitos = configurado.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.some((id) => id && aceitos.includes(id))) return pacote;
  }
  return null;
}

export const LIMITE_IA_MES = Number(process.env.LIMITE_IA_MES || 200);
export const IA_GRATIS = Number(process.env.IA_GRATIS || 3);
