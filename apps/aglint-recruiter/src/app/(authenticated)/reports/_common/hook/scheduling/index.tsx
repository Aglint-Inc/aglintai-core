import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import { api } from '@/trpc/client';
import { DatabaseEnums } from '@aglint/shared-types';
import { useState } from 'react';

export function useInterviewTypes() {
  const { filters } = useAnalyticsContext();
  const { data, isPending } = api.scheduling.analytics.interview_types.useQuery(
    {
      departments: filters.department ? [filters.department] : [],
      jobs: filters.job ? [filters.job] : [],
    },
  );
  return { data: data || [], isPending };
}
export function useSchedulingAnalytics() {
  const { filters } = useAnalyticsContext();
  const { data, isPending } =
    api.scheduling.analytics.recent_decline_reschedule.useQuery({
      departments: filters.department ? [filters.department] : [],
      jobs: filters.job ? [filters.job] : [],
    });
  return { data: data || [], isPending };
}
export function useTrainingProgress() {
  const { filters } = useAnalyticsContext();
  const { data, isPending } =
    api.scheduling.analytics.training_progress.useQuery({
      departments: filters.department ? [filters.department] : [],
      jobs: filters.job ? [filters.job] : [],
    });
  return { data: data || [], isPending };
}
export function useReasons(type: DatabaseEnums['cancel_type']) {
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
