import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetJobWorkflows } from '@/routers/jobs/job/workflow/getJobWorkflowsActions';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useGetJobWorkflow = (): ProcedureQuery<GetJobWorkflows> => {
  const { params } = useRouterPro();
  const { recruiter_id } = useTenant();
  const job_id = params.job;
  return api.jobs.job.workflow.getJobWorkflows.useQuery({
    job_id: job_id,
    company_id: recruiter_id,
  });
};
