import { type PropsWithChildren, createContext, useContext } from 'react';

import { useRequestsActions } from './hooks';

const RequestsContext =
  createContext<ReturnType<typeof useRequestsActions>>(undefined);

export const RequestsProvider = (props: PropsWithChildren) => {
  const value = useRequestsActions();
  return (
    <RequestsContext.Provider value={value}>
      {props.children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('Requests Provider not found');
  return value;
};
