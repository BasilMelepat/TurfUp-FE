import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10b043",
        "primary-focus": "#10b043",
      },
      fontFamily: {
        sans: ["Barlow", "system-ui", "sans-serif"],
        display: ['"Barlow Condensed"', "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(22px) scale(.97)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        rise: "rise .5s cubic-bezier(.2,.7,.2,1) backwards",
      },
      backgroundImage: {
        banner: "url('/r.png')",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          primary: "#10b043",
          "primary-content": "#ffffff",
          secondary: "#0b8a33",
          "secondary-content": "#ffffff",
          accent: "#4ade80",
          "accent-content": "#052e14",
          neutral: "#14281d",
          "neutral-content": "#e8f1ea",
          "base-100": "#ffffff",
          "base-200": "#f3f7f4",
          "base-300": "#e1eae3",
          "base-content": "#14231b",
          info: "#4ade80",
          "info-content": "#052e14",
          success: "#16a34a",
          "success-content": "#ffffff",
        },
        dark: {
          "color-scheme": "dark",
          primary: "#3ddc84",
          "primary-content": "#05200f",
          secondary: "#16a34a",
          "secondary-content": "#ffffff",
          accent: "#86efac",
          "accent-content": "#052e14",
          neutral: "#1d2b23",
          "neutral-content": "#e8f1ea",
          "base-100": "#16211b",
          "base-200": "#111b16",
          "base-300": "#0d1511",
          "base-content": "#e8f1ea",
          info: "#4ade80",
          "info-content": "#052e14",
          success: "#3ddc84",
          "success-content": "#05200f",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
};
