import { type PropsWithChildren } from 'react';

import { IntegrationStoreProvider } from '@/jobs/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return <IntegrationStoreProvider>{children}</IntegrationStoreProvider>;
};

export default Layout;
