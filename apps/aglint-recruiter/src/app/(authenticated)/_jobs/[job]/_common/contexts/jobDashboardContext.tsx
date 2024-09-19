import { createContext, memo, type PropsWithChildren } from 'react';

import { useJob } from '@/job/hooks/useJob';
import {
  useJobSchedules,
  useJobTenureAndExperience,
} from '@/queries/job-dashboard';

const useProviderJobDashboardContext = () => {
  const { job } = useJob();

  const tenureAndExperience = useJobTenureAndExperience(job);
  const schedules = useJobSchedules(job);

  const value = {
    schedules,
    tenureAndExperience,
  };

  return value;
};

export const JobDashboardContext =
  createContext<ReturnType<typeof useProviderJobDashboardContext>>(undefined);

export const JobDashboardProvider = memo(({ children }: PropsWithChildren) => {
  const value = useProviderJobDashboardContext();
  return (
    <JobDashboardContext.Provider value={value}>
      {children}
    </JobDashboardContext.Provider>
  );
});
JobDashboardProvider.displayName = 'JobDashboardProvider';
