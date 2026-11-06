import { NextResponse } from "next/server";
import { acessoDe, usuarioAtual, IA_GRATIS, LIMITE_IA_MES } from "@/lib/acesso";
import { supabaseAdmin } from "@/lib/supabase/servidor";
import { modeloPorSlug } from "@/lib/documentos";

const SISTEMA = `Você revisa trechos de documentos escritos por psicólogos(as) brasileiros(as).
Reescreva o trecho em linguagem técnica, impessoal, clara e objetiva, adequada à Resolução CFP nº 06/2019.
Regras:
- Não invente fatos, sintomas, diagnósticos, testes, datas ou números que não estejam no trecho.
- Não inclua CID nem hipótese diagnóstica que não esteja escrita no trecho.
- Mantenha exatamente marcadores entre colchetes, como [PACIENTE].
- Evite termos coloquiais, julgamentos de valor e afirmações categóricas sem fundamento no texto.
- Responda somente com o trecho reescrito, sem comentários, título ou aspas.`;

export async function POST(req: Request) {
  const user = await usuarioAtual();
  if (!user?.email) return NextResponse.json({ erro: "Entre na sua conta para usar a IA." }, { status: 401 });

  const { modelo, campo, texto } = await req.json().catch(() => ({}));
  const m = typeof modelo === "string" ? modeloPorSlug(modelo) : undefined;
  const c = m?.campos.find((x) => x.id === campo && x.ia);
  if (!m || !c || typeof texto !== "string" || !texto.trim()) {
    return NextResponse.json({ erro: "Escreva algo no campo antes de melhorar." }, { status: 400 });
  }
  if (texto.length > 4000) {
    return NextResponse.json({ erro: "Trecho longo demais. Melhore uma parte de cada vez (até 4.000 caracteres)." }, { status: 400 });
  }

  const email = user.email.toLowerCase();
  const acesso = await acessoDe(email);
  const db = supabaseAdmin();
  const temPlano = acesso.pacotes.includes("ia");

  const umMinuto = new Date(Date.now() - 60_000).toISOString();
  const { count: recentes } = await db.from("uso_ia").select("id", { count: "exact", head: true }).eq("email", email).gte("criado_em", umMinuto);
  if ((recentes ?? 0) >= 6) {
    return NextResponse.json({ erro: "Muitas melhorias seguidas. Aguarde um minuto." }, { status: 429 });
  }

  let restantes: number;
  if (temPlano) {
    const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { count } = await db.from("uso_ia").select("id", { count: "exact", head: true }).eq("email", email).gte("criado_em", inicioMes);
    restantes = LIMITE_IA_MES - (count ?? 0);
  } else {
    const { count } = await db.from("uso_ia").select("id", { count: "exact", head: true }).eq("email", email);
    restantes = IA_GRATIS - (count ?? 0);
  }
  if (restantes <= 0) {
    return NextResponse.json(
      { erro: temPlano ? "Você usou todas as melhorias deste mês." : "Suas melhorias de teste acabaram.", assinar: !temPlano },
      { status: 402 },
    );
  }

  const resp = await fetch(`${process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model: process.env.DEEPSEEK_MODEL || "deepseek-flash",
      temperature: 0.3,
      max_tokens: 1200,
      messages: [
        { role: "system", content: SISTEMA },
        { role: "user", content: `Documento: ${m.nome}\nSeção: ${c.rotulo}\n\nTrecho:\n${texto}` },
      ],
    }),
  }).catch(() => null);

  if (!resp?.ok) {
    return NextResponse.json({ erro: "A IA não respondeu agora. Tente de novo em instantes." }, { status: 502 });
  }
  const json = await resp.json();
  const melhorado: string | undefined = json?.choices?.[0]?.message?.content?.trim();
  if (!melhorado) return NextResponse.json({ erro: "A IA devolveu uma resposta vazia. Tente de novo." }, { status: 502 });

  await db.from("uso_ia").insert({ email });
  return NextResponse.json({ texto: melhorado, restantes: restantes - 1, plano: temPlano });
}
