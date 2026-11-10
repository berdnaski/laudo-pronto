import type { Documento, Profissional } from "@/lib/documentos";

/**
 * Renderiza o documento como uma folha A4. Mesma estrutura usada na exportação.
 * `ilustracao` desliga os títulos semânticos: usado nas prévias da página de vendas,
 * para o documento de exemplo não competir com os títulos da própria página.
 */
export function Folha({ doc, prof, className = "", ilustracao = false }: { doc: Documento; prof: Profissional; className?: string; ilustracao?: boolean }) {
  const Titulo = ilustracao ? "p" : "h1";
  const Subtitulo = ilustracao ? "p" : "h2";
  return (
    <article className={`folha papel mx-auto w-full max-w-[720px] rounded-sm px-8 py-10 font-doc text-[15px] leading-[1.75] text-ink sm:px-14 sm:py-14 ${className}`}>
      <Titulo className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.12em]">{doc.titulo}</Titulo>
      {doc.blocos.map((b, i) => (
        <section key={i} className="mb-5">
          {b.titulo && <Subtitulo className="mb-1.5 text-[15px] font-bold">{b.titulo}</Subtitulo>}
          {b.paragrafos.map((p, j) => (
            <p key={j} className="mb-2 whitespace-pre-line text-left sm:text-justify">
              {realcarPendencias(p)}
            </p>
          ))}
        </section>
      ))}
      <footer className="mt-14 text-center">
        <div className="mx-auto mb-1 w-64 border-t border-ink" />
        <p className="font-semibold">{prof.nome || "[seu nome]"}</p>
        <p className="text-sm">Psicólogo(a) — CRP {prof.crp || "[00/00000]"}</p>
        {prof.contato && <p className="text-sm text-ink-soft">{prof.contato}</p>}
        {doc.rodape && <p className="mt-6 text-xs text-ink-faint">{doc.rodape}</p>}
      </footer>
    </article>
  );
}

/** Destaca trechos ainda não preenchidos, como [nome do(a) atendido(a)]. */
function realcarPendencias(texto: string) {
  const partes = texto.split(/(\[[^\]]+\])/g);
  return partes.map((p, i) =>
    /^\[[^\]]+\]$/.test(p) ? (
      <mark key={i} className="rounded bg-marca-light px-1 text-ink-soft print:bg-transparent">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
