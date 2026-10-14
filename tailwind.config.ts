import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#033378", light: "#1550b8", glow: "#2f6bff" },
        crimson: { DEFAULT: "#c60e31", dark: "#a30a28" },
        ink: { DEFAULT: "#020b1f", soft: "#061436", card: "#0a1b45" },
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-soft": "rgb(var(--card-soft) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        chip: "rgb(var(--chip) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
      keyframes: {
        "border-spin": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
      },
      animation: {
        "border-spin": "border-spin 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
