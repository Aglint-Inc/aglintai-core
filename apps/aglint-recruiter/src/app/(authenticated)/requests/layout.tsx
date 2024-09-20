'use client';

import React, { type PropsWithChildren } from 'react';

import { RequestsProvider } from '@/context/RequestsContext';

function Layout({ children }: PropsWithChildren) {
  return <RequestsProvider>{children}</RequestsProvider>;
}

export default Layout;
