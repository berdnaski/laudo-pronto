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
    <div className="bg-roxo px-5 py-2.5 text-center text-[14px] font-medium text-white">
      Preço de lançamento: plano Essencial por R$ {preco}. Termina em <Contador fim={fim} compacto />
    </div>
  );
}
