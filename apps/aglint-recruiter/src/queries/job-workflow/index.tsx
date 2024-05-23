import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobWorkflowQueryKeys } from './keys';

export const useJobWorkflow = (args: GetJobWorkflow) => {
  const { queryKey } = jobWorkflowQueryKeys.workflow(args);
  return useQuery({
    queryKey,
    queryFn: () => getJobWorkflow(args),
  });
};
export type GetJobWorkflow = {
  job_id: string;
};
const getJobWorkflow = async ({ job_id }: GetJobWorkflow) => {
  const { data, error } = await supabase
    .from('workflow_job_relation')
    .select('workflow(*)')
    .eq('job_id', job_id);
  if (error) throw new Error(error.message);
  return (data ?? []).map(({ workflow }) => workflow);
};
