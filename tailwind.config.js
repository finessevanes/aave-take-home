/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-100': '#E9B6C7',
        'gradient-200': '#8F2A4B',
        'gradient-250': '#72223c',
        'gradient-300': '#060A1F',
        'gradient-350': '#1e2235'
      },
    },
  },
  plugins: [],
}
