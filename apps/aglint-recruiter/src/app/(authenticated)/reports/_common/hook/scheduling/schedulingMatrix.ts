import type { DatabaseEnums } from '@aglint/shared-types';
import { useState } from 'react';

import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import { api } from '@/trpc/client';

export function useReasons() {
  const [view, setView] = useState<DatabaseEnums['cancel_type']>(
    'candidate_request_reschedule',
  );
  const { filters } = useAnalyticsContext();
  const { data, isPending, isError } =
    api.scheduling.analytics.reasons.useQuery({
      departments: filters.department ? [filters.department] : [],
      jobs: filters.job ? [filters.job] : [],
      type: view,
    });
  return {
    data: data?.map((item) => ({ name: item.reason, value: item.count })) || [],
    isPending,
    isError,
    view,
    setView,
  };
}
