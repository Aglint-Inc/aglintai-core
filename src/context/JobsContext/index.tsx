import { createContext, ReactNode, useContext } from 'react';

import useJobActions from './hooks';
import { initialJobContext } from './utils';

const JobsContext = createContext(initialJobContext);

const JobsProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobActions();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsProvider;

export const useJobs = () => {
  const value = useContext(JobsContext);
  return { ...value };
};
