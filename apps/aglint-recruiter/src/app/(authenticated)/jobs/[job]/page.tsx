'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';

const Page = () => {
  return (
    <OneColumnPageLayout header={<JobDetailsHeader />}>
      <ApplicationsComponent />
    </OneColumnPageLayout>
  );
};

export default Page;
