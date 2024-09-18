/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: 'true',
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
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        info: {
          DEFAULT: 'hsl(var(--info-11))',
          foreground: 'hsl(var(--info-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'calendar-bg': 'hsl(var(--background))',
        'calendar-border': 'hsl(var(--border))',
        'calendar-text': 'hsl(var(--foreground))',
        'calendar-accent': 'hsl(var(--primary))',
        'calendar-today': 'hsl(var(--primary) / 0.1)',
        'calendar-event': 'hsl(var(--primary))',
        'calendar-event-text': 'hsl(var(--primary-foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--fc-small-font-size': '0.85em',
          '--fc-page-bg-color': theme('colors.calendar-bg'),
          '--fc-neutral-bg-color': theme('colors.gray.100'),
          '--fc-neutral-text-color': theme('colors.gray.600'),
          '--fc-border-color': theme('colors.calendar-border'),

          '--fc-button-text-color': theme('colors.calendar-event-text'),
          '--fc-button-bg-color': theme('colors.calendar-accent'),
          '--fc-button-border-color': theme('colors.calendar-accent'),
          '--fc-button-hover-bg-color': theme('colors.blue.600'),
          '--fc-button-hover-border-color': theme('colors.blue.600'),
          '--fc-button-active-bg-color': theme('colors.blue.700'),
          '--fc-button-active-border-color': theme('colors.blue.700'),

          '--fc-event-bg-color': theme('colors.calendar-event'),
          '--fc-event-border-color': theme('colors.calendar-event'),
          '--fc-event-text-color': theme('colors.calendar-event-text'),
          '--fc-event-selected-overlay-color': 'rgba(0, 0, 0, 0.25)',

          '--fc-more-link-bg-color': theme('colors.gray.200'),
          '--fc-more-link-text-color': theme('colors.gray.600'),

          '--fc-event-resizer-thickness': '8px',
          '--fc-event-resizer-dot-total-width': '8px',
          '--fc-event-resizer-dot-border-width': '1px',

          '--fc-non-business-color': theme('colors.gray.100'),
          '--fc-bg-event-color': theme('colors.gray.100'),
          '--fc-bg-event-opacity': '0.3',
          '--fc-highlight-color': theme('colors.blue.100'),
          '--fc-today-bg-color': theme('colors.calendar-today'),
          '--fc-now-indicator-color': theme('colors.red.500'),
        },
      });
    },
  ],
};
