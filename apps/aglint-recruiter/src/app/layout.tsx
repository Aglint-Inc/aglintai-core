import 'regenerator-runtime/runtime';

import RootLayout from '@components/layouts/root-layout';
import { ThemeProvider } from '@components/theme-provider';
import { Toaster } from '@components/ui/toaster';
import { type PropsWithChildren } from 'react';

import { TRPCReactProvider } from '@/trpc/client';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Aglint AI',
  description: 'AI Recruiter for your company.',
  icons: {
    icon: '/images/favicon.ico',
  },
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <RootLayout>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
        themes={['light', 'dark']}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </RootLayout>
  );
};

export default Layout;
