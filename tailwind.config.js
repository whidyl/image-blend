module.exports = {
  purge: [], //'./src/**/*.{js,jsx,ts,tsx}', './public/index.html'
  darkMode: false, // or 'media' or 'class'
  theme: {
    scale: {
      '1000': '100',
    },
    extend: {
      animation: {
        'dropdown' : 'dropdown 3s linear forwards',
      },
      keyframes: {
        'dropdown' : {
          '0%' : {maxHeight: '0'},
          '100%': {maxHeight: '500px'},
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
