import { type PropsWithChildren, createContext, useContext } from 'react';

import { useRequestActions } from './hooks';

type RequestContextType = typeof useRequestActions;

const RequestContext = createContext<ReturnType<RequestContextType>>(undefined);

export const RequestProvider = (
  props: PropsWithChildren<Parameters<RequestContextType>['0']>,
) => {
  const value = useRequestActions(props);
  return (
    <RequestContext.Provider value={value}>
      {props.children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const value = useContext(RequestContext);
  if (!value) throw new Error('Request Provider not found');
  return value;
};
