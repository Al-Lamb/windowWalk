/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4A7C59',
        secondary: '#68B0AB',
        tertiary: '#8FC0A9',
        accent: '#C8D5B9',
        background: '#FAF3DD'
      }
    },
  },
  plugins: [],
};