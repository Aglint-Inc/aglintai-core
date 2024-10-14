'use client';

import type { DatabaseTableUpdate, DatabaseView } from '@aglint/shared-types';
import { createContext, memo, type ReactNode, useMemo } from 'react';

import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useJobs } from '@/jobs/hooks/useJobs';
import { useJobsPolling } from '@/jobs/hooks/useJobsPolling';
import { useJobDelete, useJobsSync, useJobUpdate } from '@/queries/jobs';

const useJobContext = () => {
  const { recruiter_id } = useTenant();

  const { checkPermissions, devlinkProps: getDevlinkProps } =
    useRolesAndPermissions();

  const manageJob = useMemo(
    () => checkPermissions(['manage_job']),
    [checkPermissions],
  );

  const jobs = useJobs();

  if (!jobs) throw new Error('No jobs found');

  const { isPolling } = useJobsPolling();

  const { mutateAsync: handleSync } = useJobsSync();

  const { mutate: jobUpdate } = useJobUpdate();

  const { mutate: jobDelete } = useJobDelete();

  const handleJobPin = (
    args: Pick<DatabaseView['job_view'], 'id' | 'is_pinned'>,
  ) => {
    return jobUpdate({
      recruiter_id,
      ...args,
    } as DatabaseTableUpdate['public_jobs']);
  };

  const handleJobsSync = async () => {
    try {
      return await handleSync({ recruiter_id });
    } catch {
      //
    }
  };

  const handleJobDelete = async (jobId: string) => {
    return jobDelete(jobId);
  };

  const devlinkProps = useMemo(
    () => getDevlinkProps(['manage_job']),
    [getDevlinkProps],
  );

  const value = {
    jobs,
    handleJobDelete,
    handleJobsSync,
    handleJobPin,
    manageJob,
    devlinkProps,
    isPolling,
  };

  return value;
};

export const JobsContext = createContext<
  ReturnType<typeof useJobContext> | undefined
>(undefined);

export const JobsProvider = memo(({ children }: { children: ReactNode }) => {
  const value = useJobContext();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
});
JobsProvider.displayName = 'JobsProvider';
