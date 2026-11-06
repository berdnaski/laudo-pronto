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
    essencial: [process.env.CAKTO_PRODUTO_ESSENCIAL, "205687ba-d8bc-478c-94b4-50ea25c368e6"].filter(Boolean).join(","),
    contratos: [process.env.CAKTO_PRODUTO_CONTRATOS, "2aefc6ee-7067-4b6a-86f8-1ca58242ae24"].filter(Boolean).join(","),
    completo: [process.env.CAKTO_PRODUTO_COMPLETO, "84cb3a44-effb-4865-982b-35aafdc85278"].filter(Boolean).join(","),
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
