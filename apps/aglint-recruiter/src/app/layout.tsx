import 'regenerator-runtime/runtime';

import RootLayout from '@components/layouts/root-layout';
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
    <RootLayout>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem={false}
        disableTransitionOnChange
      >
        <TRPCReactProvider>
          <HydrateClient>{children}</HydrateClient>
        </TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </RootLayout>
  );
};

export default Layout;
