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
      {/* Cabeçalho: identifica quem assina antes mesmo do título, como num papel timbrado. */}
      <header className="mb-9 border-b border-ink/15 pb-4 text-center">
        <p className="font-sans text-[13px] font-semibold tracking-wide text-ink">{prof.nome || "[seu nome]"}</p>
        <p className="font-sans text-[12px] text-ink-soft">
          Psicólogo(a) · CRP {prof.crp || "[00/00000]"}
          {prof.cidade ? ` · ${prof.cidade}` : ""}
        </p>
      </header>
      <Titulo className="mb-8 text-center text-xl font-semibold uppercase tracking-[0.12em]">{doc.titulo}</Titulo>
      {doc.blocos.map((b, i) => (
        <section key={i} className="mb-6">
          {b.titulo && <Subtitulo className="mb-2 font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-ink-soft">{b.titulo}</Subtitulo>}
          {b.paragrafos.map((p, j) => (
            <p key={j} className="mb-2.5 whitespace-pre-line text-left last:mb-0 sm:text-justify">
              {realcarPendencias(p)}
            </p>
          ))}
        </section>
      ))}
      <footer className="mt-20 text-center">
        <div className="mx-auto mb-2 w-72 border-t border-ink" />
        <p className="font-semibold leading-snug">{prof.nome || "[seu nome]"}</p>
        <p className="text-sm leading-snug">Psicólogo(a) — CRP {prof.crp || "[00/00000]"}</p>
        {prof.contato && <p className="mt-1 font-sans text-[12px] text-ink-soft">{prof.contato}</p>}
        {doc.rodape && <p className="mt-8 font-sans text-[11px] text-ink-faint">{doc.rodape}</p>}
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
