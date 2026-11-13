import { createClient } from "@supabase/supabase-js";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://laudo-pronto.vercel.app").replace(/\/$/, "");

/**
 * Dispara o e-mail de link de acesso (o mesmo do /entrar) logo após a compra.
 * Usa o SMTP/template já configurados no Supabase. Nunca lança erro: se falhar,
 * o acesso continua liberado e a pessoa ainda pode pedir o link em /entrar.
 */
export async function enviarLinkDeAcesso(email: string): Promise<boolean> {
  try {
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false, flowType: "implicit" },
    });
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${SITE}/auth/callback` },
    });
    if (error) console.error("[boas-vindas] falha ao enviar link:", error.message);
    return !error;
  } catch (e) {
    console.error("[boas-vindas] erro inesperado:", e);
    return false;
  }
}
