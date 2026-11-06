"use client";
import Link from "next/link";
import { useState } from "react";
import { Marca } from "@/components/Marca";
import { supabaseNavegador } from "@/lib/supabase/navegador";

export default function Entrar() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "enviado" | "erro">("livre");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    const { error } = await supabaseNavegador().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setEstado(error ? "erro" : "enviado");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center"><Marca /></Link>
        <div className="rounded-3xl bg-white p-8 shadow-paper">
          {estado === "enviado" ? (
            <>
              <h1 className="text-2xl font-extrabold">Confira seu e-mail</h1>
              <p className="mt-2 text-ink-soft">Enviamos um link de acesso para <strong className="text-ink">{email}</strong>. Abra no mesmo aparelho para entrar direto.</p>
              <button onClick={() => setEstado("livre")} className="mt-6 text-sm font-semibold underline">Usar outro e-mail</button>
            </>
          ) : (
            <form onSubmit={enviar}>
              <h1 className="text-2xl font-extrabold">Entrar na sua área</h1>
              <p className="mt-2 text-ink-soft">Use o mesmo e-mail da compra. Mandamos um link de acesso, sem senha.</p>
              <label htmlFor="email" className="rotulo mt-6">E-mail</label>
              <input id="email" type="email" required autoComplete="email" className="campo" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
              <button disabled={estado === "enviando"} className="cta mt-5 w-full">{estado === "enviando" ? "Enviando…" : "Receber link de acesso"}</button>
              {estado === "erro" && <p role="alert" className="mt-3 text-sm text-alert">Não foi possível enviar o link. Confira o e-mail e tente de novo.</p>}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
