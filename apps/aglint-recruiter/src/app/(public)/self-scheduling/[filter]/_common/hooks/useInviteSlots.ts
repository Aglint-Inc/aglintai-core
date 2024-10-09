import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { useCandidateInviteStore } from '../store';
import { useInviteMeta } from './useInviteMeta';

export const useInviteSlots = () => {
  const timezone = useCandidateInviteStore((state) => state.timezone);
  const { data } = useInviteMeta();
  const router = useRouterPro();
  const query = api.scheduling.candidate_invite.slots.useQuery({
    filter_json_id: router.params.filter,
    candidate_tz: timezone.tzCode,
    company_id: data.recruiter.id,
  });
  return { ...query, data: query.data! };
};
