"use client";
import { useRef, useState } from "react";

export function Vsl() {
  const ref = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);
  const tocar = () => {
    ref.current?.play();
    setTocando(true);
  };
  return (
    <div className="relative overflow-hidden rounded-[22px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-25px_rgba(23,35,56,.6)]">
      <video
        ref={ref}
        className="aspect-video w-full"
        src="/vsl.mp4"
        poster="/vsl-poster.jpg"
        playsInline
        preload="metadata"
        controls={tocando}
        onPlay={() => setTocando(true)}
        onEnded={() => setTocando(false)}
      />
      {!tocando && (
        <button
          onClick={tocar}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition hover:bg-ink/10"
          aria-label="Assistir ao vídeo de 35 segundos"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-ink text-marca shadow-[0_4px_0_#000] transition group-hover:scale-105">
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </span>
          <span className="rounded-full bg-ink/80 px-4 py-1.5 text-sm font-semibold">Veja funcionando em 35 segundos</span>
        </button>
      )}
    </div>
  );
}
