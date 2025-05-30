/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))', // Gold
          foreground: 'hsl(var(--primary-foreground))', // Dark Brown for text on gold
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // Cream
          foreground: 'hsl(var(--secondary-foreground))', // Dark Brown for text on cream
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // Light Grey/Brown
          foreground: 'hsl(var(--muted-foreground))', // Darker Grey/Brown
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // Burnt Orange for CTAs
          foreground: 'hsl(var(--accent-foreground))', // Cream/White for text on orange
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // New Brand Colors
        'brand-gold': '#B08D57',        // Gold
        'brand-chocolate': '#5D4037',   // Dark Chocolate Brown
        'brand-cream': '#F5EFE6',       // Cream
        'brand-burnt-orange': '#D87300',// Burnt Orange (for CTAs)
        'brand-light-brown': '#A1887F', // Light Brown (muted)
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['Pacifico', 'Poppins'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        'cta': '0 4px 14px 0 rgba(216, 115, 0, 0.39)', // Shadow for Burnt Orange CTAs
        'card-elegant': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
};