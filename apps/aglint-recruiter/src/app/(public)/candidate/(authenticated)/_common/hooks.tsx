import { useContext } from 'react';

import { useRouterPro } from '@/hooks/useRouterPro';
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

const useGetNavbarProcedure = () => {
  const { queryParams } = useRouterPro();
  const recruiter_id = queryParams?.recruiter_id as string;
  const isPreview = !!queryParams?.isPreview as boolean;

  const query = api.candidatePortal.get_navbar.useQuery(undefined, {
    enabled: !isPreview,
  });
  const queryPreview = api.candidatePortal.get_navbar_preview.useQuery(
    {
      recruiter_id,
    },
    {
      enabled: isPreview,
    },
  );

  return isPreview
    ? { ...queryPreview, data: queryPreview.data! }
    : { ...query, data: query.data! };
};
