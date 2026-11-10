"use client";
import { useEffect, useState } from "react";
import { OFERTA } from "@/lib/config";

/** Barra de compra no celular. Aparece depois do topo e leva aos planos. */
export function BarraFixa() {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(window.scrollY > 700);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-line bg-white/95 px-5 py-3 backdrop-blur transition-transform duration-300 md:hidden ${ver ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!ver}
    >
      <p className="flex-1 text-[13px] leading-tight text-ink-soft">
        A partir de<br />
        <strong className="text-[17px] text-tinta">R$ {OFERTA.preco}</strong>
      </p>
      <a href="#planos" tabIndex={ver ? 0 : -1} className="btn btn-sm">Ver os planos</a>
    </div>
  );
}
