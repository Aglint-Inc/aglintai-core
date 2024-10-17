import { useContext } from 'react';

import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type GetNav } from '@/routers/candidatePortal/get_navbar';
import { api } from '@/trpc/client';

import { CandidatePortalContext } from './context';
import { dummyDataNavbar } from './dummydata';

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
  const { recruiter } = useTenant();
  const { queryParams } = useRouterPro();
  const application_id = queryParams?.application_id as string;
  const isPreview = queryParams?.isPreview as string;

  const initData: GetNav['output'] = {
    ...dummyDataNavbar,
    company: { logo: recruiter.logo, name: recruiter.name },
  };
  const query = api.candidatePortal.get_navbar.useQuery(
    {
      application_id,
    },
    {
      enabled: !isPreview,
      initialData: initData,
    },
  );
  return { ...query, data: query.data! };
};
