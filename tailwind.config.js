/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#050B1E',
          800: '#0A1431',
          700: '#101C40',
          600: '#18295A',
        },
        azure: {
          DEFAULT: '#2F7BFF',
          600: '#1F63E0',
        },
        aqua: '#00C2FF',
        gold: '#FFC247',
        mist: '#9FB0D6',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans: ['Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        drop: {
          '0%': { transform: 'translateY(-24px)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'translateY(170px)', opacity: '0' },
        },
        bubble: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '30%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-190px) scale(1)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        drop: 'drop 2.4s ease-in infinite',
        bubble: 'bubble 4s ease-in infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.45s ease-out both',
      },
    },
  },
  plugins: [],
};
