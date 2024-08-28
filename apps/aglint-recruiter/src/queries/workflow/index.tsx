import { DatabaseTableInsert, DatabaseTableUpdate } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Workflow, WorkflowAction } from '@/src/types/workflow.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { workflowActionQueryKeys } from '../workflow-action/keys';
import { workflowMutationKeys, workflowQueryKeys } from './keys';

export const useWorkflowQuery = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = workflowQueryKeys.workflows();
  return useQuery({
    queryKey,
    queryFn: () => getWorkflows({ recruiter_id }),
  });
};
export type GetWorkflows = {} & WorkflowKeys;

const getWorkflows = async ({ recruiter_id }: GetWorkflows) => {
  const { data, error } = await supabase
    .from('workflow_view')
    .select()
    .order('created_at')
    .eq('recruiter_id', recruiter_id)
    .eq('is_request_workflow', false);
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowJobFilter = () => {
  const { recruiter_id } = useAuthDetails();
  const { queryKey } = workflowQueryKeys.workflow_job_filter();
  return useQuery({
    queryKey,
    queryFn: async () =>
      (await supabase.rpc('get_job_workflows', { recruiter_id }).throwOnError())
        .data,
  });
};

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
  const { mutationKey: refreshMutationKey } =
    workflowMutationKeys.workflows('REFRESH');
  const refresh = useMutationState({
    filters: { mutationKey: refreshMutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as RefreshWorkflow,
  });
  return { create, update, remove, refresh };
};

type WorkflowKeys = {
  recruiter_id: string;
};
export const useWorkflowDelete = () => {
  const { mutationKey } = workflowMutationKeys.workflows('DELETE');
  const { queryKey } = workflowQueryKeys.workflows();
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

export const useWorkflowUpdate = () => {
  const { mutationKey } = workflowMutationKeys.workflows('UPDATE');
  const { queryKey } = workflowQueryKeys.workflows();
  const queryClient = useQueryClient();
  const refresh = useWorkflowRefresh();
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
    onSuccess: (data) => refresh({ id: data.id }),
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
  const { queryKey } = workflowQueryKeys.workflows();
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

type RefreshWorkflow = {
  id: string;
};
export const useWorkflowRefresh = () => {
  const { mutationKey } = workflowMutationKeys.workflows('REFRESH');
  const { queryKey } = workflowQueryKeys.workflows();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey,
    mutationFn: async ({ id }: RefreshWorkflow) =>
      (
        await supabase
          .from('workflow_view')
          .select()
          .eq('id', id)
          .single()
          .throwOnError()
      ).data,
    onError: () => toast.error('Unable to refresh workflow'),
    onSuccess: (data) => {
      const prevCache = queryClient.getQueryData<Workflow[]>(queryKey);
      const newCache = prevCache.reduce((acc, curr) => {
        if (curr.id === data.id) acc.push(data);
        else acc.push(curr);
        return acc;
      }, [] as Workflow[]);
      queryClient.setQueryData<Workflow[]>(queryKey, newCache);
    },
  });
  return mutate;
};
