import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import { Zap } from 'lucide-react';

import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { useJob } from '@/job/hooks';
import { useWorkflowsActions } from '@/job/workflows/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import JobWorkflow from './list';

export const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <div className='container-lg mx-auto w-full px-12'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-2xl font-bold'>Job Settings</h1>
            <BreadCrumbs />
          </div>
          <Actions />
        </div>

        <div className='mb-6 flex gap-6'>
          <div className='w-2/12'>
            <JobsSideNavV2 />
          </div>
          <div className='w-9/12'>
            <h2 className='mb-2 text-xl font-bold'>Automations</h2>
            <p className='mb-4 text-sm text-gray-600'>
              Automations streamline recruitment processes, saving time and
              enhancing efficiency throughout the hiring workflow.
            </p>
            <JobWorkflow />
          </div>
        </div>
      </div>
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader />
    </div>
  );
};

const BreadCrumbs = () => {
  const { push } = useRouterPro();
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
  const { manageJob } = useJob();
  const { setOpen } = useWorkflowsActions();
  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        {manageJob && (
          <Button variant='outline' onClick={() => setOpen(true)} size='sm'>
            <Zap className='mr-2 h-4 w-4' />
            Add
          </Button>
        )}
        {/* <Settings /> */}
      </div>
    </>
  );
};
