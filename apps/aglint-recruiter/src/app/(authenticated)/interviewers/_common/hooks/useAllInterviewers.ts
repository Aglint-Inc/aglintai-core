import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';

export const useAllInterviewers = () => {
  const { recruiter_id } = useTenant();
  return api.interviewers.get_all_interviewers.useQuery({ recruiter_id });
};
