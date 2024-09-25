import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export const useRequestSetupProgress = () => {
  const { recruiter_id } = useAuthDetails();
  return api.requests.setup.getRequestSetupProgress.useQuery({ recruiter_id });
};
