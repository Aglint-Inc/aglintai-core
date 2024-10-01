'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';

import { ApplicationsStoreProvider } from './_common/contexts';

const Page = () => {
  return (
    <ApplicationsStoreProvider>
      <FullWidthLayout header={<JobDetailsHeader />}>
        <ApplicationsComponent />
      </FullWidthLayout>
    </ApplicationsStoreProvider>
  );
};

export default Page;
