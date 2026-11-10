import { Folha } from "@/components/Folha";
import { modeloPorSlug, type Profissional } from "@/lib/documentos";

const prof: Profissional = { nome: "Ana Paula Ribeiro", crp: "04/12345", cidade: "Uberlândia/MG", contato: "" };

const exemplos = {
  declaracao: {
    paciente: "Maria da Silva",
    solicitante: "a própria interessada",
    finalidade: "apresentação ao empregador",
    tipoAtendimento: "psicoterapia",
    periodo: "desde 10 de março de 2026",
    frequencia: "semanal, às terças-feiras, das 14h às 14h50",
  },
  atestado: {
    paciente: "Maria da Silva",
    solicitante: "a própria interessada",
    finalidade: "justificativa de afastamento",
    condicao: "sintomas de ansiedade que comprometem temporariamente sua capacidade de concentração",
    afastamento: "afastamento de suas atividades por 7 (sete) dias, a partir desta data",
  },
  relatorio: {
    paciente: "Maria da Silva",
    solicitante: "a própria interessada",
    finalidade: "encaminhamento à equipe de saúde",
    demanda: "Buscou atendimento relatando dificuldades no sono e irritabilidade após mudança de emprego.",
    procedimento: "12 sessões de psicoterapia individual, semanais, de 50 minutos, em abordagem cognitivo-comportamental.",
    analise: "Observou-se evolução na identificação de pensamentos automáticos e redução da irritabilidade relatada.",
    conclusao: "Recomenda-se continuidade do acompanhamento psicológico.",
  },
};

function Doc({ slug, campos, className = "" }: { slug: keyof typeof exemplos; campos: Record<string, string>; className?: string }) {
  const modelo = modeloPorSlug(slug)!;
  return (
    <Folha
      doc={modelo.montar(campos, prof)}
      prof={prof}
      ilustracao
      className={`!max-w-none !rounded-xl !px-6 !py-7 text-[10.5px] !leading-[1.75] !shadow-folha ${className}`}
    />
  );
}

/** Três documentos reais, montados pelo próprio gerador, como visual do topo da página. */
export function PilhaDocumentos() {
  return (
    <div
      className="relative mx-auto h-[330px] w-full max-w-[380px] select-none sm:h-[460px] sm:max-w-[820px]"
      style={{ maskImage: "linear-gradient(black 72%, transparent)", WebkitMaskImage: "linear-gradient(black 72%, transparent)" }}
      aria-hidden="true"
    >
      {/* Documentos de trás: só no computador */}
      <div className="absolute left-2 top-9 hidden h-[460px] w-[290px] -rotate-[7deg] opacity-80 sm:block">
        <Doc slug="relatorio" campos={exemplos.relatorio} className="h-full overflow-hidden" />
      </div>
      <div className="absolute right-2 top-9 hidden h-[460px] w-[290px] rotate-[7deg] opacity-80 sm:block">
        <Doc slug="atestado" campos={exemplos.atestado} className="h-full overflow-hidden" />
      </div>

      {/* Documento da frente */}
      <div className="absolute left-1/2 top-0 h-[400px] w-full max-w-[380px] -translate-x-1/2">
        <Doc slug="declaracao" campos={exemplos.declaracao} className="h-full overflow-hidden" />
      </div>
    </div>
  );
}
