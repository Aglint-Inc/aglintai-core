import { type PropsWithChildren, createContext, useContext } from 'react';

import { Body } from '@/src/components/JobNewApplications/ui/candidateDrawer/body';
import { Details } from '@/src/components/JobNewApplications/ui/candidateDrawer/details';
import { Overview } from '@/src/components/JobNewApplications/ui/candidateDrawer/details/insights/overview';
import { applicationQuery } from '@/src/queries/application';

import { useApplicationContext } from './hooks';

const ApplicationContext =
  createContext<ReturnType<typeof useApplicationContext>>(undefined);

export const useApplication = () => {
  const value = useContext(ApplicationContext);
  if (value === undefined) throw new Error('ApplicationProvider not found');
  return value;
};

const Application = ({
  children,
  ...props
}: PropsWithChildren<
  Parameters<(typeof applicationQuery)['application']>[0]
>) => {
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
