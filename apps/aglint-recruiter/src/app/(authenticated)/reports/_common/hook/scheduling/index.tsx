import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import type { RecentDeclineType } from '@/routers/analytics/scheduling/recentDecline';
import type { RecentRescheduleType } from '@/routers/analytics/scheduling/recentReschedule';
import type {
  InterviewTypes,
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

// export function useRecentDeclinesReschedule(): ProcedureQuery<RecentDeclineReschedule> {
//   return api.analytics.scheduling.recentDeclineReschedule.useQuery();
// }
export function useRecentReschedule(): ProcedureQuery<RecentRescheduleType> {
  return api.analytics.scheduling.recentReschedule.useQuery();
}
export function useRecentDeclines(): ProcedureQuery<RecentDeclineType> {
  return api.analytics.scheduling.recentDecline.useQuery();
}
export function useTrainingProgress(): ProcedureQuery<TrainingProgress> {
  const { filters } = useAnalyticsContext();
  return api.scheduling.analytics.training_progress.useQuery({
    departments: filters.department ? [filters.department] : [],
    jobs: filters.job ? [filters.job] : [],
  });
}
