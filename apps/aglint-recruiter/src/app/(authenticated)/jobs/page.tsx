'use client';

import DashboardComp from '@/jobs/components';

import { IntegrationStoreProvider } from './_common/contexts';

const Page = () => {
  return (
    <IntegrationStoreProvider>
      <DashboardComp />
    </IntegrationStoreProvider>
  );
};

export default Page;
