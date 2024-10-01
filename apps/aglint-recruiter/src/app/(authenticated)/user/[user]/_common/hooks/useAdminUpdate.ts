import { api } from '@/trpc/client';

export const useAdminUpdate = () => {
  return api.user.update_admin_user.useMutation();
};
