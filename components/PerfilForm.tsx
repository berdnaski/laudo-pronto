"use client";
import { useState } from "react";
import type { Profissional } from "@/lib/documentos";

export function PerfilForm({ inicial, onSalvar }: { inicial: Profissional; onSalvar: (p: Profissional) => void }) {
  const [p, setP] = useState(inicial);
  const set = (k: keyof Profissional) => (e: React.ChangeEvent<HTMLInputElement>) => setP({ ...p, [k]: e.target.value });
  return (
    <form
      className="grid gap-3 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSalvar(p);
      }}
    >
      <div className="sm:col-span-2">
        <label className="rotulo" htmlFor="pnome">Nome completo</label>
        <input id="pnome" required className="campo" value={p.nome} onChange={set("nome")} placeholder="Ana Paula Ribeiro" />
      </div>
      <div>
        <label className="rotulo" htmlFor="pcrp">CRP</label>
        <input id="pcrp" required className="campo" value={p.crp} onChange={set("crp")} placeholder="04/12345" />
      </div>
      <div>
        <label className="rotulo" htmlFor="pcid">Cidade/UF</label>
        <input id="pcid" required className="campo" value={p.cidade} onChange={set("cidade")} placeholder="Uberlândia/MG" />
      </div>
      <div className="sm:col-span-2">
        <label className="rotulo" htmlFor="pcon">Contato no rodapé (opcional)</label>
        <input id="pcon" className="campo" value={p.contato} onChange={set("contato")} placeholder="(34) 99999-0000 · contato@seuconsultorio.com" />
      </div>
      <button className="cta cta-sm sm:col-span-2">Salvar meus dados</button>
      <p className="text-xs text-ink-soft sm:col-span-2">Ficam salvos só neste navegador.</p>
    </form>
  );
}
