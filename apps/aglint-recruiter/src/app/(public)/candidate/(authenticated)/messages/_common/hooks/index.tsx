import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';

import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetMessages } from '@/routers/candidatePortal/get_messages';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { dummyDataMessage } from '../../../_common/dummydata';

export const useCandidatePortalMessages = () => {
  const { application_id } = useCandidatePortal();
  const query = useGetMessageProcedure({
    application_id,
  });
  return { ...query, data: query.data || [] };
};

const useGetMessageProcedure = (
  input: GetMessages['input'],
): ProcedureQuery<GetMessages> => {
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview as boolean;
  const query = api.candidatePortal.get_messages.useQuery(input, {
    enabled: !isPreview,
    initialData: dummyDataMessage,
  });

  return { ...query };
};
