import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';

import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import EnhancedAutomationPage from './jobWorkflow';

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
        </div>

        <div className='mb-6 flex gap-6'>
          <div className='w-2/12'>
            <JobsSideNavV2 />
          </div>
          <>
            <EnhancedAutomationPage />
          </>
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
