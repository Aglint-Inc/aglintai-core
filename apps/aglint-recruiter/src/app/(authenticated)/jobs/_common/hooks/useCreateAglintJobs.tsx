import { api } from '@/trpc/client';

export const useCreateAglintJobs = api.jobs.create.aglint.useMutation;
