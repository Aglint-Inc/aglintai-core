import React from 'react';
import { createContext, useContext, useEffect } from 'react';

import { useApplicationsStore } from '../ApplicationsContext/store';
import { useJobContext } from './hooks';

const JobContext = createContext<ReturnType<typeof useJobContext>>(null);

const JobProvider = (props: React.PropsWithChildren) => {
  const value = useJobContext();
  const resetApplications = useApplicationsStore(({ resetAll }) => resetAll);
  useEffect(() => {
    return () => resetApplications();
  }, []);
  return (
    <JobContext.Provider value={value}>{props.children}</JobContext.Provider>
  );
};

const useJob = () => {
  const value = useContext(JobContext);
  if (value === undefined) throw Error('JobProvider not found');
  return value;
};

export { JobProvider, useJob };
