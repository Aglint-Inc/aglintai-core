import { api } from '@/trpc/client';

export const useCreateLeverJobs = api.jobs.create.lever.useMutation;
