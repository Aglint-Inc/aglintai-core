'use client';

import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

export const useInviteMeta = () => {
  const router = useRouterPro();

  return api.scheduling.candidate_invite.meta.useQuery({
    application_id: router.params.id,
    filter_id: router.queryParams.filter_id as string,
  });
};
