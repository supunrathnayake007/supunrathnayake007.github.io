/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '4xl': '1920px',
        xxs: '480px', // min-width
        xxxs: '300px',
      },
      spacing: {
        18: '4.5rem', // Add your custom spacing value
      },
    },
  },
  plugins: [],
}
