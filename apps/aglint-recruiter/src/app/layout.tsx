'use client';
// eslint-disable-next-line simple-import-sort/imports
import { DevlinkMainProvider } from '@context/DevlinkContext';
import '@styles/globals.scss';
import 'regenerator-runtime/runtime';

import ScreenSizeProvider from '../context/ResizeWindow/ResizeWindow';
// import { SupportProvider } from '../context/SupportContext/SupportContext';
import Theme from '../context/Theme/Theme';
import { QueryProvider } from '../queries';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata = {
//   title: 'Aglint AI – Accelerate Your Recruitment Process with Advanced AI',
//   site_name: 'Aglint Inc',
//   description:
//     'Discover Aglint AI, the intelligent solution designed to enhance recruitment efficiency. Source, screen, rank, and schedule interviews with candidates faster than ever. Transform your hiring strategy with our AI-driven tools.',
//   icon: '/images/favicon.ico',
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <DevlinkMainProvider>
          <Theme>
            <ScreenSizeProvider>
              <QueryProvider>{children}</QueryProvider>
            </ScreenSizeProvider>
          </Theme>
        </DevlinkMainProvider>
      </body>
    </html>
  );
}
