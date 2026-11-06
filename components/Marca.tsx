export function Marca({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xl font-extrabold tracking-tight ${claro ? "text-white" : "text-ink"}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="4" y="2" width="18" height="24" rx="2" fill={claro ? "#fff" : "#172338"} />
        <rect x="8" y="8" width="10" height="2" rx="1" fill={claro ? "#172338" : "#fff"} />
        <rect x="8" y="12.5" width="10" height="2" rx="1" fill={claro ? "#172338" : "#fff"} />
        <rect x="6.5" y="16.5" width="13" height="4.5" rx="1" fill="#FFD84D" />
        <path d="M18 19.5l3 3 5.5-6.5" stroke="#0B8A7A" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Laudo Pronto
    </span>
  );
}
