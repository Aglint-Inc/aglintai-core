import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useGetJobWorkflow = () => {
  const { params } = useRouterPro();
  const job_id = params.job;

  return api.jobs.job.workflow.getJobWorkflows.useQuery({
    job_id: job_id,
  });
};
