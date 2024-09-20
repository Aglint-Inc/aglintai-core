import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export const useAllInterviewers = () => {
  const { recruiter_id } = useAuthDetails();
  return api.interviewers.get_all_interviewers.useQuery({ recruiter_id });
};
