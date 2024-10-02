'use client';

import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useInviteMeta = () => {
  const router = useRouterPro();

  const query = api.scheduling.candidate_invite.meta.useQuery({
    application_id: router.params.id,
    filter_id: router.queryParams.filter_id as string,
  });

  return { ...query, data: query.data! };
};
