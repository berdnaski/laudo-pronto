import { NextResponse } from "next/server";
import { supabaseDoUsuario } from "@/lib/supabase/servidor";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (code) {
    // Link pedido em /entrar (PKCE): troca o código por sessão.
    const sb = await supabaseDoUsuario();
    await sb.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(new URL("/app", url.origin));
  }
  // Link enviado automaticamente após a compra: os tokens vêm no fragmento (#), que só o navegador enxerga.
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><title>Entrando…</title><p style="font-family:sans-serif;text-align:center;margin-top:20vh">Entrando…</p><script>location.replace("/auth/sessao"+location.hash)</script>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
