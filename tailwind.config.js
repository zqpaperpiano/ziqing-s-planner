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
        '70p':'70%',
        '50p':'50%',
        '30p':'30%',
        '180px': "180px",
        '85vh': '85vh',
      },
      width:{
        '85vw': '85vw',
        '95p': '95%',
        '85p' : '85%',
        '30p' : '30%',
        '10p':'10%',
        '70p': '70%',
        '40p': '40%',
        '60p': '60%',
        '50p':'50%',
        '2x': '200%',
        '3x': '300%',
        '15p': '15%',
        '180px': '180px',
        '14vw': '14vw', 
        '15vw': '15vw',
        '7.5vw': '7.5vw',
      },
      translate: {
        '20p': '20%'
      },
      colors:{
        bgPink: '#fdebf1',
        darkPink: '#F8BDD1',
        turqoiseGreen: '#BDF8E4',
        deepPink: '#D48BA3',
        mediumGray: '#9B9B9B',
        lightPink: '#F2AFC3',
        gradientStart: '#F8D6DF',
        gradientMid: '#EA99B0',
        gradientEnd: '#E18D9B'
      },
    },
  },
  plugins: [],
}

