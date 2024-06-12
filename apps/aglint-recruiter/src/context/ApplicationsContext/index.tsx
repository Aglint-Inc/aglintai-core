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
  return value;
};

export { ApplicationsProvider, useApplications };
