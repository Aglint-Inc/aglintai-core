import { type PropsWithChildren, createContext, useContext } from 'react';

import { useTourContext } from './hooks';

type TourContextType = ReturnType<typeof useTourContext>;
const TourContext = createContext<TourContextType>(undefined);

const TourProvider = (props: PropsWithChildren) => {
  const value = useTourContext();
  return (
    <TourContext.Provider value={value}>{props.children}</TourContext.Provider>
  );
};

const useTour = () => {
  const value = useContext(TourContext);
  if (!value) throw new Error('Tour Provider not found');
  return value;
};

export { TourProvider, useTour };
