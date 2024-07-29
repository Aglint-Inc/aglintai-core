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

// export const metadata = {
//   title: 'Aglint AI – Accelerate Your Recruitment Process with Advanced AI',
//   site_name: 'Aglint Inc',
//   description:
//     'Discover Aglint AI, the intelligent solution designed to enhance recruitment efficiency. Source, screen, rank, and schedule interviews with candidates faster than ever. Transform your hiring strategy with our AI-driven tools.',
//   icon: '/images/favicon.ico',
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
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
