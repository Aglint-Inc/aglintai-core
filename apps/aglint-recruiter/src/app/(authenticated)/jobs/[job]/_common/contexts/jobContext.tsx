import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  memo,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { JOB_NOT_FOUND } from '@/job/constants/jobNotFound';
import { useCurrentJob } from '@/job/hooks/useCurrentJob';
import { useJobsContext } from '@/jobs/hooks';
import {
  jobQueries,
  useInvalidateJobQueries,
  useJobSync,
  useUploadApplication,
  useUploadCsv,
  useUploadResume,
} from '@/queries/job';
import { useJobUpdate } from '@/queries/jobs';

const useJobContext = () => {
  const queryClient = useQueryClient();

  const { recruiter_id } = useTenant();
  const { isScoringEnabled } = useRolesAndPermissions();
  const { mutateAsync: syncJob } = useJobSync();

  const { jobs, devlinkProps } = useJobsContext();

  const { job_id } = useCurrentJob();

  const job = useMemo(
    () => (jobs ?? []).find((job) => job.id === job_id) ?? null,
    [jobs, job_id],
  );

  if (!job) throw new Error(JOB_NOT_FOUND);

  const scoringCriteriaLoading =
    isScoringEnabled && job?.scoring_criteria_loading;

  const total = useMemo(
    () =>
      Object.values(job?.section_count ?? {}).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0),
    [job?.section_count],
  );

  const scoreParameterPollEnabled = !!job && scoringCriteriaLoading;

  const applicationScoringPollEnabled =
    !!job &&
    isScoringEnabled &&
    job.status === 'published' &&
    (job.processing_count.fetching !== 0 ||
      job.processing_count.processing !== 0);

  const jobPolling =
    !!job && (scoreParameterPollEnabled || applicationScoringPollEnabled);

  const interviewPlans = useQuery(jobQueries.interview_plans({ id: job_id }));

  const { mutateAsync: jobAsyncUpdate, mutate: jobUpdate } = useJobUpdate();

  const handleJobUpdate = async (
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    jobUpdate({ ...job, id: job_id });
  };

  const handleJobAsyncUpdate = async (
    job: Omit<Parameters<typeof jobUpdate>[0], 'recruiter_id'>,
  ) => {
    try {
      return await jobAsyncUpdate({
        ...job,
        id: job_id,
      });
    } catch {
      //
    }
  };

  const handleJobSync = async () => {
    try {
      await syncJob({ job_id, recruiter_id });
    } catch {
      //
    }
  };

  const { mutateAsync: handleUploadApplication } = useUploadApplication({
    job_id,
  });
  const { mutateAsync: handleUploadResume } = useUploadResume({
    job_id,
  });
  const { mutateAsync: handleUploadCsv } = useUploadCsv({
    job_id,
  });

  const { revalidateJobQueries } = useInvalidateJobQueries();

  useQueries({
    queries: [
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
      revalidateJobQueries(job_id);
    }
  }, [jobPolling]);

  return {
    job,
    recruiter_id,
    total,
    job_id,

    scoreParameterPollEnabled,
    applicationScoringPollEnabled,
    jobPolling,
    interviewPlans,
    revalidateJobQueries: () => revalidateJobQueries(job_id),
    handleJobAsyncUpdate,
    handleJobUpdate,
    handleUploadApplication,
    handleUploadResume,
    handleUploadCsv,
    handleJobSync,
    devlinkProps,
  };
};

export const JobContext = createContext<
  ReturnType<typeof useJobContext> | undefined
>(undefined);

export const JobProvider = memo((props: PropsWithChildren) => {
  const value = useJobContext();
  return (
    <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
  );
});
JobProvider.displayName = 'JobProvider';
