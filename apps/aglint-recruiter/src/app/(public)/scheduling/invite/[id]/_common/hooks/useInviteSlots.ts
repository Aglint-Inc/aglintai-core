import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { useCandidateInviteStore } from '../store';

export const useInviteSlots = () => {
  const timezone = useCandidateInviteStore((state) => state.timezone);
  const router = useRouterPro();

  return api.scheduling.candidate_invite.slots.useQuery({
    filter_json_id: router.queryParams.filter_id as string,
    candidate_tz: timezone.tzCode,
    api_options: {
      include_conflicting_slots: {
        show_conflicts_events: true,
        show_soft_conflicts: true,
        out_of_working_hrs: true,
      },
    },
  });
};
