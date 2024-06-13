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
        //radix ui colors
        accent: {
          1: '#FEFCFB', //orange1
          2: '#FFF7ED', //orange2
          3: '#FFEFD6', //orange3
          4: '#FFDFB5', //orange4
          5: '#FFD19A', //orange5
          6: '#FFC182', //orange6
          7: '#F5AE73', //orange7
          8: '#EC9455', //orange8
          9: '#F76B15', //orange9
          10: '#EF5F00', //orange10
          11: '#CC4E00', //orange11
          12: '#582D1D', //orange12
        },
        neutral: {
          1: '#FDFDFC', //sand1
          2: '#F9F9F8', //sand2
          3: '#F1F0EF', //sand3
          4: '#E9E8E6', //sand4
          5: '#E2E1DE', //sand5
          6: '#DAD9D6', //sand6
          7: '#CFCECA', //sand7
          8: '#BCBBB5', //sand8
          9: '#8D8D86', //sand9
          10: '#82827C', //sand10
          11: '#63635E', //sand11
          12: '#21201C', //sand12
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
