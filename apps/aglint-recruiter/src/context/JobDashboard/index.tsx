import { type ReactNode, createContext, useContext } from 'react';

import useProviderJobDashboardActions from './hooks';
import { type JobDashboardContextType } from './types';

const JobDashboardContext =
  createContext<ReturnType<typeof useProviderJobDashboardActions>>(undefined);

const JobDashboardProvider = ({ children }: { children: ReactNode }) => {
  const value = useProviderJobDashboardActions();
  return (
    <JobDashboardContext.Provider value={value}>
      {children}
    </JobDashboardContext.Provider>
  );
};

export default JobDashboardProvider;

export const useJobDashboard = (): JobDashboardContextType => {
  const value = useContext(JobDashboardContext);
  return { ...value };
};
