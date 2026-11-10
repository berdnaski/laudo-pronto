import Link from "next/link";
import { redirect } from "next/navigation";
import { usuarioAtual } from "@/lib/acesso";
import { Marca } from "@/components/Marca";

export default async function AreaLayout({ children }: { children: React.ReactNode }) {
  const user = await usuarioAtual();
  if (!user) redirect("/entrar");
  return (
    <div className="min-h-screen bg-papel">
      <header className="nao-imprime sticky top-0 z-30 border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <Link href="/app" aria-label="Laudo Pronto, meus documentos"><Marca /></Link>
          <form action="/sair" method="post" className="flex items-center gap-4">
            <span className="hidden max-w-[220px] truncate text-sm text-ink-soft sm:inline">{user.email}</span>
            <button className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-roxo hover:text-tinta">
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:py-12">{children}</main>
    </div>
  );
}
