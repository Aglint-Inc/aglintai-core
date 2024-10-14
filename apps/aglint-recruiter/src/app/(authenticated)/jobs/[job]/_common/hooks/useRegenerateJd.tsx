import { api } from '@/trpc/client';

import { useCurrentJob } from './useCurrentJob';

export const useRegenerateJd = () => {
  const { job_id } = useCurrentJob();
  const mutation = api.jobs.job.jd.useMutation();
  const mutate = () => mutation.mutate({ id: job_id, type: 'regenerate' });
  const mutateAsync = async () => {
    try {
      await mutation.mutateAsync({ id: job_id, type: 'regenerate' });
    } catch {
      //
    }
  };
  return { ...mutation, mutate, mutateAsync };
};
