import { useRouter } from 'next/router';

import type { JobRequisite } from '../job';
import { jobQueryKeys } from '../job/keys';

export const jobDashboardQueryKeys = {
  dashboard: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'dashboard'] as string[],
  }),
  matches: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'matches'],
  }),
  skills: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'skills'],
  }),
  locations: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'locations'],
  }),
  assessments: (args: JobRequisite) => ({
    queryKey: [
      ...jobDashboardQueryKeys.dashboard(args).queryKey,
      'assessments',
    ],
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
  interviewPlanEnabled: (args: JobRequisite) => ({
    queryKey: [
      ...jobDashboardQueryKeys.dashboard(args).queryKey,
      'interviewPlanEnabled',
    ],
  }),
  workflows: (args: JobRequisite) => ({
    queryKey: [...jobDashboardQueryKeys.dashboard(args).queryKey, 'workflows'],
  }),
} as const;

export const useJobId = () => {
  const router = useRouter();
  const job_id = (
    (router?.pathname ?? null).startsWith('/jobs/[id]')
      ? router?.query?.id ?? null
      : null
  ) as string;
  return { job_id };
};
