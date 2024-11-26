/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  content: ['./project/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Imperial: ["Imperial", "sans-serif"],
        RobotoCondensed: ["Roboto Condensed"],
      },
      colors: {
        primary: "rgba(var(--primary))",
        secondary: "rgba(var(--secondary))",
    
        primary_text: "rgba(var(--primary_text))",
        secondary_text:"rgba(var(--secondary_text))",
      },
      dropShadow: {
        "custom-shadow": "4px 4px 4px rgb(0 0 0 / 0.1)"
      },
      rounded: {
        "custom-rounded": "4px",
      }
    },
  },
}