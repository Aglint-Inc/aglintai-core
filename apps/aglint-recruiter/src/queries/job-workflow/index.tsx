import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Workflow } from '@/src/types/workflow.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { GC_TIME } from '..';
import { JobRequisite } from '../job';
import { workflowQueryKeys } from '../workflow/keys';
import { jobWorkflowMutationKeys, jobWorkflowQueryKeys } from './keys';

export const useJobWorkflow = (args: JobRequisite) => {
  const { id } = args;
  const { queryKey } = jobWorkflowQueryKeys.workflow(args);
  return useQuery({
    queryKey,
    enabled: !!id,
    queryFn: () => getJobWorkflow(args),
    gcTime: id ? GC_TIME : 0,
  });
};
export type JobWorkflow = Awaited<ReturnType<typeof getJobWorkflow>>[number];
const getJobWorkflow = async ({ id }: JobRequisite) => {
  const { data, error } = await supabase
    .from('workflow_job_relation')
    .select('workflow(*)')
    .eq('job_id', id);
  if (error) throw new Error(error.message);
  return (data ?? []).map(({ workflow }) => workflow);
};

export const useJobWorkflowUpdateMutations = (args: JobRequisite) => {
  const { mutationKey } = jobWorkflowMutationKeys.update(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as ConnectJobWorkflow,
  });
};

export const useJobWorkflowDeleteMutations = (args: JobRequisite) => {
  const { mutationKey } = jobWorkflowMutationKeys.delete(args);
  return useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as DisconnectJobWorkflow,
  });
};

export const useJobWorkflowConnect = (args: JobRequisite) => {
  const { recruiter_id } = useAuthDetails();
  const { mutationKey } = jobWorkflowMutationKeys.update(args);
  const { queryKey } = jobWorkflowQueryKeys.workflow(args);
  const { queryKey: workflowQueryKey } = workflowQueryKeys.workflow({
    recruiter_id,
  });
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: connectJobWorkflow,
    onMutate: ({ workflow_ids }) => {
      const previousJobWorkflows =
        queryClient.getQueryData<JobWorkflow[]>(queryKey);

      const workflows = queryClient
        .getQueryData<Workflow[]>(workflowQueryKey)
        .filter(({ id }) => workflow_ids.includes(id))
        // eslint-disable-next-line no-unused-vars
        .map(({ jobs, ...workflow }) => workflow);
      const newJobWorkflows = structuredClone(previousJobWorkflows);
      newJobWorkflows.push(...structuredClone(workflows));
      queryClient.setQueryData<JobWorkflow[]>(queryKey, newJobWorkflows);
    },
    onError: (_error, variables) => {
      toast.error('Unable to connect workflow');
      const previousJobWorkflows =
        queryClient.getQueryData<JobWorkflow[]>(queryKey);
      const newJobWorkflows = structuredClone(previousJobWorkflows).reduce(
        (acc, curr) => {
          if (!variables.workflow_ids.includes(curr.id)) acc.push(curr);
          return acc;
        },
        [] as JobWorkflow[],
      );
      queryClient.setQueryData<JobWorkflow[]>(queryKey, newJobWorkflows);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: workflowQueryKey });
    },
  });
};
type ConnectJobWorkflow = {
  job_id: string;
  workflow_ids: string[];
};
const connectJobWorkflow = async ({
  job_id,
  workflow_ids,
}: ConnectJobWorkflow) => {
  const payload = workflow_ids.map((workflow_id) => ({ workflow_id, job_id }));
  const { error } = await supabase
    .from('workflow_job_relation')
    .insert(payload);
  if (error) throw new Error(error.message);
};

export const useJobWorkflowDisconnect = (args: JobRequisite) => {
  const { recruiter_id } = useAuthDetails();
  const { mutationKey } = jobWorkflowMutationKeys.delete(args);
  const { queryKey } = jobWorkflowQueryKeys.workflow(args);
  const { queryKey: workflowQueryKey } = workflowQueryKeys.workflow({
    recruiter_id,
  });
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: disconnectJobWorkflow,
    onSuccess: async (_data, variables) => {
      const prevWorkflows = queryClient.getQueryData<JobWorkflow[]>(queryKey);
      const newWorkflows = structuredClone(prevWorkflows).reduce(
        (acc, curr) => {
          if (curr.id !== variables.workflow_id) acc.push(curr);
          return acc;
        },
        [] as JobWorkflow[],
      );
      queryClient.setQueryData<JobWorkflow[]>(queryKey, newWorkflows);
      await queryClient.invalidateQueries({ queryKey: workflowQueryKey });
    },
  });
};
type DisconnectJobWorkflow = {
  job_id: string;
  workflow_id: string;
};
const disconnectJobWorkflow = async ({
  job_id,
  workflow_id,
}: DisconnectJobWorkflow) => {
  const { error } = await supabase
    .from('workflow_job_relation')
    .delete()
    .eq('job_id', job_id)
    .eq('workflow_id', workflow_id);
  if (error) throw new Error(error.message);
};
