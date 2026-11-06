import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PixelMeta } from "@/components/PixelMeta";

export const metadata: Metadata = {
  title: "Laudo Pronto — documentos psicológicos no padrão do CFP em minutos",
  description:
    "Preencha os campos e receba declaração, atestado, relatório e mais no formato da Resolução CFP nº 06/2019, prontos para revisar, assinar e baixar em Word ou PDF.",
};

export const viewport: Viewport = { themeColor: "#172338" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <PixelMeta />
      </body>
    </html>
  );
}
