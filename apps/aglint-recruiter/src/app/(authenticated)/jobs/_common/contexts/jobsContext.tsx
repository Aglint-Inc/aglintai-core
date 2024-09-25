import { type DatabaseView } from '@aglint/shared-types';
import { createContext, memo, type ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { handleJobApi } from '@/apiUtils/job/utils';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import {
  useJobCreate,
  useJobDelete,
  useJobsRead,
  useJobsSync,
  useJobUpdate,
} from '@/queries/jobs';

const useJobContext = () => {
  const { recruiter, recruiter_id } = useAuthDetails();

  const { checkPermissions, devlinkProps: getDevlinkProps } =
    useRolesAndPermissions();

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
      await handleSync({ recruiter_id });
    } catch {
      //
    }
  };

  const { mutateAsync: jobCreate } = useJobCreate();

  const initialLoad = !!(jobs.status !== 'pending' && recruiter?.id);

  const handleGenerateJd = useCallback(
    async (job_id: string, regenerate = false) => {
      return await handleJobApi('profileScore', { job_id, regenerate });
    },
    [],
  );

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
    jobs,
    handleJobCreate,
    handleJobsRefresh: jobs.refetch,
    handleJobDelete,
    handleGenerateJd,
    handleJobsSync,
    handleJobPin,
    initialLoad,
    manageJob,
    devlinkProps,
  };

  return value;
};

export const JobsContext =
  createContext<ReturnType<typeof useJobContext>>(undefined);

export const JobsProvider = memo(({ children }: { children: ReactNode }) => {
  const value = useJobContext();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
});
JobsProvider.displayName = 'JobsProvider';
