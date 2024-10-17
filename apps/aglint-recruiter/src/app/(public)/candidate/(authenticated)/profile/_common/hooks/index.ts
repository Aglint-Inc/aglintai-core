import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';

import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetProfile } from '@/routers/candidatePortal/get_profile';
import { api } from '@/trpc/client';

import { dummyDataProfile } from '../../../_common/dummydata';

export const useCandidatePortalProfile = () => {
  const { application_id } = useCandidatePortal();
  const response = useGetProfileProcedure({ application_id });
  return { ...response, data: response.data! };
};

const useGetProfileProcedure = (input: GetProfile['input']) => {
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview;
  const query = api.candidatePortal.get_profile.useQuery(input, {
    enabled: !isPreview,
    initialData: dummyDataProfile,
  });
  return query;
};

// ProcedureQuery<GetProfile>
export const useCandidatePortalProfileUpdate = () => {
  return api.candidatePortal.update_profile.useMutation({});
};
