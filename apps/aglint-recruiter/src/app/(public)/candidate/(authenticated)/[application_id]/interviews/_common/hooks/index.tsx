import { useCandidatePortal } from '@/candidate/authenticated/hooks';
import { api } from '@/trpc/client';

export const useCandidatePortalInterviews = () => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_interviews.useQuery({
    application_id,
  });
};
