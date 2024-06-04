import { useRouter } from 'next/router';
import React, { createContext, useContext } from 'react';

import { useApplicationsActions } from './hooks';

const ApplicationsContext =
  createContext<ReturnType<typeof useApplicationsActions>>(undefined);

const ApplicationProvider = (props: React.PropsWithChildren) => {
  const { query } = useRouter();
  const job_id = query?.id as string;
  if (!job_id)
    throw Error(
      'ApplicationProvider used in an invalid path. Cannot find job_id in pathname',
    );
  const value = useApplicationsActions();
  return (
    <ApplicationsContext.Provider value={value}>
      {props.children ?? <></>}
    </ApplicationsContext.Provider>
  );
};

const useApplications = () => {
  const { query } = useRouter();
  const job_id = query?.id as string;
  if (!job_id)
    throw Error(
      'useApplications hook called in an invalid path. Cannot find job_id in pathname',
    );
  const value = useContext(ApplicationsContext);
  if (!value) throw Error('ApplicationsProvider not found');
  return value;
};

export { ApplicationProvider, useApplications };
