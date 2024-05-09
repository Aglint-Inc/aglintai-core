import { createContext, ReactNode, useContext } from 'react';

import useJobActions from './hooks';
import { JobContext } from './types';

const JobsContext = createContext(undefined);

const JobsProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobActions();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsProvider;

export const useJobs = (): JobContext => {
  const value = useContext(JobsContext);
  return { ...value };
};
