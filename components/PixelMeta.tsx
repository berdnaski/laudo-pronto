"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Pixel do Meta (Facebook/Instagram). O ID não é segredo: ele aparece no código de qualquer site. */
export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1113851702865809";

type Fbq = (...args: unknown[]) => void;

/**
 * Carrega o Pixel só nas páginas públicas (vendas e obrigado), não na área logada de quem já comprou.
 * Dispara PageView ao abrir a página e InitiateCheckout quando alguém clica em qualquer botão que leva ao checkout da Cakto.
 */
export function PixelMeta() {
  const pathname = usePathname() || "/";
  const ativo = !(pathname.startsWith("/app") || pathname.startsWith("/auth") || pathname.startsWith("/entrar") || pathname.startsWith("/sair"));

  useEffect(() => {
    if (!ativo) return;
    const aoClicar = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !/pay\.cakto\.com\.br/.test(a.href)) return;
      const fbq = (window as unknown as { fbq?: Fbq }).fbq;
      fbq?.("track", "InitiateCheckout", { content_name: a.textContent?.trim().slice(0, 60) || "Laudo Pronto", currency: "BRL" });
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, [ativo]);

  if (!ativo) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');`}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
