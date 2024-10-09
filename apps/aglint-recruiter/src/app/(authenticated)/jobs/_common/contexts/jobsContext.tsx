'use client';

import { type DatabaseView } from '@aglint/shared-types';
import { createContext, memo, type ReactNode, useMemo } from 'react';

import { useTenant } from '@/company/hooks';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import {
  useJobDelete,
  useJobsRead,
  useJobsSync,
  useJobUpdate,
} from '@/queries/jobs';
import type { JobUpdate } from '@/queries/jobs/types';

const useJobContext = () => {
  const { recruiter_id } = useTenant();

  const { checkPermissions, devlinkProps: getDevlinkProps } =
    useRolesAndPermissions();

  const manageJob = useMemo(
    () => checkPermissions(['manage_job']),
    [checkPermissions],
  );

  const jobs = useJobsRead();

  const { mutateAsync: handleSync } = useJobsSync();

  const { mutate: jobUpdate } = useJobUpdate();

  const { mutate: jobDelete } = useJobDelete();

  const initialLoad = !!(jobs.status !== 'pending' && !!recruiter_id);

  const handleJobPin = (
    args: Pick<DatabaseView['job_view'], 'id' | 'is_pinned'>,
  ) => {
    return jobUpdate({ recruiter_id, ...args } as JobUpdate);
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
    initialLoad,
    manageJob,
    devlinkProps,
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
