/* eslint-disable security/detect-object-injection */
import { type DatabaseView } from '@aglint/shared-types';
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useMemo } from 'react';

import {
  useJobCreate,
  useJobDelete,
  useJobsRead,
  useJobsSync,
  useJobUpdate,
} from '@/src/queries/jobs';
import { type Job } from '@/src/queries/jobs/types';

import { type ApplicationStore } from '../ApplicationContext/store';
import { handleGenerateJd } from '../JobContext/hooks';
import { useRolesAndPermissions } from '../RolesAndPermissions/RolesAndPermissionsContext';

export const getActiveSection = ({
  isAssessmentEnabled,
  isSchedulingEnabled,
  isScreeningEnabled,
  isScoringEnabled,
  job,
}: {
  isAssessmentEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScreeningEnabled: boolean;
  isScoringEnabled: boolean;
  job: Pick<Job, 'phone_screen_enabled' | 'assessment'>;
  // eslint-disable-next-line no-unused-vars
}): { [id in ApplicationStore['tab']]: boolean } => ({
  Resume: true,
  Details: isScoringEnabled,
  Screening: !!job?.phone_screen_enabled && isScreeningEnabled,
  Assessment: !!job?.assessment && isAssessmentEnabled,
  Activity: true,
  Interview: isSchedulingEnabled,
  Tasks: isSchedulingEnabled,
});

const useJobActions = () => {
  const { recruiter, recruiter_id } = useAuthDetails();

  const {
    checkPermissions,
    devlinkProps: getDevlinkProps,
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
  } = useRolesAndPermissions();

  const manageJob = useMemo(
    () => checkPermissions(['manage_job']),
    [checkPermissions],
  );

  const jobs = useJobsRead(manageJob);

  const { mutateAsync: handleSync } = useJobsSync();

  const { mutate: jobUpdate } = useJobUpdate();

  const handleJobPin = (
    args: Pick<DatabaseView['job_view'], 'id' | 'is_pinned'>,
  ) => {
    try {
      jobUpdate({ recruiter_id, ...args });
    } catch {
      //
    }
  };

  const handleJobsSync = async () => {
    try {
      await handleSync();
    } catch {
      //
    }
  };

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

  const devlinkProps = useMemo(
    () => getDevlinkProps(['manage_job']),
    [getDevlinkProps],
  );

  const value = {
    jobs: customJobs,
    handleJobCreate,
    handleJobsRefresh: jobs.refetch,
    handleJobDelete,
    handleJobsSync,
    handleJobPin,
    initialLoad,
    manageJob,
    devlinkProps,
  };

  return value;
};

export default useJobActions;
