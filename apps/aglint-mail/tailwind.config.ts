import type { Config } from 'tailwindcss';
// import colors = require('@radix-ui/colors');
// import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const iOsHeight = plugin(({ addUtilities }) => {
  const supportsTouchRule = '@supports (-webkit-touch-callout: none)';
  const webkitFillAvailable = '-webkit-fill-available';

  const utilities = {
    '.min-h-screen-ios': {
      [supportsTouchRule]: {
        minHeight: webkitFillAvailable,
      },
    },
    '.h-screen-ios': {
      [supportsTouchRule]: {
        height: webkitFillAvailable,
      },
    },
  };

  // @ts-expect-error This works normally, not sure what this error is
  addUtilities(utilities, ['responsive']);
});

const config: Config = {
  content: {
    // needs to be relative because tailwind will find the content
    // by default based on the process's cwd
    relative: true,
    files: [
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          'linear-gradient(145.37deg, rgba(255, 255, 255, 0.09) -8.75%, rgba(255, 255, 255, 0.027) 83.95%)',
        gradientHover:
          'linear-gradient(145.37deg, rgba(255, 255, 255, 0.1) -8.75%, rgba(255, 255, 255, 0.057) 83.95%)',
        shine:
          'linear-gradient(45deg, rgba(255,255,255,0) 45%,rgba(255,255,255,1) 50%,rgba(255,255,255,0) 55%,rgba(255,255,255,0) 100%)',
      },
      colors: {
        accent: {
          1: '#FEFCFB',
          2: '#FFF7ED',
          3: '#FFEFD6',
          4: '#FFDFB5',
          5: '#FFD19A',
          6: '#FFC182',
          7: '#F5AE73',
          8: '#EC9455',
          9: '#F76B15',
          10: '#EF5F00',
          11: '#CC4E00',
          12: '#582D1D',
        },
        neutral: {
          1: '#FDFDFC',
          2: '#F9F9F8',
          3: '#F1F0EF',
          4: '#E9E8E6',
          5: '#E2E1DE',
          6: '#DAD9D6',
          7: '#CFCECA',
          8: '#BCBBB5',
          9: '#8D8D86',
          10: '#82827C',
          11: '#63635E',
          12: '#21201C',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'San Francisco',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'text-xs': ['12px', '16px'], // size 1
        'text-sm': ['14px', '20px'], // size 2
        'text-base': ['16px', '24px'], // size 3
        'text-lg': ['18px', '28px'], // size 4
        'text-xl': ['20px', '28px'], // size 5
        'text-2xl': ['24px', '32px'], // size 6
        'text-3xl': ['30px', '36px'], // size 7
        'text-4xl': ['36px', '40px'], // size 8
        'text-5xl': ['48px', '48px'], // size 9
      },
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '-100%' },
          '100%': { backgroundPosition: '100%' },
        },
        dash: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [iOsHeight],
};
export default config;

// accent: {
//   1: colors.orange.orange1,
//   2: colors.orange.orange2,
//   3: colors.orange.orange3,
//   4: colors.orange.orange4,
//   5: colors.orange.orange5,
//   6: colors.orange.orange6,
//   7: colors.orange.orange7,
//   8: colors.orange.orange8,
//   9: colors.orange.orange9,
//   10: colors.orange.orange10,
//   11: colors.orange.orange11,
//   12: colors.orange.orange12,
// },
// neutral: {
//   1: colors.sand.sand1,
//   2: colors.sand.sand2,
//   3: colors.sand.sand3,
//   4: colors.sand.sand4,
//   5: colors.sand.sand5,
//   6: colors.sand.sand6,
//   7: colors.sand.sand7,
//   8: colors.sand.sand8,
//   9: colors.sand.sand9,
//   10: colors.sand.sand10,
//   11: colors.sand.sand11,
//   12: colors.sand.sand12,
// },
