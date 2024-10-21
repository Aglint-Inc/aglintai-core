'use client';

import { useRouterPro } from '@/hooks/useRouterPro';
import type { MetaCandidateInvite } from '@/routers/scheduling/candidate_invite/meta';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useInviteMeta = () => {
  const query = useInviteMetaProcedure();
  return { ...query, data: query.data! };
};

const useInviteMetaProcedure = (): ProcedureQuery<MetaCandidateInvite> => {
  const router = useRouterPro();

  return api.scheduling.candidate_invite.meta.useQuery({
    filter_id: router.params.filter,
  });
};
