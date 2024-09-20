'use client';

import { type ReactNode } from 'react';

import { PrivateProviders } from '@/context/Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <PrivateProviders appRouter>{children}</PrivateProviders>;
}
