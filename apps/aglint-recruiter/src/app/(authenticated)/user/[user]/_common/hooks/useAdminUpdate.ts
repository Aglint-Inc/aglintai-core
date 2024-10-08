import { api } from '@/trpc/client';

export const useAdminUpdate = () => {
  return api.tenant.updateWithRole.useMutation();
};
