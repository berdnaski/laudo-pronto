"use client";
import { useRef, useState } from "react";
import type { Depoimento } from "@/lib/depoimentos";

function Avatar({ nome }: { nome: string }) {
  const iniciais = nome
    .replace(/^Exemplo\s*[—-]\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-roxo-soft text-sm font-bold text-roxo-deep" aria-hidden="true">
      {iniciais || "?"}
    </span>
  );
}

function Conversa({ d }: { d: Depoimento }) {
  return (
    <figure className="flex w-[300px] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-line bg-white sm:w-[340px]">
      <figcaption className="flex items-center gap-3 border-b border-line px-5 py-4">
        <Avatar nome={d.nome} />
        <span className="min-w-0">
          <span className="block truncate font-semibold text-tinta">{d.nome}</span>
          <span className="block text-[13px] text-ink-soft">
            CRP {d.crp}
            {d.cidade ? ` · ${d.cidade}` : ""}
          </span>
        </span>
      </figcaption>
      <div className="flex flex-1 flex-col gap-2 bg-papel px-4 py-5">
        <p className="mb-1 text-center text-[12px] text-ink-faint">{d.data}</p>
        {d.mensagens.map((m) => (
          <p key={m} className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-[14.5px] leading-snug text-tinta">
            {m}
          </p>
        ))}
        {d.resposta && (
          <p className="mt-1 max-w-[85%] self-end rounded-2xl rounded-br-md bg-roxo px-4 py-2.5 text-[14.5px] leading-snug text-white">
            {d.resposta}
          </p>
        )}
      </div>
    </figure>
  );
}

/** Mensagens reais de quem usa o produto. Some da página quando não há nenhuma. */
export function Depoimentos({ itens }: { itens: Depoimento[] }) {
  const trilho = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  if (!itens.length) return null;

  const mover = (passo: number) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const largura = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: passo * largura, behavior: "smooth" });
  };

  const aoRolar = () => {
    const el = trilho.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const largura = card ? card.offsetWidth + 20 : 320;
    setPos(Math.round(el.scrollLeft / largura));
  };

  return (
    <section className="bg-papel px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="titulo text-center">Quem já usa</h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-lg text-ink-soft">
          Mensagens de psicólogas e psicólogos que compraram o Laudo Pronto.
        </p>

        <div className="relative mt-12">
          <div
            ref={trilho}
            onScroll={aoRolar}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {itens.map((d, i) => (
              <Conversa key={`${d.nome}-${i}`} d={d} />
            ))}
          </div>

          {itens.length > 1 && (
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                onClick={() => mover(-1)}
                aria-label="Depoimento anterior"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-tinta transition-colors hover:border-roxo focus-visible:outline focus-visible:outline-4 focus-visible:outline-roxo-soft"
              >
                <span aria-hidden="true">←</span>
              </button>
              <span className="flex gap-1.5" aria-hidden="true">
                {itens.map((_, i) => (
                  <span key={i} className={`h-1.5 rounded-full transition-all ${i === pos ? "w-6 bg-roxo" : "w-1.5 bg-line"}`} />
                ))}
              </span>
              <button
                onClick={() => mover(1)}
                aria-label="Próximo depoimento"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-tinta transition-colors hover:border-roxo focus-visible:outline focus-visible:outline-4 focus-visible:outline-roxo-soft"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
