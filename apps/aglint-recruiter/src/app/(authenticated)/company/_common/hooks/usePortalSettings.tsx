import { api } from '@/trpc/client';

export const usePortalSettingsDetails = () => {
  const query = api.candidatePortal.get_candidate_portal_detail.useQuery();
  return { ...query, data: query.data! };
};
