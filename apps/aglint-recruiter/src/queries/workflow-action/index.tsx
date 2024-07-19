import { DatabaseTableInsert, DatabaseTableUpdate } from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { WorkflowAction } from '@/src/types/workflow.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { GC_TIME } from '..';
import { workflowActionMutationKeys, workflowActionQueryKeys } from './keys';

const WORKFLOW_ACTIONS_SELECT = '*, company_email_template(*)';

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
    .select(WORKFLOW_ACTIONS_SELECT)
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
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();
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
          const newPayload = structuredClone({ ...curr, ...variables.payload });
          if (variables.payload.email_template_id)
            (newPayload['company_email_template'] =
              all_company_email_template.find(
                ({ id }) => id === variables.payload.email_template_id,
              ) as any), //TODO: punith fix this;
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
type UpdateWorkflowAction = {
  id: string;
  payload: DatabaseTableUpdate['workflow_action'];
};
const updateWorkflowAction = async ({ id, payload }: UpdateWorkflowAction) => {
  const { data, error } = await supabase
    .from('workflow_action')
    .update(payload)
    .eq('id', id)
    .select(WORKFLOW_ACTIONS_SELECT);
  if (error) throw new Error(error.message);
  return data;
};

export const useWorkflowActionCreate = (args: WorkflowActionKeys) => {
  const {
    emailTemplates: { data: all_company_email_template },
  } = useAuthDetails();
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
        company_email_template: all_company_email_template.find(
          ({ id }) => id === payload.email_template_id,
        ) as any, //TODO: punith fix this
      });
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
type InsertWorkflowAction = {
  id: string;
  workflow_id: string;
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
    .select(WORKFLOW_ACTIONS_SELECT)
    .single();
  if (error) throw new Error(error.message);
  return data;
};
