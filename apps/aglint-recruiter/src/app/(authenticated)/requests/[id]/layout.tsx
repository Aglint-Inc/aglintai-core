'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import { RequestProvider } from '@/context/RequestContext';

function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  return (
    <RequestProvider request_id={String(params.id)}>{children}</RequestProvider>
  );
}

export default Layout;
