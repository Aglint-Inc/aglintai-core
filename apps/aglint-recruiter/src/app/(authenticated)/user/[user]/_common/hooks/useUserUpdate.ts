import { api } from '@/trpc/client';

export const useUserUpdate = () => {
  return api.tenant.updateWithRole.useMutation();
};
