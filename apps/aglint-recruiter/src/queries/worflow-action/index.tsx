import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { workflowActionQueryKeys } from './keys';

export const useWorkAction = (args: GetWorkflowAction) => {
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflowAction(args),
  });
};
export type GetWorkflowAction = {
  workflow_id: string;
};
const getWorkflowAction = async ({ workflow_id }: GetWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .select()
    .eq('workflow_id', workflow_id);
  if (error) throw new Error(error.message);
  return data;
};
