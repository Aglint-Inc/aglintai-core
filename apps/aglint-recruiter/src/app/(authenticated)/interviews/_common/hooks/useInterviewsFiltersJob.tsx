import { api } from '@/trpc/client';

export const useInterviewsFiltersJob = api.interviews.filters.jobs.useQuery;
