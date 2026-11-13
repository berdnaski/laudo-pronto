import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/servidor";
import { enviarLinkDeAcesso } from "@/lib/boas-vindas";

/** Pedido de link de acesso. Só envia para e-mails que já compraram e responde sempre igual (não revela quem é cliente). */
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  const alvo = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(alvo)) return NextResponse.json({ ok: false }, { status: 400 });
  const { data } = await supabaseAdmin().from("acessos").select("email").eq("email", alvo).maybeSingle();
  if (data) await enviarLinkDeAcesso(alvo);
  return NextResponse.json({ ok: true });
}
