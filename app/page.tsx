import { Marca } from "@/components/Marca";
import { BarraFixa } from "@/components/vendas/BarraFixa";
import { PopupSaida } from "@/components/vendas/PopupSaida";
import { Contador } from "@/components/vendas/Contador";
import { FaixaLancamento } from "@/components/vendas/FaixaLancamento";
import { PilhaDocumentos } from "@/components/vendas/PilhaDocumentos";
import { Demo } from "@/components/vendas/Demo";
import { OFERTA } from "@/lib/config";
import { MODELOS } from "@/lib/documentos";

const essenciais = MODELOS.filter((m) => m.pacote === "essencial");

function Check({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <li className="flex gap-3">
      <svg className="mt-[5px] shrink-0" width="15" height="12" viewBox="0 0 15 12" aria-hidden="true">
        <path d="M1.5 6.2l4 4L13.5 1.5" stroke={claro ? "#fff" : "#6B4DE6"} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

const PASSOS = [
  ["Escolha o documento", "Declaração, atestado, relatório, encaminhamento ou anamnese."],
  ["Preencha os campos", "Cada campo mostra o que a resolução espera, e a prévia se monta enquanto você digita."],
  ["Baixe e assine", "Word para ajustar ou PDF para imprimir, com seu nome e CRP no lugar certo."],
];

const PLANOS = [
  {
    nome: "Essencial",
    resumo: "Os cinco documentos do dia a dia.",
    preco: OFERTA.preco,
    href: OFERTA.checkout,
    cta: "Começar com o Essencial",
    itens: [
      "Declaração, atestado, relatório, encaminhamento e anamnese",
      "Estrutura da Resolução CFP nº 06/2019",
      "Word e PDF, quantas vezes quiser",
      "Seu nome, CRP e cidade preenchidos sozinhos",
    ],
  },
  {
    nome: "Completo",
    resumo: "Tudo do Essencial e o resto do consultório.",
    preco: OFERTA.precoCompleto,
    href: OFERTA.checkoutCompleto,
    cta: "Quero o Completo",
    destaque: true,
    itens: [
      "Tudo o que está no plano Essencial",
      "Laudo, parecer e registro de evolução",
      "Contrato terapêutico e TCLE",
      "Recibo, comparecimento, política de faltas e encerramento",
      "36 frases técnicas para relatórios e mensagens",
    ],
  },
];

const PERGUNTAS = [
  {
    q: "Os documentos seguem a Resolução CFP nº 06/2019?",
    r: "Sim. Declaração, atestado, relatório, laudo e parecer seguem a estrutura e os itens obrigatórios da resolução, incluindo identificação, finalidade e o aviso de uso restrito. Você revisa o texto e assina: a responsabilidade técnica continua sendo sua.",
  },
  {
    q: "É um arquivo de Word para eu adaptar?",
    r: "Não. É um sistema: você preenche campos guiados e o documento é montado na hora, com seus dados de assinatura. Depois você baixa em Word ou salva em PDF.",
  },
  {
    q: "Os dados dos meus pacientes ficam salvos?",
    r: "Não. O documento é montado no seu navegador e não guardamos o que você digita. Na melhoria de redação com IA, o nome do paciente é trocado por um marcador antes de sair do seu computador.",
  },
  {
    q: "Como recebo o acesso?",
    r: "Assim que o pagamento é aprovado, e o Pix aprova na hora, você entra com o e-mail da compra e recebe um link de acesso. Sem senha para decorar.",
  },
  {
    q: "E se eu não gostar?",
    r: "Você tem 7 dias de garantia. Pede o reembolso pela plataforma de pagamento e recebe 100% do valor, sem precisar explicar o motivo.",
  },
];

export default function Vendas() {
  return (
    <>
      <FaixaLancamento fim={OFERTA.fimLancamento} preco={OFERTA.preco} />

      <header className="border-b border-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <a href="#topo" aria-label="Laudo Pronto, início"><Marca /></a>
          <div className="flex items-center gap-5">
            <a href="/entrar" className="text-[15px] font-medium text-ink-soft hover:text-tinta">Já comprei</a>
            <a href="#planos" className="btn btn-sm">Ver os planos</a>
          </div>
        </div>
      </header>

      <main id="topo">
        {/* Topo */}
        <section className="px-5 pb-4 pt-16 text-center sm:pt-24">
          <h1 className="mx-auto max-w-3xl text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.045em] text-tinta sm:text-[4rem]">
            Documentos psicológicos prontos em 5 minutos
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Preencha os campos, confira a prévia e baixe em Word ou PDF, na estrutura da Resolução CFP nº 06/2019.
          </p>
          <div className="mt-9">
            <a href="#planos" className="btn">Quero o Laudo Pronto</a>
            <p className="mt-4 text-[15px] text-ink-soft">Pagamento único a partir de R$ {OFERTA.preco} · 7 dias de garantia</p>
          </div>
          <div className="mt-16 sm:mt-20">
            <PilhaDocumentos />
          </div>
        </section>

        {/* Como funciona */}
        <section id="como" className="scroll-mt-6 bg-papel px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="titulo mx-auto max-w-xl text-center">Do atendimento ao documento assinado</h2>
            <ol className="mt-14 grid gap-10 text-center sm:grid-cols-3 sm:gap-8">
              {PASSOS.map(([t, d], i) => (
                <li key={t}>
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-roxo-soft text-base font-extrabold text-roxo-deep">{i + 1}</span>
                  <h3 className="mt-5 text-xl font-bold text-tinta">{t}</h3>
                  <p className="mx-auto mt-2 max-w-xs leading-relaxed text-ink-soft">{d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Demonstração */}
        <section className="px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="titulo mx-auto max-w-xl text-center">Teste agora. É o sistema de verdade.</h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-lg text-ink-soft">Digite um nome e veja a declaração se montar.</p>
            <div className="mt-12"><Demo /></div>
          </div>
        </section>

        {/* Documentos */}
        <section className="bg-papel px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="titulo text-center">Os cinco documentos que você mais escreve</h2>
            <ul className="mt-12 divide-y divide-line">
              {essenciais.map((m) => (
                <li key={m.slug} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
                  <h3 className="shrink-0 text-lg font-bold text-tinta sm:w-48">{m.nome}</h3>
                  <p className="leading-relaxed text-ink-soft">{m.resumo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="scroll-mt-6 px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="titulo text-center">Escolha o seu plano</h2>
            <p className="mx-auto mt-4 max-w-lg text-center text-lg text-ink-soft">Pagamento único, sem mensalidade. Acesso na hora e 7 dias de garantia.</p>

            <div className="mt-14 grid items-stretch gap-5 md:grid-cols-2">
              {PLANOS.map((p) => (
                <div
                  key={p.nome}
                  className={`flex flex-col rounded-3xl p-8 text-left sm:p-9 ${p.destaque ? "bg-roxo text-white" : "border border-line bg-white"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight">{p.nome}</h3>
                    {p.destaque && <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-medium">Mais completo</span>}
                  </div>
                  <p className={`mt-1.5 text-[15px] ${p.destaque ? "text-white/75" : "text-ink-soft"}`}>{p.resumo}</p>
                  <p className="mt-7 flex items-baseline gap-1 tracking-[-0.04em]">
                    <span className="text-lg font-semibold">R$</span>
                    <span className="text-5xl font-extrabold">{p.preco}</span>
                  </p>
                  <p className={`text-sm ${p.destaque ? "text-white/65" : "text-ink-soft"}`}>pagamento único</p>
                  <ul className={`mt-7 flex-1 space-y-3 text-[15.5px] leading-snug ${p.destaque ? "" : "text-ink-soft"}`}>
                    {p.itens.map((i) => <Check key={i} claro={p.destaque}>{i}</Check>)}
                  </ul>
                  <a href={p.href} className={`btn mt-8 w-full ${p.destaque ? "btn-claro" : ""}`}>{p.cta}</a>
                </div>
              ))}
            </div>

            <p className="mt-7 text-center text-[15px] text-ink-soft">
              Pix, cartão ou boleto, com liberação automática.
              {OFERTA.fimLancamento && (
                <> O preço de lançamento termina em <strong className="font-semibold text-tinta"><Contador fim={OFERTA.fimLancamento} compacto /></strong>.</>
              )}
            </p>
          </div>
        </section>

        {/* Garantia */}
        <section className="px-5 pb-20 sm:pb-28">
          <div className="mx-auto max-w-2xl rounded-3xl bg-papel px-8 py-12 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-tinta">Teste por 7 dias. Se não servir, devolvemos tudo.</h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-ink-soft">
              Gere seus documentos e, se achar que não vale, peça o reembolso pela plataforma de pagamento. Você recebe 100% de volta, sem precisar explicar.
            </p>
          </div>
        </section>

        {/* Perguntas */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-2xl">
            <h2 className="titulo text-center">Perguntas frequentes</h2>
            <div className="mt-12 divide-y divide-line border-y border-line">
              {PERGUNTAS.map(({ q, r }) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[17px] font-semibold text-tinta focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-roxo-soft">
                    {q}
                    <span className="text-2xl font-light leading-none text-roxo transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-soft">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Fechamento */}
        <section className="bg-roxo px-5 py-20 text-center text-white sm:py-24">
          <h2 className="mx-auto max-w-2xl text-[2rem] font-extrabold leading-[1.1] tracking-[-0.035em] sm:text-[2.6rem]">
            O próximo documento pode ficar pronto em 5 minutos
          </h2>
          <a href="#planos" className="btn btn-claro mt-9">Ver os planos</a>
        </section>
      </main>

      <footer className="px-5 pb-28 pt-12 text-[14px] text-ink-soft md:pb-12">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <Marca />
          <p>O Laudo Pronto é uma ferramenta de apoio à redação, sem vínculo com o Conselho Federal de Psicologia. A elaboração, a revisão e a assinatura dos documentos são de responsabilidade do(a) profissional.</p>
          <p>Suporte: <a className="underline" href={`mailto:${OFERTA.suporte}`}>{OFERTA.suporte}</a></p>
        </div>
      </footer>

      <BarraFixa />
      <PopupSaida />
    </>
  );
}
