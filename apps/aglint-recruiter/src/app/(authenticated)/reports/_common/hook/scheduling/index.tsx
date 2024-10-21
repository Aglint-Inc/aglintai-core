import type { DatabaseEnums } from '@aglint/shared-types';
import { useState } from 'react';

import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import type {
  InterviewTypes,
  Reasons,
  RecentDeclineReschedule,
  TrainingProgress,
} from '@/routers/scheduling/v1/analytics';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export function useInterviewTypes(): ProcedureQuery<InterviewTypes> {
  const { filters } = useAnalyticsContext();
  return api.scheduling.analytics.interview_types.useQuery({
    departments: filters.department ? [filters.department] : [],
    jobs: filters.job ? [filters.job] : [],
  });
}
export function useSchedulingAnalytics(): ProcedureQuery<RecentDeclineReschedule> {
  const { filters } = useAnalyticsContext();
  return api.scheduling.analytics.recent_decline_reschedule.useQuery({
    departments: filters.department ? [filters.department] : [],
    jobs: filters.job ? [filters.job] : [],
  });
}
export function useTrainingProgress(): ProcedureQuery<TrainingProgress> {
  const { filters } = useAnalyticsContext();
  return api.scheduling.analytics.training_progress.useQuery({
    departments: filters.department ? [filters.department] : [],
    jobs: filters.job ? [filters.job] : [],
  });
}
export function useReasons() {
  const [view, setView] = useState<DatabaseEnums['cancel_type']>(
    'candidate_request_reschedule',
  );
  const { filters } = useAnalyticsContext();
  const { data, isPending, isError } = useReasonsProcedure({
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

const useReasonsProcedure = (
  input: Reasons['input'],
): ProcedureQuery<Reasons> => api.scheduling.analytics.reasons.useQuery(input);
