import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

import { handleJobApi } from '@/src/apiUtils/job/utils';
import { jobQueries } from '@/src/queries/job';
import {
  useRescoreApplications,
  useUploadApplication,
  useUploadCsv,
  useUploadResume,
} from '@/src/queries/job-applications';
import { useJobUpdate } from '@/src/queries/jobs';
import { Job } from '@/src/queries/jobs/types';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobDashboardStore } from '../JobDashboard/store';
import { useJobs } from '../JobsContext';
import { hashCode, validateDescription, validateJd } from './utils';

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
    (job.processing_count.fetching !== 0 ||
      job.processing_count.processing !== 0);

  const jobPolling =
    !!job && (scoreParameterPollEnabled || applicationScoringPollEnabled);

  const { dismissWarnings } = useJobDashboardStore(({ dismissWarnings }) => ({
    dismissWarnings,
  }));

  const jdValidity = !validateJd(job?.draft?.jd_json);

  const status = job &&
    jobLoad && {
      loading: job.scoring_criteria_loading,
      description_error:
        !job.scoring_criteria_loading &&
        validateDescription(job?.draft?.description ?? ''),
      description_changed:
        !job.scoring_criteria_loading &&
        !dismissWarnings.job_description &&
        hashCode(job?.draft?.description ?? '') !== job?.description_hash,
      jd_json_error: !job.scoring_criteria_loading && !jdValidity,
      scoring_criteria_changed:
        hashCode(JSON.stringify(job?.draft?.jd_json ?? {})) !==
        hashCode(JSON.stringify(job?.jd_json ?? {})),
    };

  const interviewPlans = useQuery(jobQueries.interview_plans({ id: job_id }));

  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();
  const { mutateAsync: handleRescoreApplications } = useRescoreApplications();

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

  const handleJobPublish = async (job: Job) => {
    if (recruiter) {
      try {
        await handleJobAsyncUpdate(job.id, {
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

  const handleRegenerateJd = async (job: Job) => {
    await handleJobAsyncUpdate(job?.id, {
      scoring_criteria_loading: true,
    });
    await handleGenerateJd(job.id);
  };

  const { mutate: handleUploadApplication } = useUploadApplication({
    job_id,
  });
  const { mutate: handleUploadResume } = useUploadResume({
    job_id,
  });
  const { mutate: handleUploadCsv } = useUploadCsv({
    job_id,
  });

  useQueries({
    queries: [
      jobQueries.job({
        id: job_id,
        enabled: !!job,
        initialData: job,
        queryClient,
      }),
      jobQueries.polling({
        id: job_id,
        enabled: jobPolling,
        queryClient,
      }),
    ],
  });

  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!jobPolling) {
      queryClient.refetchQueries({
        queryKey: jobQueries.job({ id: job_id }).queryKey,
      });
    }
  }, [jobPolling]);

  return {
    job,
    job_id,
    jobLoad,
    scoreParameterPollEnabled,
    applicationScoringPollEnabled,
    jobPolling,
    interviewPlans,
    handleJobAsyncUpdate,
    handleJobUpdate,
    handleJobPublish,
    handleRegenerateJd,
    handleRescoreApplications,
    handleUploadApplication,
    handleUploadResume,
    handleUploadCsv,
    status,
    jdValidity,
  };
};

export { useJobContext };

export const handleGenerateJd = async (job_id: string) => {
  return await handleJobApi('profileScore', { job_id });
};
