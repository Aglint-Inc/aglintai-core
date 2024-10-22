
import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetMessages } from '@/routers/candidatePortal/get_messages';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { dummyDataMessage } from '../../../_common/dummydata';

export const useCandidatePortalMessages = () => {
  const query = useGetMessageProcedure();
  return { ...query, data: query.data || [] };
};

const useGetMessageProcedure = (): ProcedureQuery<GetMessages> => {
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview as boolean;
  const query = api.candidatePortal.get_messages.useQuery(undefined, {
    enabled: !isPreview,
    initialData: isPreview ? dummyDataMessage : undefined,
  });

  return { ...query };
};
