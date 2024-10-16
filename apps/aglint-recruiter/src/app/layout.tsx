import 'regenerator-runtime/runtime';

import RootLayout from '@components/layouts/root-layout';
import { Toaster } from '@components/ui/toaster';
import { type PropsWithChildren } from 'react';

import { ThemeProvider } from '@/common/themes/context/themeProvider';
import { TRPCReactProvider } from '@/trpc/client';

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
      <ThemeProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </RootLayout>
  );
};

export default Layout;
