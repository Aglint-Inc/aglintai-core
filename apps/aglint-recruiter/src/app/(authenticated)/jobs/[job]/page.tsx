'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';

const Page = () => {
  return (
    <FullWidthLayout header={<JobDetailsHeader />}>
      <ApplicationsComponent />
    </FullWidthLayout>
  );
};

export default Page;
