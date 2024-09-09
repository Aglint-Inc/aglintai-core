import { type PropsWithChildren } from 'react';

import { IntegrationProvider } from '@/jobs/contexts/integrations';

const Layout = ({ children }: PropsWithChildren) => {
  return <IntegrationProvider>{children}</IntegrationProvider>;
};

export default Layout;
