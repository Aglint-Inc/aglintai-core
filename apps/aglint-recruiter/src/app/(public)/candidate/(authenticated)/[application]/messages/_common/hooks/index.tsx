import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

import { api } from '@/trpc/client';

export const useCandidatePortalMessages = () => {
  const { application_id } = useCandidatePortal();
  const query = api.candidatePortal.get_messages.useQuery({
    application_id,
  });
  return { ...query, data: query.data || [] };
};
