import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/servidor";
import { pacoteDoProduto } from "@/lib/acesso";

const LIBERA = new Set(["purchase_approved", "subscription_created", "subscription_renewed", "subscription_late_recovered", "subscription_resumed"]);
const REVOGA = new Set(["refund", "chargeback", "subscription_canceled"]);

function iguais(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/** Aceita a assinatura HMAC (X-Cakto-Signature) ou, na falta dela, o campo `secret` do corpo. */
function origemValida(req: Request, bruto: string, corpo: { secret?: string }) {
  const segredo = process.env.CAKTO_WEBHOOK_SECRET;
  if (!segredo) return false;
  const assinatura = req.headers.get("x-cakto-signature");
  const timestamp = req.headers.get("x-cakto-timestamp");
  if (assinatura && timestamp) {
    const agora = Math.floor(Date.now() / 1000);
    if (Math.abs(agora - Number(timestamp)) > 300) return false;
    const esperado = "v1=" + crypto.createHmac("sha256", segredo).update(`${timestamp}.${bruto}`).digest("hex");
    return iguais(assinatura, esperado);
  }
  return typeof corpo.secret === "string" && iguais(corpo.secret, segredo);
}

export async function POST(req: Request) {
  const bruto = await req.text();
  let corpo: any;
  try {
    corpo = JSON.parse(bruto);
  } catch {
    return NextResponse.json({ erro: "JSON inválido" }, { status: 400 });
  }
  if (!origemValida(req, bruto, corpo)) {
    return NextResponse.json({ erro: "não autorizado" }, { status: 401 });
  }

  const evento: string = corpo.event;
  const d = corpo.data ?? {};
  const email: string | undefined = d.customer?.email?.toLowerCase().trim();
  const pacote = pacoteDoProduto([d.product?.id, d.product?.short_id, d.offer?.id]);
  const db = supabaseAdmin();

  // Registro idempotente: o mesmo pedido + evento só é processado uma vez.
  if (d.refId) {
    const { error } = await db.from("pedidos").insert({
      ref_id: d.refId,
      evento,
      email,
      produto: d.product?.name ?? null,
      valor: typeof d.amount === "number" ? d.amount : null,
    });
    if (error?.code === "23505") return NextResponse.json({ ok: true, repetido: true });
  }

  if (!email || !pacote || (!LIBERA.has(evento) && !REVOGA.has(evento))) {
    return NextResponse.json({ ok: true, ignorado: true });
  }

  const { data: atual } = await db.from("acessos").select("pacotes").eq("email", email).maybeSingle();
  const pacotes = new Set<string>(atual?.pacotes ?? []);
  if (LIBERA.has(evento)) pacotes.add(pacote);
  if (REVOGA.has(evento)) pacotes.delete(pacote);

  await db.from("acessos").upsert({
    email,
    nome: d.customer?.name ?? null,
    pacotes: [...pacotes],
    atualizado_em: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, email, pacotes: [...pacotes] });
}
