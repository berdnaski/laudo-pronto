"use client";
import { useEffect, useState } from "react";
import { OFERTA } from "@/lib/config";
import { Contador } from "@/components/vendas/Contador";

/** Barra de compra fixa: embaixo no celular, em cima no computador. Aparece depois do vídeo. */
export function BarraFixa() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(window.scrollY > 900);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <div className={`fixed inset-x-0 top-0 z-50 hidden bg-ink text-white shadow-lg transition-transform duration-300 md:block ${ver ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-6 py-3">
          <span className="flex items-center gap-2 font-bold">
            <span className="h-2.5 w-2.5 animate-piscar rounded-full bg-alert" aria-hidden="true" />
            Preço de lançamento: R$ {OFERTA.preco}
          </span>
          {OFERTA.fimLancamento && (
            <span className="text-sm text-white/80">
              termina em <strong className="text-marca"><Contador fim={OFERTA.fimLancamento} compacto /></strong>
            </span>
          )}
          <a href={OFERTA.checkout} className="cta cta-sm cta-vivo ml-auto">Quero o Laudo Pronto</a>
        </div>
      </div>
      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${ver ? "translate-y-0" : "translate-y-full"}`}>
        {OFERTA.fimLancamento && (
          <p className="mb-2 text-center text-xs font-semibold text-ink-soft">
            Preço de lançamento termina em <span className="text-alert"><Contador fim={OFERTA.fimLancamento} compacto /></span>
          </p>
        )}
        <a href={OFERTA.checkout} className="cta cta-vivo w-full">Quero por R$ {OFERTA.preco}</a>
      </div>
    </>
  );
}
