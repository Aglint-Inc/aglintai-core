import { type PropsWithChildren } from 'react';

import { IntegrationProvider } from '@/jobs/contexts/integrationsContext';

const Layout = ({ children }: PropsWithChildren) => {
  return <IntegrationProvider>{children}</IntegrationProvider>;
};

export default Layout;
