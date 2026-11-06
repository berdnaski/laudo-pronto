"use client";
import { useEffect, useState } from "react";
import type { Profissional } from "@/lib/documentos";

const CHAVE = "laudo-pronto:perfil";
const VAZIO: Profissional = { nome: "", crp: "", cidade: "", contato: "" };

/** Dados do profissional ficam só neste navegador. */
export function usePerfil() {
  const [perfil, setPerfil] = useState<Profissional>(VAZIO);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE);
      if (salvo) setPerfil({ ...VAZIO, ...JSON.parse(salvo) });
    } catch {}
    setCarregado(true);
  }, []);

  const salvar = (p: Profissional) => {
    setPerfil(p);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(p));
    } catch {}
  };

  return { perfil, salvar, carregado, completo: Boolean(perfil.nome && perfil.crp && perfil.cidade) };
}
