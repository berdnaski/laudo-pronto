import { NextResponse } from "next/server";
import { supabaseDoUsuario } from "@/lib/supabase/servidor";

export async function POST(req: Request) {
  const sb = await supabaseDoUsuario();
  await sb.auth.signOut();
  return NextResponse.redirect(new URL("/entrar", req.url), { status: 303 });
}
