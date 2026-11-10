"use client";
import { useState } from "react";
import { Folha } from "@/components/Folha";
import { modeloPorSlug } from "@/lib/documentos";

const declaracao = modeloPorSlug("declaracao")!;
const prof = { nome: "Ana Paula Ribeiro", crp: "04/12345", cidade: "Uberlândia/MG", contato: "" };

/**
 * Topo da página de vendas com o gerador de verdade: o visitante digita e a declaração se monta ao lado.
 * O carimbo aparece quando o documento já tem nome e finalidade, como no sistema depois de preenchido.
 * `topo` e `base` são os textos e botões (renderizados no servidor), o estado fica só aqui.
 */
export function HeroDemo({ topo, base }: { topo: React.ReactNode; base: React.ReactNode }) {
  const [v, setV] = useState<Record<string, string>>({
    paciente: "",
    finalidade: "apresentação ao empregador",
    tipoAtendimento: "psicoterapia",
    periodo: "desde 10 de março de 2026",
    frequencia: "semanal, às terças-feiras, das 14h às 14h50",
    solicitante: "a própria interessada",
  });
  const doc = declaracao.montar(v, prof);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });
  const pronto = v.paciente.trim().length >= 3 && v.finalidade.trim().length >= 3;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-16">
      <div>
        {topo}

        <form onSubmit={(e) => e.preventDefault()} className="mt-9 rounded-2xl border border-line bg-white p-5">
          <p className="text-sm font-semibold text-tinta">Teste agora. É o sistema de verdade.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="rotulo" htmlFor="hero-nome">Nome do(a) paciente</label>
              <input id="hero-nome" className="campo" placeholder="Digite um nome qualquer" value={v.paciente} onChange={set("paciente")} autoComplete="off" />
            </div>
            <div>
              <label className="rotulo" htmlFor="hero-fin">Finalidade</label>
              <input id="hero-fin" className="campo" value={v.finalidade} onChange={set("finalidade")} autoComplete="off" />
            </div>
          </div>
        </form>

        {base}
      </div>

      <div className="relative" aria-label="Prévia do documento">
        <Folha
          doc={doc}
          prof={prof}
          className="max-h-[440px] overflow-hidden !px-7 !py-9 text-[14px] !shadow-folha sm:max-h-[500px] sm:!px-12 sm:!py-12 [mask-image:linear-gradient(black_76%,transparent)]"
        />
        {pronto && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-6 animate-carimbar rounded-md border-[3px] border-carimbo px-3 py-1.5 text-center text-[13px] font-extrabold uppercase leading-tight tracking-wider text-carimbo sm:right-9 sm:top-10"
          >
            Pronto para
            <br />
            assinar
          </span>
        )}
      </div>
    </div>
  );
}
