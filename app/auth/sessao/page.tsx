"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseNavegador } from "@/lib/supabase/navegador";

export default function Sessao() {
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const access_token = p.get("access_token");
    const refresh_token = p.get("refresh_token");
    if (!access_token || !refresh_token) return setErro(true);
    supabaseNavegador()
      .auth.setSession({ access_token, refresh_token })
      .then(({ error }) => (error ? setErro(true) : window.location.replace("/app")));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-papel px-5">
      {erro ? (
        <p className="text-center text-ink-soft">
          Esse link expirou. <Link href="/entrar" className="font-medium text-roxo underline">Peça um novo link de acesso</Link>.
        </p>
      ) : (
        <p className="text-ink-soft">Entrando…</p>
      )}
    </main>
  );
}
