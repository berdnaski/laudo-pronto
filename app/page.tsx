import { Marca } from "@/components/Marca";
import { BarraFixa } from "@/components/vendas/BarraFixa";
import { PopupSaida } from "@/components/vendas/PopupSaida";
import { Contador } from "@/components/vendas/Contador";
import { FaixaLancamento } from "@/components/vendas/FaixaLancamento";
import { HeroDemo } from "@/components/vendas/HeroDemo";
import { OFERTA } from "@/lib/config";
import { MODELOS } from "@/lib/documentos";

const essenciais = MODELOS.filter((m) => m.pacote === "essencial");

function Check({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return (
    <li className="flex gap-3">
      <svg className="mt-[3px] shrink-0" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="10" fill={claro ? "rgba(255,255,255,.16)" : "#DDF3EA"} />
        <path d="M5.5 10.4l3 3 6-6.6" stroke={claro ? "#fff" : "#0E8F6B"} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

const PASSOS = [
  {
    t: "Escolha o documento",
    d: "Declaração, atestado, relatório, encaminhamento ou anamnese.",
    visual: (
      <div className="flex flex-wrap gap-2">
        {["Declaração", "Atestado", "Relatório"].map((n, i) => (
          <span key={n} className={`rounded-full px-3 py-1 text-sm font-semibold ${i === 0 ? "bg-carimbo text-white" : "bg-papel text-ink-soft"}`}>{n}</span>
        ))}
      </div>
    ),
  },
  {
    t: "Preencha os campos guiados",
    d: "Cada campo mostra o que a resolução espera. A prévia se monta ao lado enquanto você digita.",
    visual: (
      <div>
        <div className="text-xs font-semibold text-ink-soft">Finalidade</div>
        <div className="mt-1 rounded-lg border border-line bg-white px-3 py-2 text-sm text-tinta">Apresentação ao empregador</div>
      </div>
    ),
  },
  {
    t: "Baixe e assine",
    d: "Word para ajustar o que quiser, ou PDF pronto para imprimir. Seu nome e CRP já vão no lugar certo.",
    visual: (
      <div className="flex gap-2">
        <span className="rounded-lg bg-tinta px-3 py-1.5 text-sm font-bold text-white">Word</span>
        <span className="rounded-lg border border-tinta/25 px-3 py-1.5 text-sm font-bold text-tinta">PDF</span>
      </div>
    ),
  },
];

const PLANOS = [
  {
    nome: "Essencial",
    resumo: "Os cinco documentos que você mais escreve.",
    preco: OFERTA.preco,
    href: OFERTA.checkout,
    cta: "Quero o Essencial",
    itens: [
      "Declaração, atestado, relatório, encaminhamento e anamnese",
      "Estrutura da Resolução CFP nº 06/2019",
      "Word e PDF, quantas vezes quiser",
      "Seu nome, CRP e cidade preenchidos sozinhos",
      "3 melhorias de redação com IA para testar",
    ],
  },
  {
    nome: "Completo",
    resumo: "Tudo do Essencial e o que falta para o consultório inteiro.",
    preco: OFERTA.precoCompleto,
    href: OFERTA.checkoutCompleto,
    cta: "Quero o Completo",
    destaque: true,
    itens: [
      "Todos os documentos do plano Essencial",
      "Laudo psicológico, parecer psicológico e registro de evolução",
      "Contrato terapêutico e TCLE",
      "Pack Consultório: recibo, comparecimento, política de faltas e encerramento",
      "Banco com 36 frases técnicas para relatórios e mensagens",
    ],
  },
];

const PERGUNTAS = [
  {
    q: "Os documentos seguem a Resolução CFP nº 06/2019?",
    r: "Sim. Declaração, atestado, relatório, laudo e parecer seguem a estrutura e os itens obrigatórios da resolução, incluindo identificação, finalidade e o aviso de uso restrito. Você revisa o texto e assina: a responsabilidade técnica continua sendo sua, como manda o Código de Ética.",
  },
  {
    q: "Qual a diferença entre o Essencial e o Completo?",
    r: "O Essencial traz os cinco documentos do dia a dia. O Completo inclui todos eles e acrescenta laudo, parecer, registro de evolução, contrato terapêutico, TCLE, o Pack Consultório e o banco de frases técnicas.",
  },
  {
    q: "É um arquivo de Word para eu adaptar?",
    r: "Não. É um sistema: você preenche campos guiados e o documento é montado na hora, já com seus dados de assinatura. Depois você baixa em Word (para editar à vontade) ou salva em PDF.",
  },
  {
    q: "Os dados dos meus pacientes ficam salvos em algum lugar?",
    r: "Não. O documento é montado no seu navegador e não guardamos nada do que você digita. Se você usar a melhoria de redação com IA, o nome do paciente é trocado por um marcador antes de sair do seu computador.",
  },
  {
    q: "Como recebo o acesso?",
    r: "Assim que o pagamento é aprovado (Pix aprova na hora), você entra com o e-mail da compra e recebe um link de acesso. Sem senha para decorar.",
  },
  {
    q: "Funciona no celular?",
    r: "Funciona no celular, tablet e computador. Para imprimir e assinar, o computador é mais confortável.",
  },
  {
    q: "E se eu não gostar?",
    r: "Você tem 7 dias de garantia. Pede o reembolso direto pela plataforma de pagamento e recebe 100% do valor, sem precisar explicar o motivo.",
  },
];

const FATOS = ["Pix aprova na hora", "Pagamento único", "7 dias de garantia", "Word e PDF"];

export default function Vendas() {
  return (
    <>
      <FaixaLancamento fim={OFERTA.fimLancamento} preco={OFERTA.preco} />

      <header className="sticky top-0 z-30 border-b border-line/70 bg-papel/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3.5 sm:px-6">
          <a href="#topo" aria-label="Laudo Pronto, início"><Marca /></a>
          <nav aria-label="Seções" className="ml-6 hidden gap-6 text-[15px] font-semibold text-ink-soft md:flex">
            <a className="hover:text-tinta" href="#como">Como funciona</a>
            <a className="hover:text-tinta" href="#documentos">Documentos</a>
            <a className="hover:text-tinta" href="#planos">Planos</a>
            <a className="hover:text-tinta" href="#perguntas">Perguntas</a>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <a href="/entrar" className="text-[15px] font-semibold text-ink-soft hover:text-tinta">Já comprei</a>
            <a href="#planos" className="btn btn-sm hidden sm:inline-flex">Ver os planos</a>
          </div>
        </div>
      </header>

      <main id="topo">
        {/* Topo com o gerador funcionando */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
          <HeroDemo
            topo={
              <>
                <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-tinta sm:text-[3.6rem]">
                  Declaração, atestado e relatório prontos em 5 minutos.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed">
                  Para psicólogas e psicólogos: preencha os campos, confira a prévia e baixe em Word ou PDF, na estrutura da Resolução CFP nº 06/2019. Seu nome e CRP já ficam no lugar certo.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#planos" className="btn w-full sm:w-auto">Quero o Laudo Pronto</a>
                  <a href="#como" className="btn btn-contorno w-full sm:w-auto">Ver como funciona</a>
                </div>
              </>
            }
            base={
              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] font-semibold text-tinta sm:flex sm:flex-wrap">
                {FATOS.map((f) => <Check key={f}>{f}</Check>)}
              </ul>
            }
          />
        </section>

        {/* Dor */}
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">
              O documento que fica para depois do último paciente
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>Já passou das 21h e ainda tem um relatório para entregar amanhã cedo. Você abre um documento antigo, troca o nome, apaga o que não serve e fica com a dúvida: será que está no formato que o CFP pede?</p>
              <p>Falta a finalidade? Precisa do aviso de uso restrito? Onde entra o CRP? A faculdade ensina a atender, mas quase não ensina a escrever o documento, e um documento mal elaborado pode gerar questionamento no seu conselho mesmo quando o atendimento foi impecável.</p>
              <p className="font-semibold text-tinta">O Laudo Pronto cuida dessa parte para ela levar minutos, não a sua noite.</p>
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">Do atendimento ao documento assinado</h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {PASSOS.map((p, i) => (
                <li key={p.t} className="relative md:pr-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-tinta text-base font-extrabold text-white">{i + 1}</span>
                    <span className="hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-tinta">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{p.d}</p>
                  <div className="mt-5 rounded-xl border border-line bg-white p-4" aria-hidden="true">{p.visual}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Documentos */}
        <section id="documentos" className="scroll-mt-20 bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
            <div>
              <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">O que a resolução pede já vem no lugar</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">Cada documento é montado com os itens que a Resolução CFP nº 06/2019 espera, para você se preocupar só com o conteúdo.</p>
              <ul className="mt-7 space-y-3 text-[17px] text-tinta">
                <Check>Identificação do autor, com nome e CRP</Check>
                <Check>Identificação do atendido e do solicitante</Check>
                <Check>Finalidade do documento</Check>
                <Check>Aviso de uso restrito e sigilo</Check>
                <Check>Local, data e linha de assinatura</Check>
              </ul>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {essenciais.map((m) => (
                <li key={m.slug} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                  <h3 className="shrink-0 text-xl font-bold text-tinta sm:w-40">{m.nome}</h3>
                  <p className="leading-relaxed text-ink-soft">{m.resumo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparação */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">Modelo pronto em Word não resolve o problema</h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm">
                    <th className="p-4 font-semibold sm:p-5"><span className="sr-only">Critério</span></th>
                    <th className="p-4 font-semibold text-ink-soft sm:p-5">Kit de modelos em Word</th>
                    <th className="bg-tinta p-4 font-bold text-white sm:p-5">Laudo Pronto</th>
                  </tr>
                </thead>
                <tbody className="text-sm sm:text-base">
                  {[
                    ["Como usa", "Abre, apaga, troca nomes", "Preenche campos guiados"],
                    ["Formato do CFP", "Depende de você conferir", "Estrutura já montada"],
                    ["Seu nome e CRP", "Digita em todo documento", "Configura uma vez"],
                    ["Tempo por documento", "Depende de quanto precisa adaptar", "Cerca de 5 minutos"],
                    ["Redação técnica com IA", "Não tem", "Disponível"],
                  ].map(([l, a, b]) => (
                    <tr key={l} className="border-t border-line">
                      <th scope="row" className="p-4 font-semibold text-tinta sm:p-5">{l}</th>
                      <td className="p-4 text-ink-soft sm:p-5">{a}</td>
                      <td className="bg-carimbo-light/60 p-4 font-semibold text-tinta sm:p-5">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Planos */}
        <section id="planos" className="scroll-mt-20 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">Escolha o plano e comece hoje</h2>
            <p className="mt-4 text-lg text-ink-soft">Pagamento único, sem mensalidade. Acesso na hora e 7 dias de garantia nos dois planos.</p>

            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
              {PLANOS.map((p) => (
                <div
                  key={p.nome}
                  className={`flex flex-col rounded-3xl p-7 sm:p-9 ${p.destaque ? "bg-tinta text-white shadow-folha" : "border border-line bg-papel"}`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl font-extrabold tracking-tight">{p.nome}</h3>
                    {p.destaque && <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Mais completo</span>}
                  </div>
                  <p className={`mt-2 ${p.destaque ? "text-white/75" : "text-ink-soft"}`}>{p.resumo}</p>
                  <p className="mt-6 flex items-baseline gap-1 tracking-[-0.04em]">
                    <span className="text-xl font-bold">R$</span>
                    <span className="text-6xl font-extrabold">{p.preco}</span>
                  </p>
                  <p className={`text-sm ${p.destaque ? "text-white/65" : "text-ink-soft"}`}>pagamento único</p>
                  <ul className="mt-7 flex-1 space-y-3 text-[16.5px] leading-snug">
                    {p.itens.map((i) => <Check key={i} claro={p.destaque}>{i}</Check>)}
                  </ul>
                  <a href={p.href} className={`btn mt-8 w-full ${p.destaque ? "btn-claro" : ""}`}>{p.cta}</a>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-2 text-ink-soft sm:flex-row sm:items-center sm:gap-4">
              <p>Pix, cartão ou boleto. Liberação automática depois do pagamento aprovado.</p>
              {OFERTA.fimLancamento && (
                <p className="sm:ml-auto">
                  Preço de lançamento termina em <strong className="text-tinta"><Contador fim={OFERTA.fimLancamento} compacto /></strong>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Garantia e privacidade */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-tinta">Teste por 7 dias. Se não servir, devolvemos tudo.</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">Use, gere seus documentos e, se achar que não vale, peça o reembolso pela plataforma de pagamento. Você recebe 100% de volta, sem precisar explicar.</p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-tinta">Os dados dos seus pacientes ficam com você.</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">O documento é montado no seu navegador e o que você digita não é guardado por nós. Na melhoria de redação com IA, o nome do paciente é trocado por um marcador antes de sair do seu computador.</p>
            </div>
          </div>
        </section>

        {/* Perguntas */}
        <section id="perguntas" className="scroll-mt-20 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta sm:text-4xl">Perguntas frequentes</h2>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {PERGUNTAS.map(({ q, r }) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-tinta focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-carimbo">
                    {q}
                    <span className="text-2xl leading-none text-carimbo transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Fechamento */}
        <section className="bg-tinta py-20 text-white sm:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">O próximo documento pode ficar pronto em 5 minutos.</h2>
              <p className="mt-4 text-lg text-white/75">A partir de R$ {OFERTA.preco}, com 7 dias de garantia.</p>
            </div>
            <a href="#planos" className="btn btn-claro shrink-0">Ver os planos</a>
          </div>
        </section>
      </main>

      <footer className="bg-tinta px-4 pb-24 pt-2 text-sm text-white/60 md:pb-10">
        <div className="mx-auto max-w-5xl space-y-3 border-t border-white/10 pt-8">
          <Marca claro />
          <p className="max-w-3xl">O Laudo Pronto é uma ferramenta de apoio à redação. Não tem vínculo com o Conselho Federal de Psicologia. A elaboração, a revisão e a assinatura dos documentos são de responsabilidade do(a) profissional.</p>
          <p>Suporte: <a className="underline" href={`mailto:${OFERTA.suporte}`}>{OFERTA.suporte}</a></p>
        </div>
      </footer>

      <BarraFixa />
      <PopupSaida />
    </>
  );
}
