import { useTenant } from '@/company/hooks';
import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import { type RequestMetrics } from '@/routers/analytics/request_metrics';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export function useRequestMetics() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data, isFetching, isError } = useRequestMetricsProcedure({
    recruiter_id: recruiter.id,
    job_id: filters.job,
    locations: filters.location ? [filters.location] : null,
    departments: filters.department ? [filters.department] : null,
    data_range: filters.dateRange,
  });
  return {
    data: data || [],
    isFetching,
    isError,
  };
}

const useRequestMetricsProcedure = (
  input: RequestMetrics['input'],
): ProcedureQuery<RequestMetrics> =>
  api.analytics.request_metrics.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export const dummy_RequestMetics = {
  type: 'type',
  request_id: 'request_id',
  recruiting_coord: 'recruiting_coordinator',
  interviewing_coordinator: 'interview_coordinator',
  candidate_name: 'candidate_name',
  availability_req: true,
  self_scheduling_req: true,
  confirmation: true,
  availability_received: true,
  availability_followup: true,
  self_scheduling_followup: true,
  candidate_status: 'candidate_status',
};
