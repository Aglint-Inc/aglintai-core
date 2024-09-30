import '@styles/globals.css';
import 'regenerator-runtime/runtime';

import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/ui/toaster';
import React, { type PropsWithChildren } from 'react';

import { TRPCReactProvider } from '@/trpc/client';
import { HydrateClient } from '@/trpc/server';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Aglint AI',
  description: 'AI Recruiter for your company.',
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <main>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className=' fixed flex h-screen w-full'>
              <TRPCReactProvider>
                <HydrateClient>{children}</HydrateClient>
              </TRPCReactProvider>
            </div>
            <Toaster />
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default Layout;
