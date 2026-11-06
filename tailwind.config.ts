import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#172338", soft: "#47546B", faint: "#8A94A6" },
        mist: "#EDF0F5",
        line: "#D6DCE6",
        marca: { DEFAULT: "#FFD84D", deep: "#F2C200", light: "#FFF3C2" },
        seal: { DEFAULT: "#0B8A7A", light: "#DDF3EF" },
        alert: "#E0483E",
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque Variable"', "system-ui", "sans-serif"],
        doc: ['"Source Serif 4 Variable"', "Georgia", "serif"],
      },
      keyframes: {
        surgir: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        pulsoCta: {
          "0%": { boxShadow: "0 4px 0 #C99F00, 0 0 0 0 rgba(255,216,77,.75)" },
          "70%": { boxShadow: "0 4px 0 #C99F00, 0 0 0 18px rgba(255,216,77,0)" },
          "100%": { boxShadow: "0 4px 0 #C99F00, 0 0 0 0 rgba(255,216,77,0)" },
        },
        brilho: { "0%": { transform: "translateX(-120%) skewX(-20deg)" }, "60%,100%": { transform: "translateX(320%) skewX(-20deg)" } },
        piscar: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        batida: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.06)" } },
        digito: { from: { transform: "translateY(-40%)", opacity: ".2" }, to: { transform: "none", opacity: "1" } },
        faixa: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        surgir: "surgir .7s cubic-bezier(.2,.7,.2,1) both",
        pulsoCta: "pulsoCta 2s ease-out infinite",
        brilho: "brilho 3.2s ease-in-out infinite",
        piscar: "piscar 1.2s ease-in-out infinite",
        batida: "batida 1.6s ease-in-out infinite",
        digito: "digito .35s ease-out",
        faixa: "faixa 28s linear infinite",
      },
      boxShadow: {
        paper: "0 1px 0 #D6DCE6, 0 18px 40px -18px rgba(23,35,56,.35)",
        cta: "0 4px 0 #C99F00",
      },
    },
  },
  plugins: [],
} satisfies Config;
