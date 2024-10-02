'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { type PropsWithChildren } from 'react';

import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <ApplicationsStoreProvider>
        <OneColumnPageLayout sidebarPosition='none'>
          {children}
        </OneColumnPageLayout>
      </ApplicationsStoreProvider>
    </JobProvider>
  );
};

export default Layout;
