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
      <Link href="/app" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-tinta"><span aria-hidden="true">←</span> Todos os documentos</Link>
      <h1 className="mt-4 text-[2rem] font-extrabold tracking-[-0.035em] text-tinta sm:text-[2.4rem]">Banco de frases técnicas</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">Trechos prontos para relatórios, registros e mensagens. Copie, adapte ao caso e revise: a responsabilidade técnica do texto final é sua.</p>
      <ListaFrases grupos={FRASES} />
    </div>
  );
}
