import { Marca } from "@/components/Marca";
import { BarraFixa } from "@/components/vendas/BarraFixa";
import { Contador } from "@/components/vendas/Contador";
import { DemoAoVivo } from "@/components/vendas/DemoAoVivo";
import { Revelar } from "@/components/vendas/Revelar";
import { Vsl } from "@/components/vendas/Vsl";
import { OFERTA } from "@/lib/config";
import { MODELOS } from "@/lib/documentos";

const essenciais = MODELOS.filter((m) => m.pacote === "essencial");

function Cta({ texto = `Quero o Laudo Pronto por R$ ${OFERTA.preco}`, className = "" }: { texto?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <a href={OFERTA.checkout} className="cta cta-vivo w-full max-w-md text-center">{texto}</a>
      <p className="text-center text-sm text-ink-soft">Pagamento único · Acesso na hora · 7 dias de garantia</p>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <svg className="mt-1 shrink-0" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="10" fill="#DDF3EF" />
        <path d="M5.5 10.5l3 3 6-7" stroke="#0B8A7A" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

const PERGUNTAS = [
  {
    q: "Os documentos seguem a Resolução CFP nº 06/2019?",
    r: "Sim. Declaração, atestado, relatório, laudo e parecer seguem a estrutura e os itens obrigatórios da resolução, incluindo identificação, finalidade e o aviso de uso restrito. Você revisa o texto e assina: a responsabilidade técnica continua sendo sua, como manda o Código de Ética.",
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

export default function Vendas() {
  return (
    <>
      {/* Faixa de lançamento */}
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white">
        <span className="h-2.5 w-2.5 animate-piscar rounded-full bg-alert" aria-hidden="true" />
        Preço de lançamento: R$ {OFERTA.preco}, pagamento único
        {OFERTA.fimLancamento && (
          <span className="rounded-md bg-marca px-2 py-0.5 text-ink">
            termina em <Contador fim={OFERTA.fimLancamento} compacto />
          </span>
        )}
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Marca />
        <a href="/entrar" className="text-sm font-semibold underline underline-offset-4">Já comprei</a>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-4 text-center sm:px-6">
          <p className="mx-auto mb-5 inline-flex animate-surgir rounded-full border border-seal/30 bg-seal-light px-4 py-1.5 text-sm font-semibold text-seal">
            Para psicólogas e psicólogos com CRP ativo
          </p>
          <h1 style={{ animationDelay: "120ms" }} className="animate-surgir text-[2.3rem] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            Pare de perder a noite escrevendo documento. <span className="grifo grifo-animado">Preencha, revise e assine em 5 minutos.</span>
          </h1>
          <p style={{ animationDelay: "260ms" }} className="mx-auto mt-6 max-w-2xl animate-surgir text-lg text-ink-soft sm:text-xl">
            O Laudo Pronto monta declaração, atestado, relatório, encaminhamento e anamnese no formato da Resolução CFP nº 06/2019, com seus dados de assinatura, prontos para baixar em Word ou PDF.
          </p>
          <div style={{ animationDelay: "400ms" }} className="mx-auto mt-10 max-w-3xl animate-surgir">
            <Vsl />
          </div>
          <Cta className="mt-9" />
        </section>

        {/* Faixa de benefícios em movimento */}
        <div className="overflow-hidden border-y-2 border-ink bg-marca py-3" aria-hidden="true">
          <div className="flex w-max animate-faixa gap-10 whitespace-nowrap text-lg font-extrabold text-ink">
            {[0, 1].map((k) => (
              <div key={k} className="flex gap-10 pr-10">
                {["Acesso na hora", "Padrão Resolução CFP 06/2019", "Word e PDF", "Seu CRP já no documento", "7 dias de garantia", "Pix aprova na hora", "Pagamento único"].map((t) => (
                  <span key={t} className="flex items-center gap-10">{t}<span className="text-seal">✦</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dor */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Você já viveu essa cena</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>O último paciente saiu, já passou das 21h e ainda tem um relatório para entregar amanhã cedo.</p>
              <p>Você abre um documento antigo, troca o nome, apaga o que não serve e fica com aquela dúvida: <strong className="text-ink">será que está no formato que o CFP pede?</strong> Falta a finalidade? Precisa do aviso de uso restrito? Onde vai o CRP?</p>
              <p>A faculdade não ensinou a escrever documento. E <span className="grifo text-ink">um documento mal elaborado pode virar processo ético</span>, mesmo quando o atendimento foi impecável.</p>
              <p className="font-semibold text-ink">O Laudo Pronto existe para essa parte do seu trabalho levar minutos, não a sua noite.</p>
            </div>
            <Cta className="mt-10" texto="Quero meus documentos prontos" />
          </div>
        </section>

        {/* Demo */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Digite um nome e veja a declaração se montar sozinha</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink-soft">Isso aqui não é um vídeo. É o próprio sistema rodando na página.</p>
            <Revelar className="mt-12"><DemoAoVivo /></Revelar>
            <Cta className="mt-12" />
          </div>
        </section>

        {/* Como funciona */}
        <section className="bg-ink py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Do atendimento ao documento assinado</h2>
            <Revelar><ol className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ["Escolha o documento", "Declaração, atestado, relatório, encaminhamento ou anamnese."],
                ["Preencha os campos guiados", "Cada campo diz o que a resolução espera. A prévia aparece ao lado enquanto você digita."],
                ["Baixe e assine", "Word para ajustar o que quiser, ou PDF pronto para imprimir. Seu nome e CRP já vão no lugar certo."],
              ].map(([t, d], i) => (
                <li key={t} style={{ transitionDelay: `${i * 150}ms` }} className="rounded-3xl border border-white/15 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marca text-lg font-extrabold text-ink">{i + 1}</span>
                  <h3 className="mt-5 text-xl font-bold">{t}</h3>
                  <p className="mt-2 text-white/75">{d}</p>
                </li>
              ))}
            </ol></Revelar>
            <div className="mt-12 flex justify-center">
              <a href={OFERTA.checkout} className="cta cta-vivo">Começar agora por R$ {OFERTA.preco}</a>
            </div>
          </div>
        </section>

        {/* O que vem */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Os 5 documentos que você mais escreve</h2>
            <Revelar className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {essenciais.map((m) => (
                <div key={m.slug} className="rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{m.nome}</h3>
                    {m.oficial && <span className="shrink-0 rounded-md bg-seal-light px-2 py-0.5 text-xs font-semibold text-seal">Res. CFP 06/2019</span>}
                  </div>
                  <p className="mt-2 text-ink-soft">{m.resumo}</p>
                </div>
              ))}
              <div className="flex flex-col justify-center rounded-2xl bg-marca p-6">
                <h3 className="text-lg font-extrabold">E mais na área de membros</h3>
                <p className="mt-2 text-ink/80">Contratos, TCLE, laudo, parecer e evolução podem ser adicionados quando você precisar.</p>
              </div>
            </Revelar>
            <Cta className="mt-12" />
          </div>
        </section>

        {/* Comparação */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Modelo pronto em Word não resolve o problema</h2>
            <Revelar className="mt-12 overflow-hidden rounded-3xl border border-line">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-mist text-sm">
                    <th className="p-4 font-semibold sm:p-5"></th>
                    <th className="p-4 font-semibold text-ink-soft sm:p-5">Kit de modelos em Word</th>
                    <th className="bg-ink p-4 font-bold text-white sm:p-5">Laudo Pronto</th>
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
                      <th className="p-4 font-semibold sm:p-5">{l}</th>
                      <td className="p-4 text-ink-soft sm:p-5">{a}</td>
                      <td className="bg-seal-light/50 p-4 font-semibold sm:p-5">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Revelar>
            <Cta className="mt-12" texto="Quero sair do Word hoje" />
          </div>
        </section>

        {/* Oferta */}
        <section id="oferta" className="scroll-mt-6 py-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <Revelar><div className="relative rounded-[28px] border-4 border-ink bg-white p-8 shadow-[10px_10px_0_#172338] sm:p-10">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-alert px-4 py-1 text-sm font-bold text-white"><span className="inline-block animate-batida">Preço de lançamento</span></span>
              <h2 className="text-center text-2xl font-extrabold">Laudo Pronto: acesso essencial</h2>
              <ul className="mt-7 space-y-3 text-[17px]">
                <Check>Gerador de declaração, atestado, relatório, encaminhamento e anamnese</Check>
                <Check>Estrutura da Resolução CFP nº 06/2019</Check>
                <Check>Download em Word e PDF, quantas vezes quiser</Check>
                <Check>Seu nome, CRP e cidade preenchidos automaticamente</Check>
                <Check>3 melhorias de redação com IA para testar</Check>
                <Check>Acesso vitalício a esta versão</Check>
              </ul>
              <div className="mt-8 text-center">
                <p className="text-sm text-ink-soft">Tudo isso por um pagamento único de</p>
                <p className="mt-1 inline-block animate-batida text-6xl font-extrabold tracking-tight">
                  <span className="align-top text-2xl">R$</span>{OFERTA.preco}
                </p>
                {OFERTA.parcelas && <p className="mt-1 text-ink-soft">{OFERTA.parcelas}</p>}
              </div>
              {OFERTA.fimLancamento && (
                <div className="mt-6 flex flex-col items-center gap-2">
                  <p className="text-sm font-semibold">O preço de lançamento termina em</p>
                  <Contador fim={OFERTA.fimLancamento} />
                </div>
              )}
              <a href={OFERTA.checkout} className="cta cta-vivo mt-8 w-full">Garantir meu acesso agora</a>
              <p className="mt-3 text-center text-sm text-ink-soft">Pix, cartão ou boleto · Liberação automática</p>
            </div></Revelar>
          </div>
        </section>

        {/* Garantia */}
        <section className="bg-white py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full border-4 border-dashed border-seal text-seal">
              <span className="text-4xl font-extrabold leading-none">7</span>
              <span className="text-xs font-bold">dias</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Teste por 7 dias. Se não servir, devolvemos tudo.</h2>
              <p className="mt-2 text-lg text-ink-soft">Use, gere seus documentos e, se achar que não vale, peça o reembolso pela plataforma de pagamento. Você recebe 100% de volta, sem perguntas.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
            <div className="mt-10 space-y-3">
              {PERGUNTAS.map(({ q, r }) => (
                <details key={q} className="group rounded-2xl border border-line bg-white p-5 open:shadow-paper">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                    {q}
                    <span className="text-2xl leading-none transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ink-soft">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-marca py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">O próximo relatório pode levar 5 minutos.</h2>
            <p className="mt-4 text-lg text-ink/80">Acesso imediato por R$ {OFERTA.preco}, com 7 dias de garantia.</p>
            {OFERTA.fimLancamento && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <p className="font-bold">O preço de lançamento acaba em</p>
                <Contador fim={OFERTA.fimLancamento} />
              </div>
            )}
            <a href={OFERTA.checkout} className="cta mt-8 bg-ink text-white shadow-[0_4px_0_#000] hover:bg-ink/90">Quero o Laudo Pronto agora</a>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-4 pb-24 pt-10 text-sm text-white/60 md:pb-10">
        <div className="mx-auto max-w-5xl space-y-3 text-center">
          <Marca claro />
          <p>O Laudo Pronto é uma ferramenta de apoio à redação. Não tem vínculo com o Conselho Federal de Psicologia. A elaboração, a revisão e a assinatura dos documentos são de responsabilidade do(a) profissional.</p>
          <p>Suporte: <a className="underline" href={`mailto:${OFERTA.suporte}`}>{OFERTA.suporte}</a></p>
        </div>
      </footer>

      <BarraFixa />
    </>
  );
}
