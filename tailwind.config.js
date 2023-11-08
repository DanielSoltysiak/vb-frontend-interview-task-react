/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        "vb-black": "#333333",
        "vb-overlay": "rgba(51, 51, 51, 0.15)",
      },
    },
  },
  plugins: [],
};
