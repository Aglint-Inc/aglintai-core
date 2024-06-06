import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobs } from '../JobsContext';

const useJobContext = () => {
  const params = useParams();
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
  return { job, job_id, jobLoad };
};

export { useJobContext };
