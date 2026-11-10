"use client";
import { useEffect, useRef, useState } from "react";
import { OFERTA } from "@/lib/config";

const CHAVE = "lp_saida_vista";

/** Popup de saída: aparece uma única vez por visita, quando o mouse sai pela parte de cima da janela. */
export function PopupSaida() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-tinta/70 px-4" onClick={() => setAberto(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="saida-titulo" onClick={(e) => e.stopPropagation()} className="animate-surgir relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-folha">
        <button onClick={() => setAberto(false)} aria-label="Fechar" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-2xl font-bold text-ink-soft hover:bg-papel focus-visible:outline focus-visible:outline-4 focus-visible:outline-carimbo">×</button>
        <h2 id="saida-titulo" className="text-3xl font-extrabold leading-tight tracking-tight text-tinta">Antes de sair, um preço menor</h2>
        <p className="mt-3 text-ink-soft">Leve o plano Essencial por um valor reduzido, só nesta visita.</p>
        <p className="mt-5 text-ink-soft"><s>de R$ {OFERTA.preco}</s></p>
        <p className="text-6xl font-extrabold tracking-tight text-tinta"><span className="align-top text-2xl">R$</span>{OFERTA.precoSaida}</p>
        <p className="mt-1 text-sm text-ink-soft">Pagamento único, acesso na hora e 7 dias de garantia</p>
        <a ref={botao} href={OFERTA.checkoutSaida} className="btn mt-6 w-full">Quero por R$ {OFERTA.precoSaida}</a>
        <button onClick={() => setAberto(false)} className="mt-4 text-sm font-semibold text-ink-soft underline">Não, obrigado</button>
      </div>
    </div>
  );
}
