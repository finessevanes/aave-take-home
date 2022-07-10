/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-100': '#778daf',
        'gradient-200': '#7c70a0',
        'gradient-250': '#995299',
        'gradient-300': '#41236b',
        'gradient-350': '#321b52',
        'gradient-400': '#281642'
      },
    },
  },
  plugins: [],
}
