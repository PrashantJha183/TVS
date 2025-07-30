// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["'Nunito Sans'", "sans-serif"],
      },
      colors: {
        brandBlue: "#1D3D85",
        pureBlack: "#000000",
      },
      animation: {
        loader: "loader 5s linear forwards",
      },
      keyframes: {
        loader: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
