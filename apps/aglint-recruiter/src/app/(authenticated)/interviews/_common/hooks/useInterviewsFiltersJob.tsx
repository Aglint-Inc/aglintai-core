import type { Jobs } from '@/routers/interviews/filters/jobs';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useInterviewsFiltersJob = (): ProcedureQuery<Jobs> =>
  api.interviews.filters.jobs.useQuery();
