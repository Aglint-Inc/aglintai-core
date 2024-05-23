import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { workflowQueryKeys } from './keys';

export const useWorkflow = (args: GetWorkflow) => {
  const { queryKey } = workflowQueryKeys.workflow(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflow(args),
  });
};
export type GetWorkflow = {
  recruiter_id: string;
};
const getWorkflow = async ({ recruiter_id }: GetWorkflow) => {
  const { data, error } = await supabase
    .from('workflow')
    .select('*, workflow_action(id)')
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data;
};
// TODO: RPC function with list of job_ids needed here
