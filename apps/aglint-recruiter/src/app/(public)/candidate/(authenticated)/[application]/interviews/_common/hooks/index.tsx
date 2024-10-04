import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

import { api } from '@/trpc/client';

export const useCandidatePortalInterviews = () => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_interviews.useQuery({
    application_id,
  });
};
