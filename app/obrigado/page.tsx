import Link from "next/link";
import type { Metadata } from "next";
import { Marca } from "@/components/Marca";
import { OFERTA } from "@/lib/config";

export const metadata: Metadata = { title: "Compra confirmada — Laudo Pronto", robots: { index: false } };

export default function Obrigado() {
  return (
    <main className="min-h-screen bg-papel px-5 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="mb-8 block text-center"><Marca /></Link>

        <div className="rounded-3xl border border-line bg-white p-8">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-tinta">Compra confirmada. Seu acesso está liberado.</h1>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Entre com o <strong className="font-semibold text-tinta">mesmo e-mail da compra</strong>. Enviamos um link de acesso, sem senha.
          </p>
          <Link href="/entrar" className="btn mt-7 w-full">Entrar no Laudo Pronto</Link>
        </div>

        <div className="mt-5 rounded-3xl bg-roxo p-8 text-white">
          <h2 className="text-xl font-bold leading-tight">Libere também laudo, parecer e evolução</h2>
          <p className="mt-2 leading-relaxed text-white/75">
            O plano Completo inclui laudo psicológico, parecer, registro de evolução, contrato terapêutico, TCLE, o pack de consultório e o banco de frases.
          </p>
          <p className="mt-6 flex items-baseline gap-1 tracking-[-0.04em]">
            <span className="text-lg font-semibold">R$</span>
            <span className="text-4xl font-extrabold">{OFERTA.precoCompleto}</span>
          </p>
          <p className="text-sm text-white/65">pagamento único · 7 dias de garantia</p>
          <a href={OFERTA.checkoutCompleto} className="btn btn-claro mt-6 w-full">Quero o plano Completo</a>
          <Link href="/entrar" className="mt-4 block text-center text-sm text-white/70 underline">Agora não, quero começar a usar</Link>
        </div>
      </div>
    </main>
  );
}
