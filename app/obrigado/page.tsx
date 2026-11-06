import Link from "next/link";
import type { Metadata } from "next";
import { Marca } from "@/components/Marca";
import { OFERTA } from "@/lib/config";

export const metadata: Metadata = { title: "Compra confirmada — Laudo Pronto", robots: { index: false } };

export default function Obrigado() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-10">
      <Link href="/" className="mb-8 block text-center"><Marca /></Link>
      <div className="rounded-3xl bg-white p-8 shadow-paper">
        <p className="text-sm font-bold uppercase tracking-wide text-seal">Compra confirmada</p>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight">Seu acesso está liberado.</h1>
        <p className="mt-3 text-ink-soft">Entre com o <strong className="text-ink">mesmo e-mail da compra</strong>. Enviamos um link de acesso, sem senha.</p>
        <Link href="/entrar" className="cta mt-6 block w-full text-center">Entrar no Laudo Pronto</Link>
      </div>

      <div className="mt-6 rounded-3xl border-2 border-ink bg-marca-light p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">Oferta exclusiva desta compra</p>
        <h2 className="mt-1 text-2xl font-extrabold leading-tight">Libere também laudo, parecer e evolução</h2>
        <p className="mt-2 text-ink-soft">O Acesso Completo inclui os modelos de laudo psicológico, parecer psicológico e registro de evolução, no padrão da Resolução CFP nº 06/2019, em Word ou PDF.</p>
        <p className="mt-4 text-4xl font-extrabold tracking-tight"><span className="text-xl align-top">R$</span> 57</p>
        <p className="text-sm text-ink-soft">Pagamento único · 7 dias de garantia</p>
        <a href={OFERTA.checkoutCompleto} className="cta cta-vivo mt-5 block w-full text-center">Quero o Acesso Completo</a>
        <Link href="/entrar" className="mt-4 block text-center text-sm font-semibold underline">Não, obrigado. Seguir com o essencial</Link>
      </div>
    </main>
  );
}
