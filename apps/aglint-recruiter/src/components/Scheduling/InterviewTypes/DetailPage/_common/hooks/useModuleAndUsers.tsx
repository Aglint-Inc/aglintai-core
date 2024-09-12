import { api } from '@/trpc/client';
import { useRouter } from 'next/router';

export const useModuleAndUsers = () => {
  const router = useRouter();
  const module_id = router.query.type_id as string;
  const query = api.interview_pool.users.useQuery({
    module_id: module_id,
  });

  return {
    ...query,
  };
};
