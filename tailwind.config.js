/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#0c0c0c",
        primary: "#FCD3BC",
        secondary: "#B8E0FF",
        success: "#AEFFBE",
      },
    },
  },
  plugins: [],
}
