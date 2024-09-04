'use client';
import { type ReactNode, createContext, useContext } from 'react';

import useInviteActions from './hooks';
import { type CandidateInviteContextType } from './types';

const CandidateInviteContext = createContext(undefined);

type CandidateInviteProviderType = {
  children: ReactNode;
};

const CandidateInviteProvider = ({ children }: CandidateInviteProviderType) => {
  const value = useInviteActions();
  return (
    <CandidateInviteContext.Provider value={value}>
      {children}
    </CandidateInviteContext.Provider>
  );
};

export default CandidateInviteProvider;

export const useCandidateInvite = (): CandidateInviteContextType => {
  const value = useContext(CandidateInviteContext);
  return value && { ...value };
};
