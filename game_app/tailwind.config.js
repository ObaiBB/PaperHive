/** @type {import('tailwindcss').Config} */



module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        ubunto: ["ubunto","serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  daisyui: {
    styled: true,
    themes: [
      {
        "light":{
          "primary": "#161B33",
          "secondary": "#6B7FD7",
          "accent": "#FFE066" ,
          
        }
      }
    ],
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
  plugins: [require('tailwindcss-animated'), require('daisyui')],
};