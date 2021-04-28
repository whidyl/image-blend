module.exports = {
  purge: [], //'./src/**/*.{js,jsx,ts,tsx}', './public/index.html'
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'max-height' : 'max-height',
      },
      animation: {
        'dropdown' : 'dropdown 1s linear 1',
        'flip' : 'flip 0.2s linear 1 normal forwards ',
        'unflip': 'flip 0.2s linear 1 normal reverse backwards ',
      },
      keyframes: {
        'dropdown' : {
          '0%' : {maxHeight: '0'},
          '100%': {maxHeight: '500px'},
        },
        'flip' : {
          '0%' : {transform: 'rotate(0deg)'},
          '100%' : {transform: 'rotate(180deg)'},
        }
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'muidark': '#121212',
        'muidark-2': '#262626',
        'muidark-3': '#333333',
        'muidark-4' : '#404040',
        'muidark-5' : '#4d4d4d',
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
