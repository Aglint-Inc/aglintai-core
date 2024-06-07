import React, { createContext, useContext } from 'react';

import { useApplicationsActions } from './hooks';

const ApplicationsContext =
  createContext<ReturnType<typeof useApplicationsActions>>(undefined);

const ApplicationsProvider = (props: React.PropsWithChildren) => {
  const value = useApplicationsActions();
  return (
    <ApplicationsContext.Provider value={value}>
      {props.children ?? <></>}
    </ApplicationsContext.Provider>
  );
};

const useApplications = () => {
  const value = useContext(ApplicationsContext);
  if (value === undefined) throw Error('ApplicationsProvider not found');
  return value;
};

export { ApplicationsProvider, useApplications };
