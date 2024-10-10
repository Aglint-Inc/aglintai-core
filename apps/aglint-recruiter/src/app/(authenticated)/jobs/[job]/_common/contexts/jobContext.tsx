'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, memo, type PropsWithChildren, useMemo } from 'react';

import { useTenant } from '@/company/hooks';
import { JOB_NOT_FOUND } from '@/job/constants/jobNotFound';
import { useCurrentJob } from '@/job/hooks/useCurrentJob';
import { useJobRead } from '@/job/hooks/useJobRead';
import { useJobsContext } from '@/jobs/hooks';
import {
  jobQueries,
  useJobSync,
  useUploadApplication,
  useUploadCsv,
  useUploadResume,
} from '@/queries/job';
import { useJobUpdate } from '@/queries/jobs';

import { useJobPolling } from '../hooks/useJobPolling';

const useJobContext = () => {
  const { recruiter_id } = useTenant();
  const { mutateAsync: syncJob } = useJobSync();

  const { devlinkProps } = useJobsContext();

  const { job_id } = useCurrentJob();

  const job = useJobRead();

  if (!job) throw new Error(JOB_NOT_FOUND);

  useJobPolling();

  const total = useMemo(
    () =>
      Object.values(job.section_count ?? {}).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0),
    [
      job.section_count.disqualified,
      job.section_count.disqualified,
      job.section_count.disqualified,
      job.section_count.disqualified,
    ],
  );

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

  return {
    job,
    recruiter_id,
    total,
    job_id,
    interviewPlans,
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
