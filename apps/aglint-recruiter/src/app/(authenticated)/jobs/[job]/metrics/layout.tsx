'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { type PropsWithChildren } from 'react';

import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <ApplicationsStoreProvider>
        <FullWidthLayout sidebarPosition='none'>{children}</FullWidthLayout>
      </ApplicationsStoreProvider>
    </JobProvider>
  );
};

export default Layout;
