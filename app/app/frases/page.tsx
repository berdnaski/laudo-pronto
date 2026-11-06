import Link from "next/link";
import { redirect } from "next/navigation";
import { ListaFrases } from "@/components/ListaFrases";
import { acessoDe, usuarioAtual } from "@/lib/acesso";
import { FRASES } from "@/lib/frases";

export default async function Frases() {
  const user = await usuarioAtual();
  const acesso = await acessoDe(user!.email!);
  if (!acesso.pacotes.includes("frases")) redirect("/app");
  return (
    <div>
      <Link href="/app" className="text-sm font-semibold underline">← Voltar</Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Banco de frases técnicas</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">Trechos prontos para relatórios, registros e mensagens. Copie, adapte ao caso e revise: a responsabilidade técnica do texto final é sua.</p>
      <ListaFrases grupos={FRASES} />
    </div>
  );
}
