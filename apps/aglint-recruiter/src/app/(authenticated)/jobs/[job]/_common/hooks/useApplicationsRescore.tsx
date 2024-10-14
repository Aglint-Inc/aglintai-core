import { api } from '@/trpc/client';
import toast from '@/utils/toast';

import { useCurrentJob } from './useCurrentJob';

export const useApplicationsRescore = () => {
  const { job_id } = useCurrentJob();
  const mutation = api.jobs.job.rescore.useMutation({
    onError: () => toast.error('Unable to rescore applications'),
  });
  const mutate = () => mutation.mutate({ id: job_id });
  const mutateAsync = async () => {
    try {
      await mutation.mutateAsync({ id: job_id });
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};
