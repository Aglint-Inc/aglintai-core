import { type PropsWithChildren } from 'react';

import {
  ApplicationsStoreProvider,
  JobDashboardProvider,
  JobDashboardStoreProvider,
  JobProvider,
} from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <JobDashboardStoreProvider>
        <JobDashboardProvider>
          <ApplicationsStoreProvider>{children}</ApplicationsStoreProvider>
        </JobDashboardProvider>
      </JobDashboardStoreProvider>
    </JobProvider>
  );
};

export default Layout;
