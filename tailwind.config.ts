import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Área logada (mantida)
        ink: { DEFAULT: "#172338", soft: "#47546B", faint: "#8A94A6" },
        mist: "#EDF0F5",
        line: "#D6DCE6",
        marca: { DEFAULT: "#FFD84D", deep: "#F2C200", light: "#FFF3C2" },
        seal: { DEFAULT: "#0B8A7A", light: "#DDF3EF" },
        alert: "#E0483E",
        // Página de vendas: tinta de carimbo, papel e aprovação
        carimbo: { DEFAULT: "#2F3FD0", deep: "#2332A8", light: "#E8EAFB" },
        tinta: "#0F1B33",
        papel: "#F2F4F7",
        aprovado: { DEFAULT: "#0E8F6B", light: "#DDF3EA" },
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', "system-ui", "sans-serif"],
        doc: ['"Source Serif 4 Variable"', "Georgia", "serif"],
      },
      keyframes: {
        surgir: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        pulsoCta: {
          "0%": { boxShadow: "0 4px 0 #C99F00, 0 0 0 0 rgba(255,216,77,.75)" },
          "60%,100%": { boxShadow: "0 4px 0 #C99F00, 0 0 0 14px rgba(255,216,77,0)" },
        },
        piscar: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        batida: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.03)" } },
        digito: { from: { transform: "translateY(-40%)", opacity: ".2" }, to: { transform: "none", opacity: "1" } },
        faixa: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        carimbar: {
          "0%": { opacity: "0", transform: "rotate(-9deg) scale(1.7)" },
          "55%": { opacity: ".95", transform: "rotate(-9deg) scale(.96)" },
          "100%": { opacity: ".92", transform: "rotate(-9deg) scale(1)" },
        },
      },
      animation: {
        surgir: "surgir .7s cubic-bezier(.2,.7,.2,1) both",
        pulsoCta: "pulsoCta 4s ease-out infinite",
        piscar: "piscar 2.4s ease-in-out infinite",
        batida: "batida 3.5s ease-in-out infinite",
        digito: "digito .35s ease-out",
        faixa: "faixa 140s linear infinite",
        carimbar: "carimbar .38s cubic-bezier(.3,.7,.3,1) both",
      },
      boxShadow: {
        paper: "0 1px 0 #D6DCE6, 0 18px 40px -18px rgba(23,35,56,.35)",
        cta: "0 4px 0 #C99F00",
        folha: "0 1px 2px rgba(15,27,51,.08), 0 24px 48px -20px rgba(15,27,51,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
