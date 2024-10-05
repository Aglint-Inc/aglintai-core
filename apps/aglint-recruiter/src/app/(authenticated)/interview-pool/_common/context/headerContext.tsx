import { createContext, type PropsWithChildren, useContext } from 'react';

import { useHeaderPropContext } from '../hooks/useInterviewPoolHeader';

const InterviewPoolHeader = createContext<
  ReturnType<typeof useHeaderPropContext> | undefined
>(undefined);

export const HeaderPropProvider = ({ children }: PropsWithChildren) => {
  const { ...value } = useHeaderPropContext();
  return (
    <InterviewPoolHeader.Provider value={{ ...value }}>
      {children}
    </InterviewPoolHeader.Provider>
  );
};

export const useHeaderProp = () => {
  const context = useContext(InterviewPoolHeader);
  return context!;
};
