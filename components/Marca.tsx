/** Folha com canto dobrado e selo de aprovação: o documento que fica pronto. */
export function Simbolo({ size = 30, claro = false }: { size?: number; claro?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 3h13l6 6v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill={claro ? "#fff" : "#2F3FD0"} />
      <path d="M20 3v5a1 1 0 0 0 1 1h5z" fill={claro ? "#C9CEF6" : "#9AA4F2"} />
      <rect x="9" y="13" width="10" height="2" rx="1" fill={claro ? "#2F3FD0" : "#fff"} opacity=".92" />
      <rect x="9" y="17.5" width="7" height="2" rx="1" fill={claro ? "#2F3FD0" : "#fff"} opacity=".92" />
      <circle cx="23" cy="24" r="6.4" fill="#0E8F6B" stroke={claro ? "#2F3FD0" : "#F2F4F7"} strokeWidth="1.6" />
      <path d="M20 24.1l2.2 2.2L26.4 21.9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 text-[1.35rem] font-extrabold tracking-[-0.03em] ${claro ? "text-white" : "text-tinta"}`}>
      <Simbolo claro={claro} />
      Laudo Pronto
    </span>
  );
}
