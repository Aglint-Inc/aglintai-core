'use client';
import { useParams } from 'next/navigation';
import { type PropsWithChildren, createContext } from 'react';

import { api } from '@/trpc/client';

const useCandidatePortalContext = () => {
  const params = useParams();
  const application_id = params?.application_id as string;
  void api.candidatePortal.get_profile.usePrefetchQuery({ application_id });
  return { application_id };
};

export const CandidatePortalContext =
  createContext<ReturnType<typeof useCandidatePortalContext>>(undefined);

export const CandidatePortalProvider = ({ children }: PropsWithChildren) => {
  const value = useCandidatePortalContext();
  return (
    <CandidatePortalContext.Provider value={value}>
      {children}
    </CandidatePortalContext.Provider>
  );
};
