import { JobNotFound } from '@/job/components/JobNotFound';
import { useJob } from '@/job/hooks';

import EnhancedAutomationPage from './jobWorkflow';

export const JobWorkflowDashboard = () => {
  const { job } = useJob();

  return job && job?.status !== 'closed' ? (
    <EnhancedAutomationPage />
  ) : (
    <JobNotFound />
  );
};
