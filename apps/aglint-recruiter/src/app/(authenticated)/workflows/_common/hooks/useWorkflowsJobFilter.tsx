import type { Jobs } from '@/routers/workflows/filters/jobs';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useWorkflowsJobFilter = (): ProcedureQuery<Jobs> =>
  api.workflows.filters.jobs.useQuery();
