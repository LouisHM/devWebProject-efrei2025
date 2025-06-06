module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
theme: {
  extend: {
    colors: {

      accent: '#facc15',
      noir: '#1a1a1a',
      light: '#f3f3f3',
      dark: '#000000',
      primary: '#91c54e',
      secondary: '#648e18',
      textlight: '#1e1e1e',
      textdark: '#f5f5f5',
    },
      boxShadow: {
        secondary: '5px 5px 25px 5px rgba(0,0,0, 0.32)', // couleur #5fc163
      },
  },
},
  plugins: [],
}