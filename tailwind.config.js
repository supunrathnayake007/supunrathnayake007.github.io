/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xxs: '480px', // min-width
        xxxs: '300px',
      },
    },
  },
  plugins: [],
}
