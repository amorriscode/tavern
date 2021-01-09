module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-green': '#52FDC4',
        'brand-pink': '#C63696',
        'brand-purple': '#282140',
        'brand-black': '#0A0C0C',
        'brand-white': '#F2F9FF',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity:1 },
          '50%': { opacity:0 }
        }
      },
      animation: {
        blink: 'blink 1s ease-in-out infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
