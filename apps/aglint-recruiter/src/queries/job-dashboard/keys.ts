import { useRouter } from 'next/router';

import { appKey } from '..';

export const jobDashboardQueryKeys = {
  all: { queryKey: [appKey, 'job_dashboard'] as string[] },
  job: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }],
  }),
  matches: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'matches'],
  }),
  skills: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'skills'],
  }),
  locations: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'locations'],
  }),
  assessments: ({ job_id }: { job_id: string }) => ({
    queryKey: [
      ...jobDashboardQueryKeys.all.queryKey,
      { job_id },
      'assessments',
    ],
  }),
  tenureAndExperience: ({ job_id }: { job_id: string }) => ({
    queryKey: [
      ...jobDashboardQueryKeys.all.queryKey,
      { job_id },
      'tenureAndExperience',
    ],
  }),
  schedules: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'schedules'],
  }),
  interviewPlanEnabled: ({ job_id }: { job_id: string }) => ({
    queryKey: [
      ...jobDashboardQueryKeys.all.queryKey,
      { job_id },
      'interviewPlanEnabled',
    ],
  }),
  workflows: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'workflows'],
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
