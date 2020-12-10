const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {
      maxWidth: {
        16: "4rem",
        48: "12rem",
        36: "9rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
