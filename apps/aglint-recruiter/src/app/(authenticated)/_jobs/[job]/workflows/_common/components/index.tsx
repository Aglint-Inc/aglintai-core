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
import { useRouter } from 'next/router';

import { Loader } from '@/components/Common/Loader';
import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob, useJobDashboard, useJobDashboardActions } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import JobWorkflow from './list';

export const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h1 className='mb-2 text-2xl font-bold'>Job Settings</h1>
              <BreadCrumbs />
            </div>
            <Actions />
          </div>

          <div className='mb-6 flex gap-6'>
            <div className='w-1/4'>
              <JobsSideNavV2 />
            </div>
            <div className='w-3/4'>
              <h2 className='mb-2 text-xl font-bold'>Automations</h2>
              <p className='mb-4 text-sm text-gray-600'>
                Automations streamline recruitment processes, saving time and
                enhancing efficiency throughout the hiring workflow.
              </p>
              <JobWorkflow />
            </div>
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
      <div className='flex items-center justify-between gap-2'>
        {manageJob && (
          <Button
            variant='outline'
            onClick={() => setPopup({ open: true })}
            size='sm'
          >
            <Zap className='mr-2 h-4 w-4' />
            Add
          </Button>
        )}
        <Settings />
      </div>
    </>
  );
};
