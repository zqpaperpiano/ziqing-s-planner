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
        '40p': '40%',
        '30p':'30%',
        '180px': "180px",
        '85vh': '85vh',
        '60p': '60%',
        '15p': '15%',
        '80p': '80%',
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
        '5x': '500%',
        '15p': '15%',
        '180px': '180px',
        '14vw': '14vw', 
        '15vw': '15vw',
        '7vw': '7vw',

      },
      translate: {
        '20p': '20%',
        '40p': '40%', 
        '60p': '60%', 
        '80p': '80%',
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
        gradientEnd: '#E18D9B',
        bgBrown: '#ffebde'
      },
      gridTemplateColumns: {
        'grid-cols-26': 'repeat(26, minmax(0, 1fr))'
      },
      gridColumnStart: {
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
        '18': '18',
        '19': '19',
        '20': '20',
        '21': '21', 
        '22': '22',
        '23': '23',
        '24': '24',
        '25': '25',
      },
      screens: {
        'po': '937px',
        'qp': '900px',
        'bs': '712px',
        'hf': '550px',
      },
      maxHeight: {
        '1/2': "50%"
      },
      maxWidth: {
        '1/3': '33.33%'
      },
      fontFamily: {
        silkscreen: ['Silkscreen', 'cursive'],
        tiny5:  ['tiny5', 'sans-serif'],
        funnel: ['funnelsans', 'sans-serif'],

      },
    },
  },
  plugins: [],
}

