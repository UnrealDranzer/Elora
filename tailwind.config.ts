import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F6F3EE',
        foreground: '#1A1A1A',
        muted: '#ECE7DE',
        'muted-foreground': '#6B6560',
        card: '#FAF8F4',
        'card-muted': '#ECE7DE',
        border: '#DDD6CB',
        primary: '#1A1A1A',
        'primary-foreground': '#F6F3EE',
        sage: '#A8B29A',
        ivory: '#F6F3EE',
        warm: '#ECE7DE',
        charcoal: '#1A1A1A'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(26, 26, 26, 0.06)',
        card: '0 24px 80px rgba(26, 26, 26, 0.08)',
        float: '0 40px 100px rgba(26, 26, 26, 0.12)'
      },
      animation: {
        'trust-scroll': 'trust-scroll 28s linear infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards'
      },
      keyframes: {
        'trust-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
};

export default config;
