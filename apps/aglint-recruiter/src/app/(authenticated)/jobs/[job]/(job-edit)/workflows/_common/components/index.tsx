import { Loader } from '@/components/Common/Loader';
import { JobNotFound } from '@/job/components/JobNotFound';
import { useJob } from '@/job/hooks';

import EnhancedAutomationPage from './jobWorkflow';

export const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <EnhancedAutomationPage />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader />
    </div>
  );
};
