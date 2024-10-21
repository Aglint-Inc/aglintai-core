'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { JobCreate, JobCreateHeader } from '@/jobs/create/components';

const Page = () => {
  return (
    <OneColumnPageLayout header={<JobCreateHeader />}>
      <JobCreate />
    </OneColumnPageLayout>
  );
};

export default Page;
