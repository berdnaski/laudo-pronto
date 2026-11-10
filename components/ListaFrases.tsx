"use client";
import { useState } from "react";
import type { GrupoFrases } from "@/lib/frases";

export function ListaFrases({ grupos }: { grupos: GrupoFrases[] }) {
  const [copiada, setCopiada] = useState<string | null>(null);

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiada(texto);
      setTimeout(() => setCopiada((c) => (c === texto ? null : c)), 1800);
    } catch {
      /* sem permissão de área de transferência: o texto continua selecionável */
    }
  }

  return (
    <div className="mt-8 space-y-10">
      {grupos.map((g) => (
        <section key={g.titulo}>
          <h2 className="text-xl font-bold text-tinta">{g.titulo}</h2>
          <p className="mt-1 text-sm text-ink-soft">{g.dica}</p>
          <ul className="mt-4 space-y-3">
            {g.frases.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{f}</p>
                <button onClick={() => copiar(f)} className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-roxo transition-colors hover:border-roxo focus-visible:outline focus-visible:outline-4 focus-visible:outline-roxo-soft">
                  {copiada === f ? "Copiado ✓" : "Copiar"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
