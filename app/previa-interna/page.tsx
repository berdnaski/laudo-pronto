import type { Metadata } from "next";
import { PainelConteudo } from "@/components/PainelConteudo";
import { Gerador } from "@/components/Gerador";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Prévia do visual da área logada, sem login. Só existe em desenvolvimento. */
export default function PreviaInterna() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="min-h-screen bg-papel">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <PainelConteudo email="ana@consultorio.com" pacotes={["essencial", "contratos", "frases"]} />
        <hr className="my-16 border-line" />
        <Gerador slug="declaracao" planoIA={false} />
      </div>
    </div>
  );
}
