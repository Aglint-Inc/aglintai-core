import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import { Stack } from '@mui/material';
import { Bolt } from 'lucide-react';
import { useRouter } from 'next/router';

import Loader from '@/components/Common/Loader';
import { JobNotFound } from '@/job/components/JobNotFound';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob, useJobDashboard, useJobDashboardActions } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import JobWorkflow from './list';

export const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <div className='flex flex-col min-h-screen'>
        <header className='flex justify-between sticky top-0 items-center p-4 bg-white border-b'>
          <div className='flex-1'>
            <BreadCrumbs />
          </div>
          <div>
            <Actions />
          </div>
        </header>
        <main className='flex-grow'>
          <div className='grid grid-cols-[390px_1fr] h-[calc(100vh-48px)]'>
            <div className='flex flex-col overflow-auto pb-5 border-r border-neutral-200 h-[calc(100vh-48px)]'>
              <div className='flex flex-col gap-px'>
                <JobWorkflow />
              </div>
            </div>
          </div>
        </main>
      </div>
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href='#'
            onClick={() => push(ROUTES['/jobs/[job]']({ job: job?.id }))}
          >
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Workflows</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Actions = () => {
  const { manageJob } = useJobDashboard();
  const { setPopup } = useJobDashboardActions();
  return (
    <>
      {manageJob && (
        <Button onClick={() => setPopup({ open: true })} size='sm'>
          <Bolt className='mr-2 h-4 w-4' />
          Add
        </Button>
      )}
      <Settings />
    </>
  );
};
