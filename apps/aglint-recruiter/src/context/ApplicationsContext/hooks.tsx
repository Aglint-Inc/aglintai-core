import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { applicationsQueries } from '@/src/queries/job-applications';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobs } from '../JobsContext';

export const useApplicationsActions = (job_id: string = undefined) => {
  const { recruiter } = useAuthDetails();
  const { query } = useRouter();
  const { jobs, initialLoad: jobLoad } = useJobs();

  const initialJobLoad = !!(recruiter?.id && jobLoad);
  const jobId = job_id ?? (query?.id as string);

  const job = useMemo(
    () =>
      initialJobLoad
        ? jobs.data.find((job) => job.id === jobId) ?? null
        : undefined,
    [initialJobLoad, jobs.status, jobs.data, jobId],
  );

  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'new',
      count: job?.count?.new ?? 0,
    }),
  );
  const screeningApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'screening',
      count: job?.count?.screening ?? 0,
    }),
  );
  const assessmentApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'assessment',
      count: job?.count?.assessment ?? 0,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'interview',
      count: job?.count?.interview ?? 0,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'qualified',
      count: job?.count?.qualified ?? 0,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id: jobId,
      status: 'disqualified',
      count: job?.count?.disqualified ?? 0,
    }),
  );
  return {
    job,
    initialJobLoad,
    newApplications,
    screeningApplications,
    assessmentApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
  };
};
