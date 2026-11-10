import { PainelConteudo } from "@/components/PainelConteudo";
import { acessoDe, usuarioAtual } from "@/lib/acesso";

export default async function Painel() {
  const user = await usuarioAtual();
  const acesso = await acessoDe(user!.email!);
  return <PainelConteudo email={user!.email!} pacotes={acesso.pacotes} />;
}
