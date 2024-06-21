import { DatabaseTableInsert, DatabaseTableUpdate } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { Workflow, WorkflowAction } from '@/src/types/workflow.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { workflowActionQueryKeys } from '../workflow-action/keys';
import { workflowMutationKeys, workflowQueryKeys } from './keys';

export const useWorkflowQuery = (args: GetWorkflow) => {
  const { queryKey } = workflowQueryKeys.workflow(args);
  return useQuery({
    queryKey,
    queryFn: () => getWorkflow(args),
  });
};
export type GetWorkflow = {} & WorkflowKeys;

const getWorkflow = async ({ recruiter_id }: GetWorkflow) => {
  const { data, error } = await supabase
    .from('workflow_view')
    .select()
    .order('created_at')
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
  const { queryKey } = workflowQueryKeys.workflow(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkflow,
    mutationKey,
    onSuccess: (_data, variables) => {
      const prevWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(prevWorkflows).reduce(
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
      let triggerChange = false;
      const { queryKey: actionQueryKey } =
        workflowActionQueryKeys.workflowAction({ workflow_id: variables.id });
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      let previousWorkflow: Workflow = null;
      const newWorkflows = structuredClone(previousWorkflows).reduce(
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
        previousWorkflow.trigger !== variables.payload.trigger
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
      const newWorkflows = structuredClone(previousWorkflows).reduce(
        (acc, curr) => {
          if (curr.id !== variables.id) acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
      if (context.triggerChange) {
        queryClient.setQueryData<WorkflowAction[]>(
          context.actionQueryKey,
          context.previousWorkflowActions,
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

export const useWorkflowCreate = (args: WorkflowKeys) => {
  const { mutationKey } = workflowMutationKeys.workflow(args);
  const { queryKey } = workflowQueryKeys.workflow(args);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkflow,
    mutationKey,
    onMutate: ({ id, payload }) => {
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows);
      newWorkflows.push({
        ...(payload as Workflow),
        id,
      });
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
    },
    onError: (_error, variables) => {
      toast.error('Unable to create workflow');
      const previousWorkflows = queryClient.getQueryData<Workflow[]>(queryKey);
      const newWorkflows = structuredClone(previousWorkflows).reduce(
        (acc, curr) => {
          if (curr.id !== variables.id) acc.push(curr);
          return acc;
        },
        [] as Workflow[],
      );
      queryClient.setQueryData<Workflow[]>(queryKey, newWorkflows);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
type InsertWorkflow = {
  id: string;
  recruiter_id: string;
  payload: Omit<DatabaseTableInsert['workflow'], 'id' | 'recruiter_id'>;
};
const createWorkflow = async ({
  id,
  recruiter_id,
  payload,
}: InsertWorkflow) => {
  const { error } = await supabase
    .from('workflow')
    .insert({ ...payload, id, recruiter_id });
  if (error) throw new Error(error.message);
};
