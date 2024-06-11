import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { useJobCount } from '@/src/queries/job';
import { jobsQueryKeys } from '@/src/queries/jobs/keys';
import { Job } from '@/src/queries/jobs/types';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobs } from '../JobsContext';

const useJobContext = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  if (!params.id)
    throw Error(
      'Invalid pathname, context must be wrapped to a page with [id]',
    );
  const { recruiter_id } = useAuthDetails();
  const { jobs, initialLoad: jobsLoad } = useJobs();
  const jobLoad = useMemo(
    () => !!(recruiter_id && jobsLoad),
    [recruiter_id, jobsLoad],
  );
  const job_id = useMemo(() => params.id as string, [params.id]);
  const job = useMemo(
    () =>
      jobLoad
        ? (jobs.data ?? []).find((job) => job.id === job_id) ?? null
        : undefined,
    [jobs.data, job_id, jobs.status, jobLoad],
  );
  const { data: count, invalidate: handleRefreshApplicationCount } =
    useJobCount(job);
  useEffect(() => {
    if (count) {
      queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
        prev.reduce((acc, curr) => {
          if (curr.id === job_id) acc.push({ ...curr, count });
          else acc.push(curr);
          return acc;
        }, [] as Job[]),
      );
    }
  }, [count]);
  return { job, job_id, jobLoad, handleRefreshApplicationCount };
};

export { useJobContext };
