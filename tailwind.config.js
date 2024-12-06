/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#f1f7ff",
          100: "#d9e7ff",
          200: "#a9c6ff",
          300: "#7aa5ff",
          400: "#4a84ff",
          500: "#1b75d0",
          600: "#1a68b8",
          700: "#16589a",
          800: "#12477b",
          900: "#0e3760",
        },
        red: {
          50: "#ffebee",
          100: "#ffcdd2",
          200: "#ef9a9a",
          300: "#e57373",
          400: "#ef5350",
          500: "#f44336",
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
        appGray: {
          25: "#f7f8f9",
          35: "#f0f2f4",
          50: "#dfe2e4",
          100: "#9ca4aa",
          200: "#7b858f",
          300: "#5a666f",
          400: "#39464f",
          500: "#0c0d0e",
          600: "#0a0b0c",
          700: "#08090a",
          800: "#060708",
          900: "#040506",
        },
        appBlack: "#0c0d0e",
        appOrange: "#ff7e0e",
        appOrangeDark: "#9b4216",

        buttonGray: "#3b4045",
      },
    },
  },
  plugins: [typography, flowbite.plugin()],
};
