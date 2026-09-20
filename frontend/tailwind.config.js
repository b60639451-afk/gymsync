/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#060810', surface: '#0D1117', elevated: '#111827', card: '#111520' },
        green:  { DEFAULT: '#00FF87' },
        violet: { DEFAULT: '#A855F7' },
        cyan:   { DEFAULT: '#22D3EE' },
      },
      fontFamily: {
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #00FF87 0%, #00C6FF 100%)',
        'grad-hero':    'linear-gradient(135deg, #00FF87 0%, #A855F7 100%)',
        'grad-violet':  'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
      },
      boxShadow: {
        'glow-green':  '0 0 32px rgba(0,255,135,0.25)',
        'glow-violet': '0 0 32px rgba(168,85,247,0.25)',
        'glow-cyan':   '0 0 32px rgba(34,211,238,0.25)',
        'card':        '0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset',
        'card-hover':  '0 16px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.08) inset',
      },
      animation: {
        'spin':       'spin 1s linear infinite',
        'pulse':      'pulse 2s ease-in-out infinite',
        'slide-up':   'slide-up 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-down': 'slide-down 0.35s ease-out forwards',
        'fade-in':    'fade-in 0.4s ease-out forwards',
        'float':      'float 7s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'blob-1':     'blob-1 12s ease-in-out infinite',
        'blob-2':     'blob-2 15s ease-in-out infinite',
      },
      keyframes: {
        'slide-up':   { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'slide-down': { from: { opacity: 0, transform: 'translateY(-12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'fade-in':    { from: { opacity: 0 }, to: { opacity: 1 } },
        'float':      { '0%, 100%': { transform: 'translateY(0) rotate(0deg)' }, '33%': { transform: 'translateY(-10px) rotate(1deg)' }, '66%': { transform: 'translateY(-5px) rotate(-1deg)' } },
        'shimmer':    { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(200%)' } },
        'blob-1':     { '0%, 100%': { transform: 'translate(0, 0) scale(1)' }, '33%': { transform: 'translate(30px, -40px) scale(1.05)' }, '66%': { transform: 'translate(-20px, 20px) scale(0.95)' } },
        'blob-2':     { '0%, 100%': { transform: 'translate(0, 0) scale(1)' }, '33%': { transform: 'translate(-30px, 30px) scale(1.08)' }, '66%': { transform: 'translate(20px, -20px) scale(0.92)' } },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};
