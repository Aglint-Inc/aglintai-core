import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export const useAllInterviewModules = () => {
  const { recruiter } = useAuthDetails();
  return api.interview_pool.interview_pool.useQuery({
    recruiter_id: recruiter.id,
  });
};
