import type React from 'react';
import { createContext, useContext } from 'react';

import { useJobContext } from './hooks';

const JobContext = createContext<ReturnType<typeof useJobContext>>(null);

const JobProvider = (props: React.PropsWithChildren) => {
  const value = useJobContext();
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
