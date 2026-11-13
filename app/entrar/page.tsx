"use client";
import Link from "next/link";
import { useState } from "react";
import { Marca } from "@/components/Marca";

export default function Entrar() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"livre" | "enviando" | "enviado" | "erro">("livre");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("enviando");
    const r = await fetch("/api/entrar", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    const error = !r || !r.ok;
    setEstado(error ? "erro" : "enviado");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-papel px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center"><Marca /></Link>
        <div className="rounded-3xl border border-line bg-white p-8">
          {estado === "enviado" ? (
            <>
              <h1 className="text-2xl font-extrabold tracking-tight text-tinta">Confira seu e-mail</h1>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Enviamos um link de acesso para <strong className="font-semibold text-tinta">{email}</strong>. Abra o e-mail e toque no botão para entrar. Se não aparecer, olhe o spam.
              </p>
              <button onClick={() => setEstado("livre")} className="mt-6 text-sm font-medium text-roxo underline underline-offset-2">
                Usar outro e-mail
              </button>
            </>
          ) : (
            <form onSubmit={enviar}>
              <h1 className="text-2xl font-extrabold tracking-tight text-tinta">Entrar na sua área</h1>
              <p className="mt-3 leading-relaxed text-ink-soft">Use o mesmo e-mail da compra. Mandamos um link de acesso, sem senha.</p>
              <label htmlFor="email" className="rotulo mt-7">E-mail</label>
              <input id="email" type="email" required autoComplete="email" className="campo" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" />
              <button disabled={estado === "enviando"} className="btn mt-5 w-full disabled:opacity-60">
                {estado === "enviando" ? "Enviando…" : "Receber link de acesso"}
              </button>
              {estado === "erro" && (
                <p role="alert" className="mt-4 text-sm text-alert">Não foi possível enviar o link. Confira o e-mail e tente de novo.</p>
              )}
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Ainda não comprou? <Link href="/" className="font-medium text-roxo underline underline-offset-2">Ver os planos</Link>
        </p>
      </div>
    </main>
  );
}
