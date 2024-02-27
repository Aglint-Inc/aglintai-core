import { useRouter } from 'next/router';

import { useJobs } from '@/src/context/JobsContext';
import { pageRoutes } from '@/src/utils/pageRouting';

export const jobAssessmentQueryKeys = {
  all: { queryKey: ['aglint_job_assessment'] as string[] },
  assessments: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobAssessmentQueryKeys.all.queryKey, { job_id }],
  }),
} as const;

export const useCurrentJob = () => {
  const router = useRouter();
  const { jobsData } = useJobs();
  const job_id = (
    (router?.pathname ?? null).startsWith(pageRoutes.JOBS)
      ? router?.query?.id ?? null
      : null
  ) as string;
  const job = jobsData?.jobs?.find((job) => job.id === job_id) ?? null;
  return { job_id, job };
};
