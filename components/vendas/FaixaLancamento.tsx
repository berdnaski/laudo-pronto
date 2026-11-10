"use client";
import { useEffect, useState } from "react";
import { Contador } from "@/components/vendas/Contador";

/** Faixa do topo com o fim REAL do preço de lançamento. Some sozinha quando a data passa. */
export function FaixaLancamento({ fim, preco }: { fim: string; preco: string }) {
  const [ativa, setAtiva] = useState(false);
  useEffect(() => {
    const alvo = fim ? new Date(fim).getTime() : NaN;
    setAtiva(!isNaN(alvo) && alvo > Date.now());
  }, [fim]);
  if (!ativa) return null;
  return (
    <div className="bg-tinta px-4 py-2.5 text-center text-sm text-white/90">
      Preço de lançamento: plano Essencial por <strong className="text-white">R$ {preco}</strong>. Termina em{" "}
      <strong className="text-white"><Contador fim={fim} compacto /></strong>
    </div>
  );
}
