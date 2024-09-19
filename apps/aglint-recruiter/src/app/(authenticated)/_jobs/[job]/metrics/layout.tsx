import { type PropsWithChildren } from 'react';

import {
  ApplicationsStoreProvider,
  JobDashboardProvider,
  JobProvider,
} from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <JobDashboardProvider>
        <ApplicationsStoreProvider>{children}</ApplicationsStoreProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default Layout;
