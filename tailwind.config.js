/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'persona-blue': '#0614a8',
        'persona-navy': '#020b5c',
        'persona-cyan': '#00e5ff',
        'persona-red': '#e60012',
        'persona-dark': '#0a0a0a',
        'persona-gray': '#1e1e1e',
      },
      fontFamily: {
        head: ['"Black Han Sans"', 'sans-serif'],
        body: ['"Rajdhani"', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
