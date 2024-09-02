'use client';
import { type ReactNode } from 'react';

import { PublicProviders } from '@/src/context/Providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <PublicProviders>{children}</PublicProviders>;
}
