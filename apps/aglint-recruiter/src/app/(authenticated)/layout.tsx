'use client';
import { ReactNode } from 'react';

import AuthProvider from '@/src/context/AuthContextPro/AuthContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
