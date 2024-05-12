import { createContext, ReactNode, useContext } from 'react';

import useProviderJobApplicationActions from './hooks';
import { JobApplicationContext } from './types';

const JobApplicationsContext = createContext(undefined);

const JobApplicationProvider = ({ children }: { children: ReactNode }) => {
  const value = useProviderJobApplicationActions();
  return (
    <JobApplicationsContext.Provider value={value}>
      {children}
    </JobApplicationsContext.Provider>
  );
};

export default JobApplicationProvider;

export const useJobApplications = (): JobApplicationContext => {
  const value = useContext(JobApplicationsContext);
  return { ...value };
};

export const useJobApplicationsForJob = (jobId: string) => {
  const value = useProviderJobApplicationActions(jobId);
  return { ...value };
};
