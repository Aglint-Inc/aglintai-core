'use client';

import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useInviteMeta = () => {
  const router = useRouterPro();

  const query = api.scheduling.candidate_invite.meta.useQuery({
    filter_id: router.params.filter,
  });

  return { ...query, data: query.data! };
};
