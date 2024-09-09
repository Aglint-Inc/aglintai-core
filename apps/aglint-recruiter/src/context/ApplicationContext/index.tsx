import { type PropsWithChildren, createContext, useContext } from 'react';

import { Overview } from '@/components/CandiatePortal/Home/Overview';
import { Body } from '@/job/components/CandidateDrawer/Body';
import { Details } from '@/job/components/CandidateDrawer/Details';

import { useApplicationContext } from './hooks';

type UseContextType = typeof useApplicationContext;

const ApplicationContext = createContext<ReturnType<UseContextType>>(undefined);

export const useApplication = () => {
  const value = useContext(ApplicationContext);
  if (value === undefined) throw new Error('ApplicationProvider not found');
  return value;
};

const Application = ({
  children,
  ...props
}: PropsWithChildren<Parameters<UseContextType>[0]>) => {
  const value = useApplicationContext(props);

  return (
    <ApplicationContext.Provider value={value}>
      {children ?? <></>}
    </ApplicationContext.Provider>
  );
};
Application.Body = Body;
Application.Details = Details;
Application.Overview = Overview;

export { Application };
