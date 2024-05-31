import type React from 'react';
import { createContext, useContext } from 'react';

const JobContext = createContext(undefined);

const JobProvider = (props: React.PropsWithChildren) => {
  return (
    <JobContext.Provider value={null}>{props.children}</JobContext.Provider>
  );
};

export default JobProvider;

export const useJob = () => {
  const values = useContext(JobContext);
  return values;
};
