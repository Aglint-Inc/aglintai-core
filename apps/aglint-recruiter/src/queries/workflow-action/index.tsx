import type {
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { WorkflowAction } from '@/src/types/workflow.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { GC_TIME } from '..';
import { workflowActionMutationKeys, workflowActionQueryKeys } from './keys';

export const useWorkflowActions = (args: WorkflowActionKeys) => {
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflowActions(args),
    enabled: !!args.workflow_id,
    gcTime: args.workflow_id ? GC_TIME : 0,
  });
};
export type WorkflowActionKeys = {
  workflow_id: string;
};
const getWorkflowActions = async ({ workflow_id }: WorkflowActionKeys) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .select('*')
    .order('order', { ascending: true })
    .eq('workflow_id', workflow_id);
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowActionMutations = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as Mutations,
  });
};
type Mutations =
  | DeleteWorkflowAction
  | UpdateWorkflowAction
  | InsertWorkflowAction;

export const useWorkflowActionDelete = (args: WorkflowActionKeys) => {
  const { mutationKey } = workflowActionMutationKeys.workflowAction(args);
  const { queryKey } = workflowActionQueryKeys.workflowAction(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: deleteWorkflowAction,
    onSuccess: (_data, variables) => {
      const prevWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(prevWorkflowActions).reduce(
        (acc, curr) => {
          if (curr.id !== variables.id) acc.push(curr);
          return acc;
        },
        [] as WorkflowAction[],
      );
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
  });
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
        if (curr.id === variables.id) {
          const newPayload = structuredClone({
            ...curr,
            ...variables,
          }) as WorkflowAction;
          acc.push(newPayload);
        } else acc.push(curr);
        return acc;
      }, [] as WorkflowAction[]);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
    onError: (_error, variables) => {
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(
        previousWorkflowActions,
      ).reduce((acc, curr) => {
        if (curr.id !== variables.id) acc.push(curr);
        return acc;
      }, [] as WorkflowAction[]);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
  });
};
type UpdateWorkflowAction = DatabaseTableUpdate['workflow_action'];
const updateWorkflowAction = async (payload: UpdateWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .update(payload)
    .eq('id', payload.id)
    .select('*');
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
    onMutate: (payload) => {
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(previousWorkflowActions);
      newWorkflowActions.push(payload as WorkflowAction);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
    onError: (_error, variables) => {
      toast.error('Unable to create action');
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(
        previousWorkflowActions,
      ).reduce((acc, curr) => {
        if (curr.id !== variables.id) acc.push(curr);
        return acc;
      }, [] as WorkflowAction[]);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
    onSuccess: (data, variables) => {
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(queryKey);
      const newWorkflowActions = structuredClone(
        previousWorkflowActions,
      ).reduce((acc, curr) => {
        if (curr.id === variables.id) acc.push(data);
        else acc.push(curr);
        return acc;
      }, [] as WorkflowAction[]);
      queryClient.setQueryData<WorkflowAction[]>(queryKey, newWorkflowActions);
    },
  });
};
type InsertWorkflowAction = DatabaseTableInsert['workflow_action'];
const createWorkflowAction = async (payload: InsertWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .insert(payload)
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
};
