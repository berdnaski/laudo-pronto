import Link from "next/link";
import { acessoDe, usuarioAtual } from "@/lib/acesso";
import { MODELOS, PACOTES, type Pacote } from "@/lib/documentos";
import { OFERTA } from "@/lib/config";

const UPGRADE: Record<Pacote, string> = {
  essencial: OFERTA.checkout,
  contratos: OFERTA.checkoutContratos,
  completo: OFERTA.checkoutCompleto,
};

export default async function Painel() {
  const user = await usuarioAtual();
  const acesso = await acessoDe(user!.email!);
  const tem = (p: string) => acesso.pacotes.includes(p);

  if (!acesso.pacotes.length) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-paper">
        <h1 className="text-2xl font-extrabold">Ainda não encontramos uma compra para {user!.email}</h1>
        <p className="mt-3 text-ink-soft">
          A liberação leva até 5 minutos após o pagamento aprovado. Confira se entrou com o mesmo e-mail usado na compra.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <a className="cta" href={OFERTA.checkout}>Garantir meu acesso</a>
          <a className="text-sm font-semibold underline" href={`mailto:${OFERTA.suporte}`}>Já paguei e não liberou</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Qual documento você precisa agora?</h1>
      <p className="mt-2 text-ink-soft">Preencha os campos, revise a prévia e baixe em Word ou PDF.</p>

      {(Object.keys(PACOTES) as Pacote[]).map((pacote) => {
        const liberado = tem(pacote);
        const modelos = MODELOS.filter((m) => m.pacote === pacote);
        return (
          <section key={pacote} className="mt-10">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-bold">
                {PACOTES[pacote].nome}
                {!liberado && <span className="ml-2 rounded-full bg-ink px-2.5 py-0.5 align-middle text-xs font-semibold text-white">bloqueado</span>}
              </h2>
              {!liberado && UPGRADE[pacote] && (
                <a href={UPGRADE[pacote]} className="cta cta-sm">Liberar {PACOTES[pacote].nome.toLowerCase()}</a>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modelos.map((m) => {
                const conteudo = (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold">{m.nome}</h3>
                      {m.oficial && <span className="shrink-0 rounded-md bg-seal-light px-2 py-0.5 text-xs font-semibold text-seal">Res. CFP 06/2019</span>}
                    </div>
                    <p className="mt-2 text-sm text-ink-soft">{m.resumo}</p>
                  </>
                );
                return liberado ? (
                  <Link key={m.slug} href={`/app/${m.slug}`} className="group rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink focus-visible:outline focus-visible:outline-4 focus-visible:outline-marca">
                    {conteudo}
                    <span className="mt-4 inline-block font-semibold group-hover:underline">Preencher</span>
                  </Link>
                ) : (
                  <div key={m.slug} className="rounded-2xl border border-dashed border-line bg-white/50 p-5 opacity-70">{conteudo}</div>
                );
              })}
            </div>
          </section>
        );
      })}

      {!tem("ia") && OFERTA.checkoutIA && (
        <section className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-ink p-7 text-white sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Redação técnica com IA, sem limite de documentos</h2>
            <p className="mt-1 text-white/75">Você tem 3 melhorias de teste. No plano mensal são 200 por mês, com todos os documentos liberados.</p>
          </div>
          <a href={OFERTA.checkoutIA} className="cta">Conhecer o plano</a>
        </section>
      )}
    </div>
  );
}
