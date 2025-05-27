module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9ecdf1',
        secondary: '#5fc163',
        noir: '#2b2729',
        ivoire: '#dee6ca',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Move this outside of theme
}