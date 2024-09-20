'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import { RequestProvider } from '@/context/RequestContext';

function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const requestId = params?.request as string;

  return <RequestProvider request_id={requestId}>{children}</RequestProvider>;
}

export default Layout;
