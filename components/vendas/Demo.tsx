"use client";
import { useState } from "react";
import { Folha } from "@/components/Folha";
import { modeloPorSlug } from "@/lib/documentos";

const declaracao = modeloPorSlug("declaracao")!;
const prof = { nome: "Ana Paula Ribeiro", crp: "04/12345", cidade: "Uberlândia/MG", contato: "" };
const TIPOS = declaracao.campos.find((c) => c.id === "tipoAtendimento")!.opcoes!;

/** O gerador de verdade, aberto na página: a pessoa digita e a declaração se monta ao lado. */
export function Demo() {
  const [v, setV] = useState<Record<string, string>>({
    paciente: "",
    finalidade: "apresentação ao empregador",
    tipoAtendimento: "psicoterapia",
    periodo: "desde 10 de março de 2026",
    frequencia: "semanal, às terças-feiras, das 14h às 14h50",
    solicitante: "a própria interessada",
  });
  const doc = declaracao.montar(v, prof);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV({ ...v, [k]: e.target.value });

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-line bg-white p-6 text-left">
        <label className="rotulo" htmlFor="demo-nome">Nome do(a) paciente</label>
        <input id="demo-nome" className="campo" placeholder="Digite um nome qualquer" value={v.paciente} onChange={set("paciente")} autoComplete="off" />
        <label className="rotulo mt-4" htmlFor="demo-fin">Finalidade</label>
        <input id="demo-fin" className="campo" value={v.finalidade} onChange={set("finalidade")} autoComplete="off" />
        <label className="rotulo mt-4" htmlFor="demo-tipo">Tipo de atendimento</label>
        <select id="demo-tipo" className="campo" value={v.tipoAtendimento} onChange={set("tipoAtendimento")}>
          {TIPOS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <label className="rotulo mt-4" htmlFor="demo-per">Período</label>
        <input id="demo-per" className="campo" value={v.periodo} onChange={set("periodo")} autoComplete="off" />
      </form>
      <Folha
        doc={doc}
        prof={prof}
        className="!max-w-none !rounded-2xl !px-8 !py-10 text-[13.5px] !shadow-folha sm:!px-12"
      />
    </div>
  );
}
