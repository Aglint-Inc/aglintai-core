import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { useParams, useRouter } from 'next/navigation';

import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import ReorderableInterviewPlan from './ReorderableInterviewPlan';

export const CandidatePlan = () => {
  const { job } = useParams();
  const job_id = job as string;
  return (
    <div className='container mx-auto'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='mb-2 text-2xl font-bold'>Job Settings</h1>
          <BreadCrumbs />
        </div>
        <Settings />
      </div>
      <div className='mb-6 flex gap-6'>
        <div className='w-1/4'>
          <JobsSideNavV2 />
        </div>
        <div className='w-3/4'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-2'>
              <h2 className='mb-2 text-xl font-bold'>Candidate Plan</h2>
              <p className='mb-4 text-sm text-gray-600'>
                Update the candidate plan here. Changes will be saved
                automatically.
              </p>
            </div>
          </div>
          <div className='my-8 mb-10 max-w-2xl space-y-4'>
            <ReorderableInterviewPlan jobId={job_id} applicationId={null} />;
          </div>
        </div>
      </div>
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
          <BreadcrumbLink href='#' onClick={() => push(`/jobs/${job?.id}`)}>
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Candidate Plan</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
