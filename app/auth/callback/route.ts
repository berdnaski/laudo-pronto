import { NextResponse } from "next/server";
import { supabaseDoUsuario } from "@/lib/supabase/servidor";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (code) {
    const sb = await supabaseDoUsuario();
    await sb.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL("/app", url.origin));
}
