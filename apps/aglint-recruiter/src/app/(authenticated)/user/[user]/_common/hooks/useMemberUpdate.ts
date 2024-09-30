import { api } from '@/trpc/client';

export const useMemberUpdate = () => {
  return api.user.update_user.useMutation();
};
