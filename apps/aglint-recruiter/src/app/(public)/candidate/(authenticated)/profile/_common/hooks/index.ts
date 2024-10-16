import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';

import type { GetProfile } from '@/routers/candidatePortal/get_profile';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCandidatePortalProfile = () => {
  const { application_id } = useCandidatePortal();
  const response = useGetProfileProcedure({ application_id });
  return { ...response, data: response.data! };
};

const useGetProfileProcedure = (
  input: GetProfile['input'],
): ProcedureQuery<GetProfile> =>
  api.candidatePortal.get_profile.useQuery(input);

export const useCandidatePortalProfileUpdate = () => {
  return api.candidatePortal.update_profile.useMutation({});
};
