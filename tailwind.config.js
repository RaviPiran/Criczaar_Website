/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#070B16', 900: '#0E1528', 800: '#16203A', 700: '#213054' },
        gold: { DEFAULT: '#F5A623', soft: '#FFD166', deep: '#C97F0A' },
        volt: { DEFAULT: '#3B82F6', soft: '#7CB3FF' },
        cyan: { DEFAULT: '#06B6D4', soft: '#67E8F9' },
        violet: { DEFAULT: '#8B5CF6', soft: '#C4B5FD' },
        crimson: { DEFAULT: '#F43F5E', soft: '#FDA4AF' },
        mute: '#9AA7C4',
        sold: '#10B981',
        alarm: '#FF6B6B',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 40px -8px rgba(245,166,35,.55)',
        volt: '0 0 40px -8px rgba(77,141,255,.5)',
        glass: '0 24px 60px -20px rgba(0,0,0,.65)',
      },
    },
  },
  plugins: [],
};
