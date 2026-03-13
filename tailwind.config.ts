import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          deep: "#1e1b4b",
          mid: "#312e81",
          soft: "#4338ca",
        },
        terra: {
          DEFAULT: "#c45c2e",
          light: "#e07a52",
          pale: "#f5e6dc",
        },
        cream: {
          DEFAULT: "#faf7f2",
          warm: "#f5efe6",
          dark: "#ede4d3",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e4c76b",
          dark: "#9d7f2e",
        },
        ink: "#1a1612",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
