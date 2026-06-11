import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          secondary: "#111111",
          card: "#161616",
          input: "#1a1a1a",
          hover: "#1e1e1e",
        },
        border: {
          subtle: "#222222",
          default: "#2a2a2a",
          hover: "#3a3a3a",
        },
        text: {
          primary: "#e8e8e8",
          secondary: "#999999",
          muted: "#555555",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        blink: {
          "0%, 80%, 100%": { opacity: "0.2" },
          "40%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.3s ease-out forwards",
        blink: "blink 1.4s infinite both",
      },
    },
  },
  plugins: [],
};

export default config;
