'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';

import { ApplicationsComponent, JobDetailsHeader } from '@/job/components';
import { Button } from '@components/ui/button';
import { api } from '@/trpc/client';
import { useCurrentJob } from './_common/hooks';

const Page = () => {
  const { job_id } = useCurrentJob();
  const { mutate, isPending } = api.jobs.job.jd.generate.useMutation();
  console.log(isPending, '👍');
  return (
    <OneColumnPageLayout
      header={
        <>
          <JobDetailsHeader />
          <Button title='KKKKK' onClick={() => mutate({ job_id })} />
        </>
      }
    >
      <ApplicationsComponent />
    </OneColumnPageLayout>
  );
};

export default Page;
