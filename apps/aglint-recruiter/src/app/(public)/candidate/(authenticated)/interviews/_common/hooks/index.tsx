import { useCandidatePortal } from 'src/app/(public)/candidate/(authenticated)/_common/hooks';

import type { GetInterviews } from '@/routers/candidatePortal/get_interviews';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCandidatePortalInterviews =
  (): ProcedureQuery<GetInterviews> => {
    const { application_id } = useCandidatePortal();
    return api.candidatePortal.get_interviews.useQuery({
      application_id,
    });
  };
