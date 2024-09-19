import { type PropsWithChildren } from 'react';

import { JobDashboardProvider, JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <JobDashboardProvider>{children}</JobDashboardProvider>
    </JobProvider>
  );
};

export default Layout;
