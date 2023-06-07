/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "300px",
      tablet: "451px",
      // => @media (min-width: 640px) { ... }

      desktop: "961px",
      // => @media (min-width: 1024px) { ... }

      "desktop-l": "1440px",
      // => @media (min-width: 1280px) { ... }

      "desktop-4k": "2560px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
    fontFamily: {
      lora: ["Lora", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    colors: {
      emerald: "#50c878",
      jade: "#00a86b",
      greensea: "#2E8B57",
      gray: "#333333",
      white: "#ffff",
      transparent: colors.transparent,
      red: colors.red,
    },
  },
  plugins: [],
};
