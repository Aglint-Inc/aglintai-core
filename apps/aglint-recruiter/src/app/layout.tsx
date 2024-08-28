/* eslint-disable @next/next/no-page-custom-font */
'use client';
import '@styles/globals.scss';
import 'regenerator-runtime/runtime';

import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
