import type { DatabaseTable } from '@aglint/shared-types';

import { api } from '@/trpc/client';

export function useGreenhouseDetails() {
  const { data, isLoading, refetch } = api.ats.greenhouse.get.useQuery();
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
export function useUpdateGreenhouseDetails() {
  const util = api.useUtils();
  const { mutateAsync } = api.ats.greenhouse.post.useMutation({
    onSuccess: () => {
      util.ats.greenhouse.get.refetch();
    },
  });
  return { setGreenhouseDetails: mutateAsync };
}
