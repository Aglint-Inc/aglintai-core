import { type Read } from '@/routers/integrations/read';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useIntegrations = () => {
  const utils = api.useUtils();
  const invalidate = utils.integrations.read.invalidate;
  const query = useProcedure();
  return {
    ...query,
    data: query.data!,
    invalidate,
  };
};

const useProcedure = (): ProcedureQuery<Read> =>
  api.integrations.read.useQuery();
