import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { jobQueries } from '@/src/queries/job';
import { useRescoreApplications } from '@/src/queries/job-applications';

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

  const scoreParameterPollEnabled =
    !!job && (job?.scoring_criteria_loading ?? false);

  const applicationScoringPollEnabled =
    !!job &&
    job?.status === 'published' &&
    ((job?.processing_count?.['not started'] ?? 0) !== 0 ||
      (job?.processing_count?.processing ?? 0) !== 0);

  const interviewPlans = useQuery(jobQueries.interview_plans({ id: job_id }));

  const { mutateAsync: handleRescoreApplications } = useRescoreApplications();

  useQueries({
    queries: [
      jobQueries.job_application_count({
        id: job_id,
        enabled: !!job,
        queryClient,
        initialData: job?.count,
      }),
      jobQueries.job_processing_count({
        id: job_id,
        enabled: !!job,
        queryClient,
        initialData: job?.processing_count,
      }),
      jobQueries.application_scoring({
        id: job_id,
        enabled: applicationScoringPollEnabled,
        queryClient,
      }),
      jobQueries.scoring_param({
        id: job_id,
        enabled: scoreParameterPollEnabled,
        queryClient,
        initialData:
          !!job?.description_hash &&
          !!job?.draft &&
          !!job?.parameter_weights &&
          !!job?.scoring_criteria_loading
            ? {
                description_hash: job?.description_hash,
                draft: job?.draft,
                parameter_weights: job?.parameter_weights,
                scoring_criteria_loading: job?.scoring_criteria_loading,
              }
            : undefined,
      }),
    ],
  });

  return {
    job,
    job_id,
    jobLoad,
    scoreParameterPollEnabled,
    applicationScoringPollEnabled,
    interviewPlans,
    handleRescoreApplications,
  };
};

export { useJobContext };
