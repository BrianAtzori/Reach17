/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "tablet": "451px",
      // => @media (min-width: 640px) { ... }

      "desktop": "961px",
      // => @media (min-width: 1024px) { ... }

      "desktop-l": "1440px",
      // => @media (min-width: 1280px) { ... }

      "desktop-4k": "2560px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
    fontFamily: {
      dosis: ["Dosis", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
    colors: {
      "palette-color-purple": "#A065BB",
      "palette-color-azure": "#39DDC4",
      "palette-color-red": "#F86A83",
      "palette-color-yellow": "#FFBA00",
      "palette-color-blue": "#646DC3",
      "palette-color-whitesmoke": "#F5F5F5",
      "palette-color-aliceblue": "#f0f8ff",
      "palette-color-light-blue": "#1e81b0",
      "palette-color-dark-blue": "#0c4a6e",
      "palette-color-darker": "#3c979f",
      "palette-color-dark": "#73b3b2",
      "palette-color-medium": "#aecfd0",
      "palette-color-light": "#bed9dd",
      "palette-color-lighter": "#deebec",
      transparent: colors.transparent,
      red: colors.red,
    },
  },
  plugins: [],
};
