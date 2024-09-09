import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { WorkflowJobs } from '@devlink/WorkflowJobs';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import Loader from '@/components/Common/Loader';
import { useJob } from '@/context/JobContext';
import { useJobDashboard } from '@/context/JobDashboard';
import { useJobDashboardStore } from '@/context/JobDashboard/store';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import JobNotFound from '../Common/JobNotFound';
import { Settings } from '../Common/SharedTopNav/actions';
import JobWorkflow from './list';
import { Button } from '@components/ui/button';
import { Bolt } from 'lucide-react';

const JobWorkflowDashboard = () => {
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
          <WorkflowJobs slotWorkflowCards={<JobWorkflow />} />
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

export default JobWorkflowDashboard;

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
            onClick={() => push(ROUTES['/jobs/[id]']({ id: job?.id }))}
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
  const { setPopup } = useJobDashboardStore(({ setPopup }) => ({
    setPopup,
  }));
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
