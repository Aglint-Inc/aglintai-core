import { DatabaseTableUpdate } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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

export const useWorkflowMutations = (args: WorkflowKeys) => {
  const { mutationKey } = workflowMutationKeys.workflow(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as Mutations,
  });
};
type Mutations = DeleteWorkflow | UpdateWorkflow;

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

export const useWorkflowUpdate = (args: WorkflowKeys) => {
  const { mutationKey } = workflowMutationKeys.workflow(args);
  const { queryKey } = workflowQueryKeys.workflow(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkflow,
    mutationKey,
    onMutate: (variables) => {
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows).reduce(
        (acc, curr) => {
          if (curr.id === variables.id)
            acc.push(structuredClone({ ...curr, ...variables.payload }));
          else acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
      return { previousWorkflows, newWorkflows };
    },
    onError: (_error, _variables, context) => {
      toast.error('Unable to update workflow');
      queryClient.setQueryData<Workflow[]>(queryKey, context.previousWorkflows);
    },
  });
};
type UpdateWorkflow = {
  id: string;
  payload: DatabaseTableUpdate['workflow'];
};
const updateWorkflow = async ({ id, payload }: UpdateWorkflow) => {
  const { data, error } = await supabase
    .from('workflow')
    .update(payload)
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};
