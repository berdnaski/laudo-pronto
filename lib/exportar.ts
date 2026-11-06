"use client";
import { AlignmentType, Document, Footer, Packer, PageNumber, Paragraph, TextRun } from "docx";
import type { Documento, Profissional } from "@/lib/documentos";

const FONTE = "Times New Roman";

export async function baixarWord(doc: Documento, prof: Profissional, nomeArquivo: string) {
  const corpo: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: doc.titulo.toUpperCase(), bold: true, font: FONTE, size: 28 })],
    }),
  ];

  for (const bloco of doc.blocos) {
    if (bloco.titulo) {
      corpo.push(
        new Paragraph({
          spacing: { before: 240, after: 80 },
          children: [new TextRun({ text: bloco.titulo, bold: true, font: FONTE, size: 24 })],
        }),
      );
    }
    for (const p of bloco.paragrafos) {
      const linhas = p.split("\n");
      corpo.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 120, line: 360 },
          children: linhas.flatMap((l, i) => [
            ...(i > 0 ? [new TextRun({ break: 1 })] : []),
            new TextRun({ text: l, font: FONTE, size: 24 }),
          ]),
        }),
      );
    }
  }

  corpo.push(
    new Paragraph({ spacing: { before: 900 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "_______________________________", font: FONTE, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: prof.nome || "[seu nome]", bold: true, font: FONTE, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `Psicólogo(a) — CRP ${prof.crp || "[00/00000]"}`, font: FONTE, size: 22 })] }),
  );
  if (prof.contato) {
    corpo.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: prof.contato, font: FONTE, size: 20 })] }));
  }
  if (doc.rodape) {
    corpo.push(new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: doc.rodape, italics: true, font: FONTE, size: 18 })] }));
  }

  const arquivo = new Document({
    sections: [
      {
        properties: { page: { margin: { top: 1418, bottom: 1418, left: 1701, right: 1134 } } },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: "Rubrica: ________   Página ", font: FONTE, size: 18 }),
                  new TextRun({ children: [PageNumber.CURRENT], font: FONTE, size: 18 }),
                  new TextRun({ text: " de ", font: FONTE, size: 18 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONTE, size: 18 }),
                ],
              }),
            ],
          }),
        },
        children: corpo,
      },
    ],
  });

  const blob = await Packer.toBlob(arquivo);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nomeArquivo}.docx`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
