import {
  type PropsWithChildren,
  createContext,
  useContext
} from 'react';

import { Body } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Body';
import { Details } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Details';
import { Overview } from '@/src/components/Jobs/Job/Common/CandidateDrawer/Details/Insights/Overview';

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
