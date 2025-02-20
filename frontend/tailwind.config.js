/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfd',
          100: '#ccfbfb',
          200: '#99f6f6',
          300: '#5cefef',
          400: '#2ce7e7',
          500: '#00B5B5',
          600: '#009999',
          700: '#007a7a',
          800: '#005c5c',
          900: '#003e3e',
        },
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};