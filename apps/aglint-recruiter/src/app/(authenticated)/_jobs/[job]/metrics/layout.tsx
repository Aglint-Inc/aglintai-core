import { type PropsWithChildren } from 'react';

import {
  ApplicationsProvider,
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
          <ApplicationsStoreProvider>
            <ApplicationsProvider>{children}</ApplicationsProvider>
          </ApplicationsStoreProvider>
        </JobDashboardProvider>
      </JobDashboardStoreProvider>
    </JobProvider>
  );
};

export default Layout;
