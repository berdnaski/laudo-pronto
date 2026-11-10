"use client";
import { useEffect, useRef, useState } from "react";
import { OFERTA } from "@/lib/config";

const CHAVE = "lp_saida_vista";

/** Popup de saída: aparece uma única vez por visita, quando o mouse sai pela parte de cima da janela. */
export function PopupSaida() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Sem preço de saída configurado, não existe oferta: o popup não aparece.
    if (!OFERTA.precoSaida || !OFERTA.checkoutSaida) return;
    let ja = false;
    try { ja = sessionStorage.getItem(CHAVE) === "1"; } catch { /* sem storage */ }
    if (ja) return;

    const montadoEm = Date.now();
    const mostrar = () => {
      setAberto(true);
      try { sessionStorage.setItem(CHAVE, "1"); } catch { /* sem storage */ }
      document.removeEventListener("mouseout", aoSair);
    };
    // Só dispara depois de 8 s na página e quando o cursor sai pelo topo (vai para abas/fechar).
    const aoSair = (e: MouseEvent) => {
      if (Date.now() - montadoEm < 8000) return;
      if (e.relatedTarget === null && e.clientY <= 0) mostrar();
    };
    document.addEventListener("mouseout", aoSair);
    return () => document.removeEventListener("mouseout", aoSair);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    botao.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  if (!aberto) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-tinta/60 px-5" onClick={() => setAberto(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="saida-titulo" onClick={(e) => e.stopPropagation()} className="animate-surgir relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-folha">
        <button onClick={() => setAberto(false)} aria-label="Fechar" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-2xl font-light text-ink-soft hover:bg-papel focus-visible:outline focus-visible:outline-4 focus-visible:outline-roxo-soft">×</button>
        <h2 id="saida-titulo" className="text-[1.7rem] font-extrabold leading-tight tracking-[-0.035em] text-tinta">Antes de sair, um preço menor</h2>
        <p className="mt-3 text-ink-soft">Leve o plano Essencial por um valor reduzido, só nesta visita.</p>
        <p className="mt-6 text-sm text-ink-soft"><s>de R$ {OFERTA.preco}</s></p>
        <p className="flex items-baseline justify-center gap-1 tracking-[-0.04em] text-tinta">
          <span className="text-lg font-semibold">R$</span>
          <span className="text-5xl font-extrabold">{OFERTA.precoSaida}</span>
        </p>
        <a ref={botao} href={OFERTA.checkoutSaida} className="btn mt-7 w-full">Quero por R$ {OFERTA.precoSaida}</a>
        <button onClick={() => setAberto(false)} className="mt-4 text-sm text-ink-soft underline">Não, obrigado</button>
      </div>
    </div>
  );
}
