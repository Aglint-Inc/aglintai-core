import { useContext } from 'react';

import type { GetNav } from '@/routers/candidatePortal/get_nav';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { CandidatePortalContext } from './context';

export const useCandidatePortal = () => {
  const value = useContext(CandidatePortalContext);
  if (!value)
    throw new Error('CandidatePortal Context is not available as a parent');
  return value;
};

export const useCandidatePortalNavbar = () => {
  const query = useGetNavbarProcedure();
  return {
    ...query,
    data: query.data!,
  };
};

const useGetNavbarProcedure = (): ProcedureQuery<GetNav> => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_navbar.useQuery({
    application_id,
  });
};
