/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", ...fontFamily.sans],
      },
      colors: {
        alt: "#f2f2f2",
        textColor: "#0c0c0c",
        primary: "#FCD3BC",
        secondary: "#B8E0FF",
        success: "#AEFFBE",
      },
    },
  },
  plugins: [],
}
