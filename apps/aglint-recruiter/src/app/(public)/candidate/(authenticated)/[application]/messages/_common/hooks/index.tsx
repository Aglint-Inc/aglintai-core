import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

import type { GetMessages } from '@/routers/candidatePortal/get_messages';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCandidatePortalMessages = () => {
  const { application_id } = useCandidatePortal();
  const query = useGetMessageProcedure({
    application_id,
  });
  return { ...query, data: query.data || [] };
};

const useGetMessageProcedure = (
  input: GetMessages['input'],
): ProcedureQuery<GetMessages> =>
  api.candidatePortal.get_messages.useQuery(input);
