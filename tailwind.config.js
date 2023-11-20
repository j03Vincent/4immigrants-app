/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["'./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black1: "rgba(0,0,0,0.8)",
        banner: "#F2E8E1",
      },
      fontFamily: {
        title: `gt-super, Georgia, Cambria, Times New Roman, Times, serif;`,
        texts: `sohne, Helvetica Neue, Helvetica, Arial, sans-serif`,

      },
      gridTemplateColumns: {
        card: "repeat(auto-fit, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
}