# Roteiro da VSL — Laudo Pronto (35 s)

O vídeo em `public/vsl.mp4` já está pronto, sem narração (as legendas carregam a mensagem, o que funciona bem com o som desligado no celular).
Se quiser gravar uma narração por cima, o texto abaixo cabe no tempo de cada cena.

| Tempo | Cena | Na tela | Narração (opcional) |
|---|---|---|---|
| 0:00–0:03 | Gancho | "21h07 · O último paciente acabou de sair." | "Nove da noite. O último paciente acabou de sair…" |
| 0:03–0:06 | Dor | "E ainda tem um relatório pra entregar amanhã cedo." | "…e ainda tem um relatório pra entregar amanhã cedo." |
| 0:06–0:10 | Dor | Documento rabiscado: "Abrir um documento antigo. Trocar o nome. E torcer pra estar no padrão do CFP." | "Aí você abre um documento antigo, troca o nome e torce pra estar no padrão do CFP." |
| 0:10–0:12 | Virada | "E se levasse 5 minutos?" + marca | "E se isso levasse cinco minutos?" |
| 0:12–0:25 | Demonstração | Sistema real: preenchendo o relatório, prévia se montando, IA ajustando a redação, botão Baixar em Word | "No Laudo Pronto você escolhe o documento, preenche os campos guiados e a prévia se monta na hora. A IA deixa a redação técnica sem inventar nada. Depois é só baixar em Word ou PDF e assinar." |
| 0:25–0:30 | Oferta | 5 documentos + R$ 27,90 pagamento único + 7 dias de garantia | "Declaração, atestado, relatório, encaminhamento e anamnese, por 27 e 90, pagamento único, com sete dias de garantia." |
| 0:30–0:35 | CTA | "Clique no botão abaixo deste vídeo." | "Clique no botão aqui embaixo e use hoje mesmo." |

## Como adicionar a narração

1. Grave o áudio (celular serve, num lugar silencioso) seguindo a tabela.
2. No CMD, dentro da pasta do projeto:

```
ffmpeg -i public\vsl.mp4 -i narracao.m4a -map 0:v -map 1:a -c:v copy -c:a aac -shortest public\vsl-narrada.mp4
```

3. Troque `/vsl.mp4` por `/vsl-narrada.mp4` em `components/vendas/Vsl.tsx`.

## Ideias de criativos a partir da VSL

- Corte 0:12–0:25 (só a demonstração) funciona sozinho como anúncio em Reels/Stories.
- O gancho das 21h07 vira o primeiro segundo de vários criativos: mude só a hora e o documento ("21h07 e o laudo ainda não saiu").
