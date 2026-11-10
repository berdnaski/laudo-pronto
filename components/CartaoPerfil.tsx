"use client";
import { useState } from "react";
import { PerfilForm } from "@/components/PerfilForm";
import { usePerfil } from "@/lib/perfil";

/**
 * Dados de assinatura no painel: preenchidos uma vez, entram em todo documento.
 * Ficam no navegador (nada vai para o servidor), por isso o aviso.
 */
export function CartaoPerfil() {
  const { perfil, salvar, carregado, completo } = usePerfil();
  const [editando, setEditando] = useState(false);

  if (!carregado) return <div className="h-[76px] rounded-2xl border border-line bg-white" aria-hidden="true" />;

  if (completo && !editando) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-white px-5 py-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-roxo-light text-sm font-bold text-roxo-deep" aria-hidden="true">
          {perfil.nome.trim().charAt(0).toUpperCase()}
        </span>
        <p className="text-[15px] text-ink-soft">
          Assinando como <strong className="font-semibold text-tinta">{perfil.nome}</strong>, CRP {perfil.crp} · {perfil.cidade}
        </p>
        <button onClick={() => setEditando(true)} className="ml-auto rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-roxo hover:text-tinta">
          Alterar
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <h2 className="text-lg font-bold text-tinta">Seus dados de assinatura</h2>
      <p className="mt-1 text-[15px] text-ink-soft">
        Preencha uma vez. Eles entram no rodapé de todos os documentos e ficam salvos só neste navegador.
      </p>
      <div className="mt-5">
        <PerfilForm inicial={perfil} onSalvar={(p) => { salvar(p); setEditando(false); }} />
      </div>
    </div>
  );
}
