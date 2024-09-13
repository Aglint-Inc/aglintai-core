import { useRouter } from 'next/router';

import { api } from '@/trpc/client';

export const usePoolCandidates = () => {
  const router = useRouter();
  const module_id = router.query.type_id as string;
  return api.interview_pool.candidates.useQuery({
    module_id: module_id,
  });
};
