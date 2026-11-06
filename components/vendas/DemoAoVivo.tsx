"use client";
import { useState } from "react";
import { Folha } from "@/components/Folha";
import { modeloPorSlug } from "@/lib/documentos";

const declaracao = modeloPorSlug("declaracao")!;
const prof = { nome: "Ana Paula Ribeiro", crp: "04/12345", cidade: "Uberlândia/MG", contato: "" };

/** Demonstração real do gerador na página de vendas: o visitante digita e a declaração se monta. */
export function DemoAoVivo() {
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
    <div className="grid items-start gap-8 lg:grid-cols-[360px_1fr]">
      <div className="rounded-3xl bg-white p-6 shadow-paper">
        <p className="mb-4 text-sm font-semibold text-seal">Teste agora, é o sistema de verdade</p>
        <label className="rotulo" htmlFor="demo-nome">Nome do(a) paciente</label>
        <input id="demo-nome" className="campo" placeholder="Digite um nome qualquer" value={v.paciente} onChange={set("paciente")} />
        <label className="rotulo mt-4" htmlFor="demo-fin">Finalidade</label>
        <input id="demo-fin" className="campo" value={v.finalidade} onChange={set("finalidade")} />
        <label className="rotulo mt-4" htmlFor="demo-tipo">Tipo de atendimento</label>
        <select id="demo-tipo" className="campo" value={v.tipoAtendimento} onChange={set("tipoAtendimento")}>
          {declaracao.campos.find((c) => c.id === "tipoAtendimento")!.opcoes!.map((o) => <option key={o}>{o}</option>)}
        </select>
        <label className="rotulo mt-4" htmlFor="demo-per">Período</label>
        <input id="demo-per" className="campo" value={v.periodo} onChange={set("periodo")} />
      </div>
      <div className="relative">
        <span className="absolute -top-3 right-4 z-10 rotate-2 rounded-lg bg-seal px-3 py-1 text-sm font-bold text-white shadow">Prévia em tempo real</span>
        <Folha doc={doc} prof={prof} className="max-h-[560px] overflow-hidden [mask-image:linear-gradient(black_80%,transparent)]" />
      </div>
    </div>
  );
}
