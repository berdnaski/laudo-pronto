import type { Metadata } from "next";
import { PainelConteudo } from "@/components/PainelConteudo";
import { Gerador } from "@/components/Gerador";
import { Depoimentos } from "@/components/vendas/Depoimentos";
import { DEPOIMENTOS_EXEMPLO } from "@/lib/depoimentos";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Prévia do visual da área logada, sem login. Só existe em desenvolvimento. */
export default function PreviaInterna() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="min-h-screen bg-papel">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Depoimentos itens={DEPOIMENTOS_EXEMPLO} />
        <hr className="my-16 border-line" />
        <PainelConteudo email="ana@consultorio.com" pacotes={["essencial", "contratos", "frases"]} />
        <hr className="my-16 border-line" />
        <Gerador slug="declaracao" planoIA={false} />
      </div>
    </div>
  );
}
