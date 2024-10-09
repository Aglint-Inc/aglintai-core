'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { Button } from '@components/ui/button';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';
import { api } from '@/trpc/client';

import { useCurrentJob } from './_common/hooks';

const Page = () => {
  return (
    <OneColumnPageLayout header={<JobDetailsHeader />}>
      <ApplicationsComponent />
    </OneColumnPageLayout>
  );
};

export default Page;
