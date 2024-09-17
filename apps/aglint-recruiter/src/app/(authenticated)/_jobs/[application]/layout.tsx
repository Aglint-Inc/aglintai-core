import { type PropsWithChildren } from 'react';

import {
  ApplicationsProvider,
  ApplicationsStoreProvider,
  JobProvider,
} from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <JobProvider>
      <ApplicationsStoreProvider>
        <ApplicationsProvider>{children}</ApplicationsProvider>
      </ApplicationsStoreProvider>
    </JobProvider>
  );
};

export default Layout;
