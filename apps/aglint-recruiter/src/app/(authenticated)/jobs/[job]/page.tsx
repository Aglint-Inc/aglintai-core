'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { Button } from '@components/ui/button';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';
import { api } from '@/trpc/client';

import { useCurrentJob } from './_common/hooks';

const Page = () => {
  const { job_id } = useCurrentJob();
  const { mutate } = api.jobs.job.jd.generate.useMutation();
  return (
    <OneColumnPageLayout
      header={
        <>
          <JobDetailsHeader />
          <Button
            title='KKKKK'
            onClick={() => mutate({ job_id, type: 'regenerate' })}
          />
        </>
      }
    >
      <ApplicationsComponent />
    </OneColumnPageLayout>
  );
};

export default Page;
