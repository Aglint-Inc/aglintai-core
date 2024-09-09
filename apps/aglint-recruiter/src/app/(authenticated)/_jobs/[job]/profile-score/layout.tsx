import { type PropsWithChildren } from 'react';

import {
  JobDashboardProvider,
  JobDashboardStoreProvider,
  JobProvider,
} from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <JobDashboardStoreProvider>
        <JobDashboardProvider>{children}</JobDashboardProvider>
      </JobDashboardStoreProvider>
    </JobProvider>
  );
};

export default Layout;
