import { useRouter } from 'next/router';

import { api } from '@/trpc/client';

export const usePoolFeedbacks = () => {
  const router = useRouter();
  const module_id = router.query.type_id as string;
  return api.interview_pool.feedbacks.useQuery({
    module_id: module_id,
  });
};
