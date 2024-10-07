import { api } from '@/trpc/client';

export const useIntegrations = () => {
  const utils = api.useUtils();
  const invalidate = utils.integrations.read.invalidate;
  const query = api.integrations.read.useQuery();
  return {
    ...query,
    data: query.data!,
    invalidate,
  };
};
