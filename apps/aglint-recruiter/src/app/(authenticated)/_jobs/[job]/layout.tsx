import { type PropsWithChildren } from 'react';

import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <ApplicationsStoreProvider>{children}</ApplicationsStoreProvider>
    </JobProvider>
  );
};

export default Layout;
