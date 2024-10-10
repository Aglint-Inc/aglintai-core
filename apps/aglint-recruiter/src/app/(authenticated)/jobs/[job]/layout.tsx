'use client';

import { type PropsWithChildren } from 'react';

import { ErrorBoundary } from '@/common/ErrorBoundary';
import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <JobProvider>
        <ApplicationsStoreProvider>{children}</ApplicationsStoreProvider>
      </JobProvider>
    </ErrorBoundary>
  );
};

export default Layout;
