import Link from "next/link";
import { CartaoPerfil } from "@/components/CartaoPerfil";
import { MODELOS, PACOTES, type Pacote } from "@/lib/documentos";
import { OFERTA, PRECOS } from "@/lib/config";

const UPGRADE: Record<Pacote, string> = {
  essencial: OFERTA.checkout,
  contratos: OFERTA.checkoutContratos,
  completo: OFERTA.checkoutCompleto,
  consultorio: OFERTA.checkoutConsultorio,
};

function Cadeado() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <path d="M4.5 7V5a3.5 3.5 0 1 1 7 0v2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="3" y="7" width="10" height="7" rx="2" fill="currentColor" />
    </svg>
  );
}

function Cartao({
  titulo,
  resumo,
  oficial,
  href,
  acao,
}: {
  titulo: string;
  resumo: string;
  oficial?: boolean;
  href?: string;
  acao?: string;
}) {
  const miolo = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[17px] font-bold leading-snug text-tinta">{titulo}</h3>
        {oficial && (
          <span className="mt-0.5 shrink-0 rounded-full bg-roxo-light px-2.5 py-0.5 text-[11px] font-semibold text-roxo-deep">
            Res. CFP 06/2019
          </span>
        )}
      </div>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{resumo}</p>
    </>
  );

  if (!href) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white/60 p-5">
        {miolo}
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint">
          <Cadeado /> Bloqueado
        </p>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-line bg-white p-5 transition-colors hover:border-roxo focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-roxo-soft"
    >
      {miolo}
      <span className="mt-4 text-sm font-semibold text-roxo group-hover:underline">{acao ?? "Preencher"}</span>
    </Link>
  );
}

function Secao({
  titulo,
  descricao,
  liberado,
  upgrade,
  preco,
  children,
}: {
  titulo: string;
  descricao: string;
  liberado: boolean;
  upgrade?: string;
  preco?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-tinta">
            {titulo}
            {!liberado && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-papel px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                <Cadeado /> Bloqueado
              </span>
            )}
          </h2>
          <p className="mt-1 text-[15px] text-ink-soft">{descricao}</p>
        </div>
        {!liberado && upgrade && (
          <a href={upgrade} className="btn btn-sm">{preco ? `Liberar por R$ ${preco}` : "Liberar"}</a>
        )}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export function PainelConteudo({ email, pacotes }: { email: string; pacotes: string[] }) {
  const tem = (p: string) => pacotes.includes(p);

  if (!pacotes.length) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-8 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-tinta">Ainda não encontramos uma compra para este e-mail</h1>
        <p className="mt-3 text-ink-soft">
          Entramos com <strong className="text-tinta">{email}</strong>. A liberação leva até 5 minutos depois do pagamento aprovado.
          Se você usou outro e-mail na compra, saia e entre com ele.
        </p>
        <a className="btn mt-7 w-full" href={OFERTA.checkout}>Ver os planos</a>
        <a className="mt-4 block text-sm text-ink-soft underline" href={`mailto:${OFERTA.suporte}`}>Já paguei e não liberou</a>
      </div>
    );
  }

  const liberados = (Object.keys(PACOTES) as Pacote[]).filter(tem).length;

  return (
    <div>
      <h1 className="text-[2rem] font-extrabold tracking-[-0.035em] text-tinta sm:text-[2.4rem]">Seus documentos</h1>
      <p className="mt-2 text-lg text-ink-soft">Preencha os campos, revise a prévia e baixe em Word ou PDF.</p>

      <div className="mt-8"><CartaoPerfil /></div>

      {(Object.keys(PACOTES) as Pacote[]).map((pacote) => {
        const liberado = tem(pacote);
        const modelos = MODELOS.filter((m) => m.pacote === pacote);
        if (!modelos.length) return null;
        return (
          <Secao
            key={pacote}
            titulo={PACOTES[pacote].nome}
            descricao={PACOTES[pacote].descricao}
            liberado={liberado}
            upgrade={UPGRADE[pacote]}
            preco={PRECOS[pacote]}
          >
            {modelos.map((m) => (
              <Cartao
                key={m.slug}
                titulo={m.nome}
                resumo={m.resumo}
                oficial={m.oficial}
                href={liberado ? `/app/${m.slug}` : undefined}
              />
            ))}
          </Secao>
        );
      })}

      <Secao
        titulo="Banco de frases técnicas"
        descricao="Trechos prontos para relatórios, registros e mensagens."
        liberado={tem("frases")}
        upgrade={OFERTA.checkoutFrases}
        preco={PRECOS.frases}
      >
        <Cartao
          titulo="36 frases prontas para copiar"
          resumo="Demanda, procedimentos, análise, conclusão, evolução e mensagens aos pacientes."
          href={tem("frases") ? "/app/frases" : undefined}
          acao="Abrir"
        />
      </Secao>

      {!tem("ia") && OFERTA.checkoutIA && (
        <section className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-roxo p-8 text-white sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-bold">Redação técnica com IA, sem limite</h2>
            <p className="mt-1.5 text-white/75">
              Você tem 3 melhorias de teste. No plano mensal são 200 por mês, com todos os documentos liberados.
            </p>
          </div>
          <a href={OFERTA.checkoutIA} className="btn btn-claro shrink-0">Conhecer o plano</a>
        </section>
      )}

      <p className="mt-14 text-sm text-ink-faint">
        {liberados > 0 && `${liberados} de ${Object.keys(PACOTES).length} pacotes liberados. `}
        Precisa de ajuda? Escreva para <a className="underline" href={`mailto:${OFERTA.suporte}`}>{OFERTA.suporte}</a>.
      </p>
    </div>
  );
}
