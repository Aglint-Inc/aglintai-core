import type { DatabaseTable } from '@aglint/shared-types';

import type { Get } from '@/routers/ats/greenhouse/get';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export function useGreenhouseDetails() {
  const { data, isLoading, refetch } = useGreenhouseDetailsProcedure();
  return {
    data: {
      ...(data || {}),
      isEnabled: Boolean(data?.key),
    } as DatabaseTable['integrations']['greenhouse_metadata'] & {
      isEnabled: boolean;
    },
    isPending: isLoading,

    refetch,
  };
}

const useGreenhouseDetailsProcedure = (): ProcedureQuery<Get> =>
  api.ats.greenhouse.get.useQuery();

export function useUpdateGreenhouseDetails() {
  const util = api.useUtils();
  const { mutateAsync } = api.ats.greenhouse.post.useMutation({
    onSuccess: () => {
      util.ats.greenhouse.get.refetch();
    },
  });
  return { setGreenhouseDetails: mutateAsync };
}
