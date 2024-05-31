import { useRouter } from 'next/router';

import { useJobs } from '@/src/context/JobsContext';
import ROUTES from '@/src/utils/routing/routes';

import { JobRequisite } from '../job';
import { jobQueryKeys } from '../job/keys';

export const jobAssessmentQueryKeys = {
  assessments: (args: JobRequisite) => ({
    queryKey: [...jobQueryKeys.job(args).queryKey, 'assessments'],
  }),
} as const;

export const useCurrentJob = () => {
  const router = useRouter();
  const { jobs } = useJobs();
  const id = (
    (router?.pathname ?? null).startsWith(ROUTES['/jobs']())
      ? router?.query?.id ?? null
      : null
  ) as string;
  const job = jobs.data.find((job) => job.id === id) ?? null;
  return { id, job };
};
