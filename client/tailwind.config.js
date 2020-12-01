module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
