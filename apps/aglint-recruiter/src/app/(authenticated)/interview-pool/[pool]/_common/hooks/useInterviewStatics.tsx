import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';

export function useInterviewStatistics(module_id: string) {
  const { recruiter } = useTenant();
  const { data, isFetched } =
    api.analytics.interview.interview_statistics.useQuery(
      {
        module_id,
      },
      {
        enabled: !!recruiter.id,
      },
    );
  return {
    data: {
      duration: data?.duration || 0,
      completed: data?.completed || 0,
      total: data?.total || 0,
      time_to_schedule: data?.time_to_schedule || 0,
      interval: data?.time_to_schedule
        ? getInterval(data.time_to_schedule)
        : '0',
    },
    isFetched,
  };
}

function getInterval(interval: {
  days: number;
  hours: number;
  minutes: number;
}) {
  let res = '';
  if (interval['days'] > 0) {
    res = `${interval['days']} day`;
  } else if (interval['hours'] > 0) {
    res = `${interval['days']} hours`;
  } else res = `${interval['minutes'] || 0} min`;
  return res;
}

export function useCandidatePipeline(module_id: string) {
  const { recruiter } = useTenant();
  const { data, isFetched } =
    api.analytics.interview.candidate_pipeline.useQuery(
      {
        module_id,
      },
      {
        enabled: !!recruiter.id,
      },
    );
  return { data, isFetched };
}

export function useInterviewerPerformance(module_id: string) {
  const { recruiter } = useTenant();
  const { data, isFetched } =
    api.analytics.interview.interviewer_performance.useQuery(
      {
        module_id,
      },
      {
        enabled: !!recruiter.id,
      },
    );
  return {
    data: {
      candidate_feedback_avg: data?.candidate_feedback_avg || 0,
      total_interviews: data?.total_interviews || 0,
      interviewer_feedback_count: data?.interviewer_feedback_count || 0,
      recommendation_success: data?.recommendation_success || 0,
      interviewers_count: data?.interviewers_count || 0,
    },
    isFetched,
  };
}
