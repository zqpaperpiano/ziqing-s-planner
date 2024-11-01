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
        '5p' : '5%',
      },
      width:{
        '85vw': '85vw',
        '95p': '95%',
        '85p' : '85%',
        '30p' : '30%',
        '10p':'10%',
      },
      colors:{
        bgPink: '#fdebf1',
        darkPink: '#F8BDD1',
        contrastGree: '#BDF8E4',
      }
    },
  },
  plugins: [],
}

