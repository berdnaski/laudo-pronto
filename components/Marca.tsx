/** Folha com o canto dobrado e o visto de aprovação: o documento que fica pronto. */
export function Simbolo({ size = 28, claro = false }: { size?: number; claro?: boolean }) {
  const base = claro ? "#fff" : "#6B4DE6";
  const dobra = claro ? "#C9BCFA" : "#B6A4F5";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 3h13l6 6v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill={base} />
      <path d="M20 3v5a1 1 0 0 0 1 1h5z" fill={dobra} />
      <path d="M10 15.5l3.4 3.4L22 10.6" stroke={claro ? "#6B4DE6" : "#fff"} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[1.3rem] font-extrabold tracking-[-0.035em] ${claro ? "text-white" : "text-tinta"}`}>
      <Simbolo claro={claro} />
      Laudo Pronto
    </span>
  );
}
