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
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      "min-xl": { min: "1800px" },

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      "min-lg": { min: "1023px" },
      "min-md": { min: "821px" },

      md: { max: "820px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [],
}
