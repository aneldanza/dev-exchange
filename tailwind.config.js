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
        appGray: "#0c0d0e",
        buttonGray: "#3b4045",
      },
    },
  },
  plugins: [],
};
