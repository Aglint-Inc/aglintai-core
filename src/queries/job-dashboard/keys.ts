import { useRouter } from 'next/router';

import { pageRoutes } from '@/src/utils/pageRouting';

export const jobDashboardQueryKeys = {
  all: { queryKey: ['aglint_job_dashboard'] as string[] },
  matches: ({ job_id }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'matches']
  }),
  skills: ({ job_id }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'skills']
  }),
  locations: ({ job_id }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'locations']
  }),
  assessments: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobDashboardQueryKeys.all.queryKey, { job_id }, 'assessments']
  }),
  tenureAndExperience: ({ job_id }: { job_id: string }) => ({
    queryKey: [
      ...jobDashboardQueryKeys.all.queryKey,
      { job_id },
      'tenureAndExperience'
    ]
  })
} as const;

export const useJobId = () => {
  const router = useRouter();
  const job_id = (
    (router?.pathname ?? null).startsWith(pageRoutes.JOBDASHBOARD)
      ? router?.query?.id ?? null
      : null
  ) as string;
  return { job_id };
};
