/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#9ecdf1",
          secondary: "#5fc163",
          noir: "#2b2729",
          ivoire: "#dee6ca",
        },
      },
    },
    darkMode: 'class',
    plugins: [],
  }
  