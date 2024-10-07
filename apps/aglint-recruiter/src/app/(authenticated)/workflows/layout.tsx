'use client';

import { type PropsWithChildren } from 'react';

import { WorkflowsStoreProvider } from '@/workflows/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return <WorkflowsStoreProvider>{children}</WorkflowsStoreProvider>;
};

export default Layout;
