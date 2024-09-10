import { createContext, type PropsWithChildren, useContext } from 'react';

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

export { Application };
