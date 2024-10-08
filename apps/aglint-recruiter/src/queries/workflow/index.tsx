import {
  type DatabaseTableInsert,
  type DatabaseTableUpdate,
} from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { api } from '@/trpc/client';
import { type Workflow, type WorkflowAction } from '@/types/workflow.types';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { workflowActionQueryKeys } from '../workflow-action/keys';
import { workflowMutationKeys } from './keys';

export const useWorkflowMutations = () => {
  const { mutationKey: createMutationKey } =
    workflowMutationKeys.workflows('CREATE');
  const create = useMutationState({
    filters: { mutationKey: createMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as CreateWorkflow,
  });
  const { mutationKey: updateMutationKey } =
    workflowMutationKeys.workflows('UPDATE');
  const update = useMutationState({
    filters: { mutationKey: updateMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as UpdateWorkflow,
  });
  const { mutationKey: deleteMutationKey } =
    workflowMutationKeys.workflows('DELETE');
  const remove = useMutationState({
    filters: { mutationKey: deleteMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as DeleteWorkflow,
  });
  return { create, update, remove };
};

export const useWorkflowDelete = () => {
  const { mutationKey } = workflowMutationKeys.workflows('DELETE');
  return useMutation({
    mutationFn: deleteWorkflow,
    mutationKey,
  });
};

type DeleteWorkflow = {
  id: string;
};
const deleteWorkflow = async ({ id }: DeleteWorkflow) => {
  const { error } = await supabase.from('workflow').delete().eq('id', id);
  if (error) throw new Error(error.message);
};

export const useWorkflowUpdate = () => {
  const { mutationKey } = workflowMutationKeys.workflows('UPDATE');
  const queryKey = getQueryKey(api.workflows.read, undefined, 'query');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkflow,
    mutationKey,
    onMutate: (variables) => {
      let triggerChange = false;
      const { queryKey: actionQueryKey } =
        workflowActionQueryKeys.workflowAction({ workflow_id: variables.id });
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      let previousWorkflow: Workflow | null = null;
      const newWorkflows = structuredClone(previousWorkflows!).reduce(
        (acc, curr) => {
          if (curr.id === variables.id) {
            previousWorkflow = structuredClone(curr);
            acc.push(structuredClone({ ...curr, ...variables.payload }));
          } else acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      const previousWorkflowActions =
        queryClient.getQueryData<WorkflowAction[]>(actionQueryKey);
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
      if (
        variables.payload.trigger &&
        previousWorkflow!.trigger !== variables.payload.trigger
      ) {
        triggerChange = true;
        queryClient.setQueryData<WorkflowAction[]>(actionQueryKey, []);
      }
      return {
        previousWorkflow,
        actionQueryKey,
        previousWorkflowActions,
        triggerChange,
      };
    },
    onError: (_error, variables, context) => {
      toast.error('Unable to update workflow');
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows!).reduce(
        (acc, curr) => {
          if (curr.id !== variables.id) acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
      if (context!.triggerChange) {
        queryClient.setQueryData<WorkflowAction[]>(
          context!.actionQueryKey,
          context!.previousWorkflowActions,
        );
      }
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
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowCreate = () => {
  const { mutationKey } = workflowMutationKeys.workflows('CREATE');
  const queryKey = getQueryKey(api.workflows.read, undefined, 'query');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkflow,
    mutationKey,
    onMutate: ({ id, payload }) => {
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows);
      newWorkflows!.push({
        ...(payload as Workflow),
        id,
      });
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
    },
    onError: (_error, variables) => {
      toast.error('Unable to create workflow');
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows!).reduce(
        (acc, curr) => {
          if (curr.id !== variables.id) acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
    },
  });
};
type CreateWorkflow = {
  id: string;
  recruiter_id: string;
  payload: Omit<DatabaseTableInsert['workflow'], 'id' | 'recruiter_id'>;
};
const createWorkflow = async ({
  id,
  recruiter_id,
  payload,
}: CreateWorkflow) => {
  const { error } = await supabase
    .from('workflow')
    .insert({ ...payload, id, recruiter_id });
  if (error) throw new Error(error.message);
};
