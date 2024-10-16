import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

import type { GetProfile } from '@/routers/candidatePortal/get_profile';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCandidatePortalProfile = () => {
  const { application_id } = useCandidatePortal();
  const response = useGetProfileProcedure({ application_id });
  const invalidate = api.useUtils().candidatePortal.get_profile.invalidate;
  return { ...response, data: response.data!, invalidate };
};

const useGetProfileProcedure = (
  input: GetProfile['input'],
): ProcedureQuery<GetProfile> =>
  api.candidatePortal.get_profile.useQuery(input);

export const useCandidatePortalProfileUpdate = () => {
  const { invalidate } = useCandidatePortalProfile();
  return api.candidatePortal.update_profile.useMutation({
    onSettled: () => invalidate(),
  });
};
