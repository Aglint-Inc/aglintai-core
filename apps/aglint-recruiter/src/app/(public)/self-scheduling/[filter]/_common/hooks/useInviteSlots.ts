import { dayjsLocal } from '@aglint/shared-utils';

import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { useInviteMeta } from './useInviteMeta';

export const useInviteSlots = () => {
  const { data } = useInviteMeta();
  const router = useRouterPro();
  const query = api.scheduling.candidate_invite.slots.useQuery({
    filter_json_id: router.params.filter,
    candidate_tz: dayjsLocal.tz.guess(),
    company_id: data.recruiter.id,
  });
  return { ...query, data: query.data! };
};
