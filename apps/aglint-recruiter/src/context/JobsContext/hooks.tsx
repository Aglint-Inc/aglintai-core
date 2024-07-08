/* eslint-disable security/detect-object-injection */
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useMemo } from 'react';

import { useJobCreate, useJobDelete, useJobsRead } from '@/src/queries/jobs';
import { Job } from '@/src/queries/jobs/types';

import { handleGenerateJd } from '../JobContext/hooks';

export const getActiveSection = ({
  isAssessmentEnabled,
  isSchedulingEnabled,
  isScreeningEnabled,
  job,
}: {
  isAssessmentEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScreeningEnabled: boolean;
  job: Pick<Job, 'phone_screen_enabled' | 'assessment'>;
}): Job['flags'] => ({
  new: true,
  screening: !!job?.phone_screen_enabled && isScreeningEnabled,
  assessment: !!job?.assessment && isAssessmentEnabled,
  disqualified: true,
  interview: isSchedulingEnabled,
  qualified: true,
});

const useJobActions = () => {
  const {
    recruiter,
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
  } = useAuthDetails();

  const jobs = useJobsRead();

  const customJobs = useMemo(
    () => ({
      ...jobs,
      data: (jobs?.data ?? []).map(({ flags, ...job }) => ({
        ...job,
        flags: {
          ...flags,
          screening: !!(flags?.screening && isScreeningEnabled),
          assessment: !!(flags?.assessment && isAssessmentEnabled),
          interview: !!(flags?.interview && isSchedulingEnabled),
        },
      })),
    }),
    [
      jobs,
      jobs.status,
      isScreeningEnabled,
      isAssessmentEnabled,
      isSchedulingEnabled,
    ],
  );

  const { mutateAsync: jobCreate } = useJobCreate();

  const initialLoad = !!(jobs.status !== 'pending' && recruiter?.id);

  const handleJobCreate = async (newJob: Parameters<typeof jobCreate>[0]) => {
    if (recruiter) {
      try {
        const data = await jobCreate(newJob);
        handleGenerateJd(data.id);
        return data;
      } catch {
        //
      }
    }
  };

  const { mutate: jobDelete } = useJobDelete();

  const handleJobDelete = async (jobId: string) => {
    if (recruiter) {
      jobDelete(jobId);
    }
  };

  const value = {
    jobs: customJobs,
    handleJobCreate,
    handleJobsRefresh: jobs.refetch,
    handleJobDelete,
    initialLoad,
  };

  return value;
};

export default useJobActions;
