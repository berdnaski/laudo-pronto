import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Área logada (mantida)
        ink: { DEFAULT: "#231C45", soft: "#645F7D", faint: "#9A96AD" },
        mist: "#F8F6FF",
        line: "#E8E4F5",
        marca: { DEFAULT: "#6B4DE6", deep: "#5A3AD6", light: "#F0ECFE" },
        seal: { DEFAULT: "#6B4DE6", light: "#F0ECFE" },
        alert: "#E0483E",
        // Página de vendas
        roxo: { DEFAULT: "#6B4DE6", deep: "#5A3AD6", soft: "#E4DCFD", light: "#F3F0FE" },
        tinta: "#231C45",
        papel: "#F8F6FF",
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk Variable"', "system-ui", "sans-serif"],
        doc: ['"Source Serif 4 Variable"', "Georgia", "serif"],
      },
      keyframes: {
        surgir: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
        piscar: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".35" } },
        digito: { from: { transform: "translateY(-40%)", opacity: ".2" }, to: { transform: "none", opacity: "1" } },
        carimbar: {
          "0%": { opacity: "0", transform: "rotate(-8deg) scale(1.6)" },
          "60%": { opacity: "1", transform: "rotate(-8deg) scale(.97)" },
          "100%": { opacity: "1", transform: "rotate(-8deg) scale(1)" },
        },
      },
      animation: {
        surgir: "surgir .7s cubic-bezier(.2,.7,.2,1) both",
        piscar: "piscar 2.4s ease-in-out infinite",
        digito: "digito .35s ease-out",
        carimbar: "carimbar .36s cubic-bezier(.3,.7,.3,1) both",
      },
      boxShadow: {
        paper: "0 1px 0 #E8E4F5, 0 18px 40px -18px rgba(35,28,69,.22)",
        folha: "0 2px 4px rgba(35,28,69,.05), 0 28px 60px -24px rgba(35,28,69,.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
