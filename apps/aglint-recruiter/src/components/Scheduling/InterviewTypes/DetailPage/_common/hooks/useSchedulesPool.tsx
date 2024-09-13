import { useRouter } from 'next/router';

import { api } from '@/trpc/client';

export const usePoolSchedules = ({ filters }: { filters: string[] }) => {
  const router = useRouter();
  const module_id = router.query.type_id as string;
  return api.interview_pool.schedules.useQuery({
    module_id: module_id,
    filter: filters,
  });
};
