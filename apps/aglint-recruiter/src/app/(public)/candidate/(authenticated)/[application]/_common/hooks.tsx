import { useContext } from 'react';

import { api } from '@/trpc/client';

import { CandidatePortalContext } from './context';

export const useCandidatePortal = () => {
  const value = useContext(CandidatePortalContext);
  if (!value)
    throw new Error('CandidatePortal Context is not available as a parent');
  return value;
};

export const useCandidatePortalNavbar = () => {
  const { application_id } = useCandidatePortal();
  const query = api.candidatePortal.get_navbar.useQuery({
    application_id,
  });
  return {
    ...query,
    data: query.data!,
  };
};
