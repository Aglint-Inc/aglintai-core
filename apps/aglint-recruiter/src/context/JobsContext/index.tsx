import { type ReactNode, createContext, useContext } from 'react';

import useJobActions from './hooks';
import { type JobContext } from './types';

const JobsContext = createContext(undefined);

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobActions();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default HomeProvider;

export const useJobs = (): JobContext => {
  const value = useContext(JobsContext);
  return { ...value };
};
