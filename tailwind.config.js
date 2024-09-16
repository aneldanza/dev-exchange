/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        blue: "#1b75d0",
        red: "#9c2121",
        appGray: {
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
  plugins: [],
};
