'use client';

import { ApplicationsDashboard } from '@/job/components';

import { ApplicationsStoreProvider } from './_common/contexts';

const Page = () => {
  return (
    <ApplicationsStoreProvider>
      <ApplicationsDashboard />
    </ApplicationsStoreProvider>
  );
};

export default Page;
