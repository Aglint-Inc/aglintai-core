import { useRouter } from 'next/router';

import { useJobs } from '@/src/context/JobsContext';
import PAGES from '@/src/utils/routing/pageRouting';

import { appKey } from '..';

export const jobAssessmentQueryKeys = {
  all: { queryKey: [appKey, 'job_assessment'] as string[] },
  assessments: ({ job_id }: { job_id: string }) => ({
    queryKey: [...jobAssessmentQueryKeys.all.queryKey, { job_id }],
  }),
} as const;

export const useCurrentJob = () => {
  const router = useRouter();
  const { jobs } = useJobs();
  const job_id = (
    (router?.pathname ?? null).startsWith(PAGES['/jobs']())
      ? router?.query?.id ?? null
      : null
  ) as string;
  const job = jobs.data.find((job) => job.id === job_id) ?? null;
  return { job_id, job };
};
