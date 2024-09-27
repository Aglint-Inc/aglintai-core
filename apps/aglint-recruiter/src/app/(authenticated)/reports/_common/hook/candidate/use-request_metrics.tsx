import { useTenant } from '@/company/hooks';
import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import { api } from '@/trpc/client';

export function useRequestMetics() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data, isFetching, isError } = api.analytics.request_metrics.useQuery(
    {
      recruiter_id: recruiter.id,
      job_id: filters.job,
      locations: filters.location && [filters.location],
      departments: filters.department && [filters.department],
      data_range: filters.dateRange,
    },
    {
      enabled: !!recruiter.id,
    },
  );
  return {
    data: data || [dummy_RequestMetics],
    isFetching,
    isError,
  };
}
export const dummy_RequestMetics = {
  type: 'type',
  request_id: 'request_id',
  recruiting_coord: 'recruiting_coordinator',
  interview_coordinator: 'interview_coordinator',
  candidate_name: 'candidate_name',
  availability_req: true,
  self_scheduling_req: true,
  confirmation: true,
  availability_received: true,
  availability_followup: true,
  self_scheduling_followup: true,
  candidate_status: 'candidate_status',
};
