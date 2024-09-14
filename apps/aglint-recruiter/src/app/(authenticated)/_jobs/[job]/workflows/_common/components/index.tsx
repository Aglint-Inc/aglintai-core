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

import Loader from '@/components/Common/Loader';
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
      <div className='min-h-screen bg-gray-100'>
        <div className='container mx-auto p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>Job Settings</h1>
              <BreadCrumbs />
            </div>
            <Actions />
          </div>

          <div className='flex gap-6 mb-6'>
            <div className='w-1/4'>
              <JobsSideNavV2 />
            </div>
            <div className='w-3/4'>
              <h2 className='text-xl font-bold mb-2'>Automations</h2>
              <p className='text-sm text-gray-600 mb-4'>
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
    <div className='w-full h-screen flex items-center justify-center'>
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
      <div className='flex justify-between items-center gap-2'>
        {manageJob && (
          <Button onClick={() => setPopup({ open: true })} size='sm'>
            <Zap className='mr-2 h-4 w-4' />
            Add
          </Button>
        )}
        <Settings />
      </div>
    </>
  );
};
