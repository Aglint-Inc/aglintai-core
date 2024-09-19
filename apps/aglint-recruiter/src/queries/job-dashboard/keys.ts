import type { JobRequisite } from '../job';
import { jobQueries } from '../job';

export const jobDashboardQueryKeys = {
  dashboard: (args: JobRequisite) => ({
    queryKey: [...jobQueries.job(args).queryKey, 'dashboard'] as string[],
  }),
  matches: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'matches'],
  }),
  tenureAndExperience: (args: JobRequisite) => ({
    queryKey: [
      ...jobDashboardQueryKeys.dashboard(args).queryKey,
      'tenureAndExperience',
    ],
  }),
  schedules: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'schedules'],
  }),
  workflows: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'workflows'],
  }),
} as const;
