import { createContext, ReactNode, useContext } from 'react';

import useJobActions from './hooks';
import { JobContext } from './types';

export const initialJobContext = {
  jobs: undefined,
  jobsData: { jobs: undefined },
  handleJobRead: undefined,
  handleJobCreate: undefined,
  handleJobAsyncUpdate: undefined,
  handleJobUpdate: undefined,
  handleUIJobUpdate: undefined,
  handleJobPublish: undefined,
  handleJobDelete: undefined,
  handleGetJob: undefined,
  experimental_handleGenerateJd: undefined,
  handleJobRefresh: undefined,
  experimental_handleRegenerateJd: undefined,
  initialLoad: false,
};

const JobsContext = createContext(initialJobContext);

const JobsProvider = ({ children }: { children: ReactNode }) => {
  const value = useJobActions();
  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export default JobsProvider;

export const useJobs = (): JobContext => {
  const value = useContext(JobsContext);
  return { ...value };
};
