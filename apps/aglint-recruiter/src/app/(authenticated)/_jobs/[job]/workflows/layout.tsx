import { type PropsWithChildren } from 'react';

import {
  ApplicationsProvider,
  JobDashboardProvider,
  JobProvider,
} from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <ApplicationsProvider>
        <JobDashboardProvider>{children}</JobDashboardProvider>
      </ApplicationsProvider>
    </JobProvider>
  );
};

export default Layout;
