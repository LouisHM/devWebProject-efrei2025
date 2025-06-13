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
      
        flight: "#3b82f6",      
        cloud: "#10b981",       
        electricity: "#f59e0b",      
        total: "#8b5cf6",       

        "flight-light": "#93c5fd",
        "cloud-light": "#6ee7b7",
        "electricity-light": "#fde68a",
        "total-light": "#d8b4fe",

    },
      boxShadow: {
        secondary: '5px 5px 25px 5px rgba(0,0,0, 0.32)', 
      },
  },
},
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--color-flight": theme("colors.flight"),
          "--color-cloud": theme("colors.cloud"),
          "--color-electricity": theme("colors.electricity"),
          "--color-total": theme("colors.total"),

          "--color-flight-light": theme("colors.flight-light"),
          "--color-cloud-light": theme("colors.cloud-light"),
          "--color-electricity-light": theme("colors.electricity-light"),
          "--color-total-light": theme("colors.total-light"),
        },
      });
    },
  ],
}