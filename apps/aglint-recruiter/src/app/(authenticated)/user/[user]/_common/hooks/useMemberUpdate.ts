import { api } from '@/trpc/client';

export const useUserUpdate = () => {
  return api.user.update_user.useMutation();
};
