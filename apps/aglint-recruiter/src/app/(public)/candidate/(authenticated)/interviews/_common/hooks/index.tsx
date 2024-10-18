import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';

import { dummyDataInterviews } from '../../../_common/dummydata';

export const useCandidatePortalInterviews = () => {
  const { queryParams } = useRouterPro();
  const application_id = queryParams.application_id as string;
  const isPreview = !!queryParams.isPreview as boolean;

  return api.candidatePortal.get_interviews.useQuery(
    {
      application_id,
    },
    {
      enabled: !isPreview,
      initialData: isPreview ? dummyDataInterviews : undefined,
    },
  );
};

// : ProcedureQuery<GetInterviews>
