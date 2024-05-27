import { useMutation, useMutationState, useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { workflowMutationKeys, workflowQueryKeys } from './keys';

export const useWorkflowQuery = (args: GetWorkflow) => {
  const { queryKey } = workflowQueryKeys.workflow(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflow(args),
  });
};
export type GetWorkflow = {} & WorkflowKeys;
export type Workflow = Awaited<ReturnType<typeof getWorkflow>>[number];
const getWorkflow = async ({ recruiter_id }: GetWorkflow) => {
  const { data, error } = await supabase
    .from('workflow_view')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);
  return data;
};
// TODO: RPC function with list of job_ids needed here

export const useWorkflowState = (args: WorkflowKeys) => {
  const { mutationKey } = workflowMutationKeys.workflow(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.data as Workflow,
  });
};

type WorkflowKeys = {
  recruiter_id: string;
};
export const useWorkflowDelete = (args: WorkflowKeys) => {
  const { mutationKey } = workflowMutationKeys.workflow(args);
  return useMutation({ mutationFn: deleteWorkflow, mutationKey });
};

type DeleteWorkflow = {
  id: string;
};
const deleteWorkflow = async ({ id }: DeleteWorkflow) => {
  const { error } = await supabase.from('workflow').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
