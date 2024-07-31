import { type PropsWithChildren, createContext, useContext } from 'react';

const RequestsContext = createContext(undefined);

export const RequestsProvider = (props: PropsWithChildren) => {
  return (
    <RequestsContext.Provider value={null}>
      {props.children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('Requests Provider not found');
  return value;
};
