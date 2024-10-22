import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { dummyDataInterviews } from '../../../_common/dummydata';

export const useCandidatePortalInterviews = () => {
  const { queryParams } = useRouterPro();
  const isPreview = !!queryParams.isPreview as boolean;

  return api.candidatePortal.get_interviews.useQuery(undefined, {
    enabled: !isPreview,
    initialData: isPreview ? dummyDataInterviews : undefined,
  });
};

// : ProcedureQuery<GetInterviews>
