/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ayurveda: {
          primary: '#2D5016',
          secondary: '#6B8E23',
          accent: '#8B7355',
          light: '#F5F0E8',
          beige: '#E8DCC4',
          brown: '#6B4423',
          green: '#4A6741',
        }
      }
    },
  },
  plugins: [],
}
