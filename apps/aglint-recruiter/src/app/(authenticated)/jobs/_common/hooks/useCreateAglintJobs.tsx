import { api } from '@/trpc/client';
import toast from '@/utils/toast';

export const useCreateAglintJobs = () =>
  api.jobs.create.aglint.useMutation({
    onError: () => toast.error('Unable to create job'),
  });
