import { useCandidatePortal } from '@/candidate/authenticated/hooks';
import { api } from '@/trpc/client';

export const useCandidatePortalMessages = () => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_messages.useQuery({
    application_id,
  });
};
