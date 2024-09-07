import '@styles/globals.css';
import '@styles/globals.scss';
import 'regenerator-runtime/runtime';

import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/ui/toaster';
import React from 'react';
// import { ErrorBoundary } from 'react-error-boundary';

// import ErrorPage from './error.tsx.abl';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        {/* <ErrorBoundary FallbackComponent={ErrorPage}> */}
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
