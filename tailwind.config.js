/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        button: "#EDA415",
        header: "#003F62",
        inputBox:"#F4F8F5",
        discardButton:"#EEEEEE"
      },
    },
  },
  plugins: [],
}

