import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

import { api } from '@/trpc/client';

export const useCandidatePortalProfile = () => {
  const { application_id } = useCandidatePortal();
  const response = api.candidatePortal.get_profile.useQuery({
    application_id,
  });
  const invalidate = api.useUtils().candidatePortal.get_profile.invalidate;
  return { ...response, data: response.data!, invalidate };
};

export const useCandidatePortalProfileUpdate = () => {
  const { invalidate } = useCandidatePortalProfile();
  return api.candidatePortal.update_profile.useMutation({
    onSettled: () => invalidate(),
  });
};
