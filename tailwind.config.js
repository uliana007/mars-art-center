module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Основная палитра
        lightBg: "#FFFFFF",
        darkBg: "#121212",
        lightText: "#1A1A1A",
        darkText: "#E0E0E0",
        accentBlue: "#0055FF",
        accentBlueDark: "#3399FF",
        cardLight: "#F5F5F5",
        cardDark: "#1E1E1E",
        hoverBlue: "#0048CC",
        hoverBlueDark: "#2288EE",
        // Дополнительно для градиентов и баджей
        violet: "#7B2FF2",
        blueGradient: "#0055FF",
        blueGradientDark: "#3399FF",
      },
      fontFamily: {
  sans: ['MyFont', 'Arial', 'sans-serif'],
  mont: ['MyFont', 'Arial', 'sans-serif'], // если хочешь заменить Montserrat
},
      borderRadius: {
        'badge': '7px',
        'card': '16px',
        'btn': '4px',
      },
      fontSize: {
        h1: ['32px', { lineHeight: '1.2', fontWeight: '700', fontFamily: 'Montserrat' }],
        h2: ['24px', { lineHeight: '1.25', fontWeight: '700', fontFamily: 'Montserrat' }],
        h3: ['18px', { lineHeight: '1.4', fontWeight: '600', fontFamily: 'Montserrat' }],
        btn: ['14px', { lineHeight: '1.3', fontWeight: '600', fontFamily: 'Montserrat' }],
        base: ['16px', { lineHeight: '1.6', fontWeight: '400', fontFamily: 'Open Sans' }],
        sm: ['14px', { lineHeight: '1.5', fontWeight: '400', fontFamily: 'Open Sans' }],
      },
      boxShadow: {
        card: '0 2px 12px 0 rgba(0, 85, 255, 0.06)',
        cardDark: '0 2px 12px 0 rgba(51,153,255,0.12)',
        btn: '0 2px 4px 0 rgba(0,85,255,0.08)',
      },
      animation: {
        'gradient-move': 'gradient-move 8s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      screens: {
        'xs': '480px', // для мобильных карточек
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}