/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height:{
        '7vh': '7vh',
        '30vh': '30vh',
        '63vh': '63vh',
        '10p' : '10%',
        '85p' : '85%',
        '90p' : '90%',
      },
      width:{
        '85vw': '85vw',
        '95p': '95%',
      },
      colors:{
        bgPink: '#fdebf1',
        darkPink: '#F8BDD1'
      }
    },
  },
  plugins: [],
}

