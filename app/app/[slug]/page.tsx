import { notFound, redirect } from "next/navigation";
import { Gerador } from "@/components/Gerador";
import { acessoDe, usuarioAtual } from "@/lib/acesso";
import { modeloPorSlug } from "@/lib/documentos";

export default async function PaginaModelo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const modelo = modeloPorSlug(slug);
  if (!modelo) notFound();
  const user = await usuarioAtual();
  const acesso = await acessoDe(user!.email!);
  if (!acesso.pacotes.includes(modelo.pacote)) redirect("/app");
  return <Gerador slug={slug} planoIA={acesso.pacotes.includes("ia")} />;
}
