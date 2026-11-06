import Link from "next/link";
import { redirect } from "next/navigation";
import { usuarioAtual } from "@/lib/acesso";
import { Marca } from "@/components/Marca";

export default async function AreaLayout({ children }: { children: React.ReactNode }) {
  const user = await usuarioAtual();
  if (!user) redirect("/entrar");
  return (
    <div className="min-h-screen">
      <header className="nao-imprime border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/app"><Marca /></Link>
          <form action="/sair" method="post">
            <span className="mr-4 hidden text-sm text-ink-soft sm:inline">{user.email}</span>
            <button className="text-sm font-semibold underline underline-offset-2">Sair</button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
