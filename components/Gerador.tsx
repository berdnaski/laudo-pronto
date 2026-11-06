"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Folha } from "@/components/Folha";
import { PerfilForm } from "@/components/PerfilForm";
import { modeloPorSlug, type Campo } from "@/lib/documentos";
import { baixarWord } from "@/lib/exportar";
import { usePerfil } from "@/lib/perfil";
import { OFERTA } from "@/lib/config";

type EstadoIA = { campo: string | null; erro: string | null; restantes: number | null; assinar: boolean };

export function Gerador({ slug, planoIA }: { slug: string; planoIA: boolean }) {
  const modelo = modeloPorSlug(slug)!;
  const { perfil, salvar, carregado, completo } = usePerfil();
  const [valores, setValores] = useState<Record<string, string>>({});
  const [ia, setIa] = useState<EstadoIA>({ campo: null, erro: null, restantes: null, assinar: false });
  const [baixando, setBaixando] = useState(false);
  const [editandoPerfil, setEditandoPerfil] = useState(false);

  const doc = useMemo(() => modelo.montar(valores, perfil), [modelo, valores, perfil]);
  const faltando = modelo.campos.filter((c) => c.obrigatorio && !valores[c.id]?.trim());

  const muda = (id: string, v: string) => setValores((s) => ({ ...s, [id]: v }));

  async function melhorar(campo: Campo) {
    const original = valores[campo.id] || "";
    // Dados que identificam o paciente nunca saem do navegador: viram marcadores.
    const sensiveis = modelo.campos
      .filter((c) => c.identifica && valores[c.id]?.trim())
      .map((c) => ({ marcador: c.id === "responsavel" ? "[RESPONSÁVEL]" : "[PACIENTE]", valor: valores[c.id].trim() }));
    let texto = original;
    for (const s of sensiveis) texto = texto.split(s.valor).join(s.marcador);

    setIa({ campo: campo.id, erro: null, restantes: ia.restantes, assinar: false });
    try {
      const r = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelo: modelo.slug, campo: campo.id, texto }),
      });
      const json = await r.json();
      if (!r.ok) {
        setIa({ campo: null, erro: json.erro, restantes: 0, assinar: Boolean(json.assinar) });
        return;
      }
      let novo: string = json.texto;
      for (const s of sensiveis) novo = novo.split(s.marcador).join(s.valor);
      muda(campo.id, novo);
      setIa({ campo: null, erro: null, restantes: json.restantes, assinar: false });
    } catch {
      setIa({ campo: null, erro: "Sem conexão com a IA. Verifique sua internet e tente de novo.", restantes: ia.restantes, assinar: false });
    }
  }

  async function word() {
    setBaixando(true);
    try {
      await baixarWord(doc, perfil, `${modelo.slug}-${new Date().toISOString().slice(0, 10)}`);
    } finally {
      setBaixando(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)]">
      {/* Formulário */}
      <div className="nao-imprime">
        <Link href="/app" className="mb-4 inline-block text-sm font-semibold text-ink-soft hover:text-ink">
          ← Todos os documentos
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight">{modelo.nome}</h1>
        <p className="mt-1 text-ink-soft">{modelo.resumo}</p>

        {carregado && (!completo || editandoPerfil) ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-marca-deep bg-marca-light/60 p-5">
            <p className="mb-3 font-bold">Seus dados de assinatura</p>
            <PerfilForm
              inicial={perfil}
              onSalvar={(p) => {
                salvar(p);
                setEditandoPerfil(false);
              }}
            />
          </div>
        ) : (
          carregado && (
            <p className="mt-4 text-sm text-ink-soft">
              Assinando como <strong className="text-ink">{perfil.nome}</strong>, CRP {perfil.crp}.{" "}
              <button onClick={() => setEditandoPerfil(true)} className="font-semibold underline underline-offset-2">
                Alterar
              </button>
            </p>
          )
        )}

        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          {modelo.campos.map((c) => (
            <div key={c.id}>
              <label htmlFor={c.id} className="rotulo">
                {c.rotulo} {c.obrigatorio && <span className="text-alert">*</span>}
              </label>
              {c.dica && <p className="-mt-1 mb-1.5 text-xs text-ink-soft">{c.dica}</p>}
              {c.tipo === "area" ? (
                <textarea id={c.id} rows={4} className="campo resize-y" placeholder={c.exemplo} value={valores[c.id] || ""} onChange={(e) => muda(c.id, e.target.value)} />
              ) : c.tipo === "opcoes" ? (
                <select id={c.id} className="campo" value={valores[c.id] || ""} onChange={(e) => muda(c.id, e.target.value)}>
                  <option value="">Selecione</option>
                  {c.opcoes!.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input id={c.id} type={c.tipo === "data" ? "date" : "text"} className="campo" placeholder={c.exemplo} value={valores[c.id] || ""} onChange={(e) => muda(c.id, e.target.value)} />
              )}
              {c.ia && (
                <button
                  type="button"
                  disabled={!valores[c.id]?.trim() || ia.campo !== null}
                  onClick={() => melhorar(c)}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {ia.campo === c.id ? "Melhorando a redação…" : "✦ Melhorar redação com IA"}
                </button>
              )}
            </div>
          ))}
        </form>

        {ia.erro && (
          <div role="alert" className="mt-5 rounded-xl border border-alert/30 bg-alert/5 p-4 text-sm">
            <p className="font-semibold">{ia.erro}</p>
            {ia.assinar && OFERTA.checkoutIA && (
              <a href={OFERTA.checkoutIA} className="cta cta-sm mt-3">
                Liberar IA ilimitada
              </a>
            )}
          </div>
        )}
        {ia.restantes !== null && !ia.erro && (
          <p className="mt-4 text-sm text-ink-soft">
            {planoIA ? `${ia.restantes} melhorias restantes este mês.` : `${ia.restantes} melhorias de teste restantes.`}
          </p>
        )}
        <p className="mt-6 text-xs leading-relaxed text-ink-faint">
          Nome e dados que identificam o paciente não são enviados à IA nem salvos em nenhum servidor: o documento é montado no seu navegador.
        </p>
      </div>

      {/* Prévia */}
      <div>
        <div className="nao-imprime sticky top-4 z-10 mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-ink p-3 text-white shadow-paper">
          <button onClick={word} disabled={baixando} className="cta cta-sm">
            {baixando ? "Gerando…" : "Baixar em Word"}
          </button>
          <button onClick={() => window.print()} className="rounded-xl border border-white/30 px-5 py-3 font-bold hover:bg-white/10">
            Salvar em PDF
          </button>
          <p className="ml-auto text-sm text-white/70">
            {faltando.length ? `Faltam ${faltando.length} campo${faltando.length > 1 ? "s" : ""} obrigatório${faltando.length > 1 ? "s" : ""}` : "Pronto para revisar e assinar"}
          </p>
        </div>
        <Folha doc={doc} prof={perfil} />
        <p className="nao-imprime mx-auto mt-4 max-w-[720px] text-center text-xs text-ink-faint">
          Revise o texto antes de assinar. A responsabilidade técnica pelo documento é do(a) profissional que o assina.
        </p>
      </div>
    </div>
  );
}
