import { api } from '@/trpc/client';

export const useInterviewer = ({ user_id }: { user_id: string }) => {
  return api.interviewers.get_user_details.useQuery({ user_id });
};
