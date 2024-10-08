import {
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { type JobRequisite } from '../job';
import { jobWorkflowMutationKeys } from './keys';

export const useJobWorkflowMutations = ({ id }: JobRequisite) => {
  const { mutationKey: deleteKey } = jobWorkflowMutationKeys.delete({
    id,
  });
  const remove = useMutationState({
    filters: { mutationKey: deleteKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as DisconnectJobWorkflow,
  });
  return { remove };
};

export const useJobWorkflowDisconnect = ({ id }: JobRequisite) => {
  const { mutationKey } = jobWorkflowMutationKeys.delete({
    id,
  });
  const queryKey = getQueryKey(api.workflows.read, undefined, 'query');
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
