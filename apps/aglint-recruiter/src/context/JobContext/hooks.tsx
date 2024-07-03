import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { handleJobApi } from '@/src/apiUtils/job/utils';
import { jobQueries } from '@/src/queries/job';
import { useRescoreApplications } from '@/src/queries/job-applications';
import { useJobUpdate } from '@/src/queries/jobs';
import { Job } from '@/src/queries/jobs/types';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { hashCode } from '../JobDashboard/hooks';
import { useJobs } from '../JobsContext';

const useJobContext = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  if (!params.id)
    throw Error(
      'Invalid pathname, context must be wrapped to a page with [id]',
    );

  const { recruiter_id, recruiter } = useAuthDetails();

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

  const scoreParameterPollEnabled = !!job && job.scoring_criteria_loading;

  const applicationScoringPollEnabled =
    !!job &&
    job.status === 'published' &&
    (job.processing_count['not started'] !== 0 ||
      job.processing_count.processing !== 0);

  const interviewPlans = useQuery(jobQueries.interview_plans({ id: job_id }));

  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();
  const { mutateAsync: handleRescoreApplications } = useRescoreApplications();

  const handleJobPublish = async (job: Job) => {
    if (recruiter) {
      try {
        await jobAsyncUpdate({
          ...job,
          ...job.draft,
          status: 'published',
          description_hash: hashCode(job.draft.description),
        });
        return true;
      } catch {
        return false;
      }
    }
  };

  const handleJobUpdate = async (
    jobId: string,
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      jobUpdate({ ...job, id: jobId, recruiter_id: recruiter.id });
    }
  };

  const handleJobAsyncUpdate = async (
    jobId: string,
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    if (recruiter) {
      try {
        return await jobAsyncUpdate({
          ...job,
          id: jobId,
          recruiter_id: recruiter.id,
        });
      } catch {
        //
      }
    }
  };

  const handleRegenerateJd = async (job: Job) => {
    await handleJobAsyncUpdate(job?.id, {
      scoring_criteria_loading: true,
    });
    await handleGenerateJd(job.id);
  };

  useQueries({
    queries: [
      jobQueries.job({
        id: job_id,
        enabled: !!job && scoreParameterPollEnabled,
        initialData: job,
        queryClient,
      }),
      jobQueries.application_polling({
        id: job_id,
        enabled: applicationScoringPollEnabled,
        queryClient,
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
    handleJobAsyncUpdate,
    handleJobUpdate,
    handleJobPublish,
    handleRegenerateJd,
    handleRescoreApplications,
  };
};

export { useJobContext };

export const handleGenerateJd = async (job_id: string) => {
  return await handleJobApi('profileScore', { job_id });
};
