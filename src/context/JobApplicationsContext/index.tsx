import { createContext, ReactNode, useContext } from 'react';

import useJobApplicationActions from './hooks';
import { initialJobApplicationsContext } from './utils';

const JobApplicationsContext = createContext(initialJobApplicationsContext);

const JobApplicationProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobApplicationActions();
  return (
    <JobApplicationsContext.Provider value={value}>
      {children}
    </JobApplicationsContext.Provider>
  );
};

export default JobApplicationProvider;

export const useJobApplications = () => {
  const value = useContext(JobApplicationsContext);
  return { ...value };
};

export const useJobApplicationsForJob = (jobId: string) => {
  const value = useJobApplicationActions(jobId);
  return { ...value };
};
