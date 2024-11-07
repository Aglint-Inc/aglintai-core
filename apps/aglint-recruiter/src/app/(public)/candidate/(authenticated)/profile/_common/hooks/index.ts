import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetProfile } from '@/routers/candidatePortal/read/get_profile';
import { api } from '@/trpc/client';

import { dummyDataProfile } from '../../../_common/dummydata';

export const useCandidatePortalProfile = () => {
  const response = useGetProfileProcedure();
  return { ...response, data: response.data! };
};

const useGetProfileProcedure = (input: GetProfile['input']) => {
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview;
  const query = api.candidatePortal.get_profile.useQuery(input, {
    enabled: !isPreview,
    initialData: isPreview ? dummyDataProfile : undefined,
  });
  return query;
};

// ProcedureQuery<GetProfile>
export const useCandidatePortalProfileUpdate = () => {
  return api.candidatePortal.update_profile.useMutation();
};
