"use client";
import { useEffect, useState } from "react";

/** Contagem regressiva até uma data real. Some sozinha quando a data passa. */
export function Contador({ fim, compacto = false, claro = false }: { fim: string; compacto?: boolean; claro?: boolean }) {
  const alvo = fim ? new Date(fim).getTime() : NaN;
  const [agora, setAgora] = useState<number | null>(null);
  useEffect(() => {
    setAgora(Date.now());
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!fim || isNaN(alvo) || agora === null || alvo <= agora) return null;
  const s = Math.floor((alvo - agora) / 1000);
  const partes = [
    { v: Math.floor(s / 86400), r: "dias", c: "d" },
    { v: Math.floor((s % 86400) / 3600), r: "horas", c: "h" },
    { v: Math.floor((s % 3600) / 60), r: "min", c: "m" },
    { v: s % 60, r: "seg", c: "s" },
  ].filter((p, i) => i > 0 || p.v > 0);

  if (compacto) {
    return (
      <span className="inline-flex gap-1 tabular-nums" aria-label="Tempo restante do preço de lançamento">
        {partes.map((p) => (
          <span key={p.r} className="inline-block overflow-hidden">
            <span key={p.v} className="inline-block animate-digito">{String(p.v).padStart(2, "0")}</span>
            {p.c}
          </span>
        ))}
      </span>
    );
  }
  return (
    <div className="flex gap-2" aria-label="Tempo restante do preço de lançamento">
      {partes.map((p, i) => (
        <div key={p.r} className={`min-w-[66px] overflow-hidden rounded-xl px-3 py-2 text-center ${claro ? "bg-white text-ink" : "bg-ink text-white"} ${i === partes.length - 1 ? "ring-2 ring-alert" : ""}`}>
          <div key={p.v} className="animate-digito text-3xl font-extrabold tabular-nums">{String(p.v).padStart(2, "0")}</div>
          <div className={`text-xs ${claro ? "text-ink-soft" : "text-white/70"}`}>{p.r}</div>
        </div>
      ))}
    </div>
  );
}
