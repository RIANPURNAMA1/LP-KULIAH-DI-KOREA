import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#033378", light: "#1550b8", glow: "#2f6bff" },
        crimson: { DEFAULT: "#c60e31", dark: "#a30a28" },
        ink: { DEFAULT: "#020b1f", soft: "#061436", card: "#0a1b45" },
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
