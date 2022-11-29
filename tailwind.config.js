/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "reflect": "6px 6px 0px rbga(0,0,0,0.2)",
      },
      fontFamily: {
        "cursive": ['Alex Brush'],
        "oswald": ['Oswald'],
        "kalam": ['Kalam']
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
