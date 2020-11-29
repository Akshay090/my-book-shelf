module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-1": "#333",
      },
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
