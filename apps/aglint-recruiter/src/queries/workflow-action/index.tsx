import { DatabaseTableInsert, DatabaseTableUpdate } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { workflowActionMutationKeys, workflowActionQueryKeys } from './keys';

export const useWorkflowActions = (args: WorkflowActionKeys) => {
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflowActions(args),
    enabled: !!args.workflow_id,
  });
};
export type WorkflowActionKeys = {
  workflow_id: string;
};
export type WorkflowAction = Awaited<
  ReturnType<typeof getWorkflowActions>
>[number];
const getWorkflowActions = async ({ workflow_id }: WorkflowActionKeys) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .select()
    .eq('workflow_id', workflow_id);
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowActionMutations = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.data as WorkflowAction,
  });
};

export const useWorkflowActionDelete = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  return useMutation({ mutationFn: deleteWorkflowAction, mutationKey });
};
type DeleteWorkflowAction = {
  id: string;
};
const deleteWorkflowAction = async ({ id }: DeleteWorkflowAction) => {
  const { error } = await supabase
    .from('workflow_action')
    .delete()
    .eq('id', id);
  if (error) throw new Error(error.message);
};

export const useWorkflowActionUpdate = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkflowAction,
    mutationKey,
    onMutate: (variables) => {
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(
        previousWorkflowActions,
      ).reduce((acc, curr) => {
        if (curr.id === variables.id)
          acc.push(structuredClone({ ...curr, ...variables.payload }));
        else acc.push(curr);
        return acc;
      }, [] as WorkflowAction[]);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
      return { previousWorkflowActions, newWorkflowActions };
    },
    onError: (_error, _variables, context) => {
      toast.error('Unable to update action');
      queryClient.setQueryData<WorkflowAction[]>(
        queryKey,
        context.previousWorkflowActions,
      );
    },
  });
};
type UpdateWorkflowAction = {
  id: string;
  payload: DatabaseTableUpdate['workflow_action'];
};
const updateWorkflowAction = async ({ id, payload }: UpdateWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .update(payload)
    .eq('id', id)
    .select();
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowActionCreate = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkflowAction,
    mutationKey,
    onMutate: ({ id, payload, workflow_id }) => {
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(previousWorkflowActions);
      newWorkflowActions.push({
        ...(payload as WorkflowAction),
        id,
        workflow_id,
      });
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
      return { previousWorkflowActions, newWorkflowActions, id };
    },
    onError: (_error, _variables, context) => {
      toast.error('Unable to update action');
      queryClient.setQueryData<WorkflowAction[]>(
        queryKey,
        context.previousWorkflowActions,
      );
    },
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<WorkflowAction[]>(
        queryKey,
        context.newWorkflowActions.reduce((acc, curr) => {
          if (curr.id === context.id) acc.push(data);
          else acc.push(curr);
          return acc;
        }, []),
      );
    },
  });
};
type InsertWorkflowAction = {
  workflow_id: string;
  id: string;
  payload: Omit<DatabaseTableInsert['workflow_action'], 'id' | 'workflow_id'>;
};
const createWorkflowAction = async ({
  workflow_id,
  id,
  payload,
}: InsertWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .insert({ ...payload, id, workflow_id })
    .select();
  if (error) throw new Error(error.message);
  return data;
};
