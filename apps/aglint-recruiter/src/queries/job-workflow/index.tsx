import {
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { JobRequisite } from '../job';
import { workflowQueryKeys } from '../workflow/keys';
import { jobWorkflowMutationKeys } from './keys';

export const useJobWorkflowMutations = ({ id }: JobRequisite) => {
  const { mutationKey: updateKey } = jobWorkflowMutationKeys.update({
    id,
  });
  const { mutationKey: deleteKey } = jobWorkflowMutationKeys.delete({
    id,
  });
  const update = useMutationState({
    filters: { mutationKey: updateKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as ConnectJobWorkflow,
  });
  const remove = useMutationState({
    filters: { mutationKey: deleteKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as DisconnectJobWorkflow,
  });
  return { update, remove };
};

export const useJobWorkflowConnect = ({ id }: JobRequisite) => {
  const { mutationKey } = jobWorkflowMutationKeys.update({
    id,
  });
  const { queryKey } = workflowQueryKeys.workflows();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: connectJobWorkflow,
    onError: () => toast.error('Unable to connect workflow'),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey });
      toast.success('Workflow connected successfully');
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

export const useJobWorkflowDisconnect = ({ id }: JobRequisite) => {
  const { mutationKey } = jobWorkflowMutationKeys.delete({
    id,
  });
  const { queryKey } = workflowQueryKeys.workflows();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey,
    mutationFn: disconnectJobWorkflow,
    onError: () => toast.error('Unable to disconnect workflow'),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey });
      toast.success('Workflow disconnected successfully');
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
