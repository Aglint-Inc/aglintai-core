import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';

export const useRequestSetupProgress = () => {
  const { recruiter_id } = useTenant();
  return api.requests.setup.getRequestSetupProgress.useQuery({ recruiter_id });
};
