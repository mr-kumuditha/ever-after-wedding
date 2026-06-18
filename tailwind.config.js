/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4af37',  // PRIMARY GOLD
          600: '#b8960c',
          700: '#92740a',
          800: '#78610a',
          900: '#5c4a08',
        },
        ivory: {
          50:  '#fafaf8',
          100: '#f5f5f0',
          200: '#eeede6',
          300: '#e4e2d8',
          400: '#d6d3c4',
        },
        champagne: '#f7e7ce',
        blush: '#e8c5b0',
        obsidian: '#0a0a0a',
        charcoal: '#1a1a1a',
      },
      fontFamily: {
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'serif'],
        script:  ['"Great Vibes"', 'cursive'],
        sans:    ['"Montserrat"', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 1.2s ease-out forwards',
        'slide-up':   'slideUp 0.8s ease-out forwards',
        'shimmer':    'shimmer 2s infinite',
        'float':      'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%':      { boxShadow: '0 0 0 15px rgba(212,175,55,0)' },
        },
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #d4af37 0%, #f5e07a 50%, #d4af37 100%)',
        'dark-gradient':  'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-overlay':   'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
