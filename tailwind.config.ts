import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        matte: "#0B0B0B",
        venom: "#7CFF00"
      },
      boxShadow: {
        venom: "0 0 24px rgba(124, 255, 0, 0.35)",
        "venom-lg": "0 0 80px rgba(124, 255, 0, 0.2)"
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(124,255,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,255,0,0.08) 1px, transparent 1px)"
      },
      animation: {
        glow: "glow 2.8s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        drift: "drift 18s linear infinite",
        shake: "shake 4s ease-in-out infinite"
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(124,255,0,0.0), 0 0 24px rgba(124,255,0,0.25)" },
          "50%": { boxShadow: "0 0 18px rgba(124,255,0,0.35), 0 0 42px rgba(124,255,0,0.18)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" }
        },
        drift: {
          from: { transform: "translate3d(-5%, -2%, 0)" },
          to: { transform: "translate3d(5%, 2%, 0)" }
        },
        shake: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "12%": { transform: "translate3d(-4px, 2px, 0)" },
          "24%": { transform: "translate3d(3px, -1px, 0)" },
          "36%": { transform: "translate3d(-2px, 1px, 0)" },
          "48%": { transform: "translate3d(2px, -2px, 0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
