'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';

import { JobCreate, JobCreateHeader } from '@/jobs/create/components';

const Page = () => {
  return (
    <FullWidthLayout header={<JobCreateHeader />}>
      <JobCreate />
    </FullWidthLayout>
  );
};

export default Page;
