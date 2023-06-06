/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito:['Nunito'],
        rubik: ['Rubik Puddles'],
        shadows: ['Shadows Into Light']
      },
    },
  
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}

