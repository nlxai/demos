/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // Match NLX payload project breakpoints exactly
      'sm': '480px',     // Small screen
      'md': '768px',     // Tablet
      'lg': '1024px',    // Desktop
      'xl': '1280px',    // Large desktop
    },
    extend: {
      colors: {
        'nlx-primary': '#0040ff',
        'nlx-blue-light': '#91a2d4',
        'nlx-blue-dark': '#6c83c6',
        'nlx-offwhite-1': '#fafafa',
        'nlx-offwhite-2': '#e2dfdb',
        'nlx-charcoal': '#57585d',
        'nlx-white': '#ffffff',
        'nlx-black': '#000000',
      },
      fontFamily: {
        'primary': ['"Haas Grotesk Text Web"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['"Haas Text Mono Web"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'button': '0.813rem',
        'nav': '0.813rem',
        'tags': '0.813rem',
      },
      spacing: {
        'nav': '66px',
      },
      maxWidth: {
        'container': '1512px',
      },
      borderRadius: {
        'nlx': '10px',
      },
      backdropBlur: {
        'nlx': '27px',
      },
      transitionProperty: {
        'nlx': 'background-color, color, border-color',
      },
    },
  },
  plugins: [],
}

