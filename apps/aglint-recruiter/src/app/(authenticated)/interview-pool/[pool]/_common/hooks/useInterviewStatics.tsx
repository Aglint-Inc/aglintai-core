import { useTenant } from '@/company/hooks';
import { type CandidatePipeline } from '@/routers/analytics/interview/candidate_pipeline';
import type { InterviewStatistics } from '@/routers/analytics/interview/interview_statistics';
import { type InterviewerPerformance } from '@/routers/analytics/interview/interviewer_performance';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export function useInterviewStatistics(module_id: string) {
  const { data, isFetched } = useInterviewStatisticsProcedure({ module_id });
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

const useInterviewStatisticsProcedure = (
  input: InterviewStatistics['input'],
): ProcedureQuery<InterviewStatistics> => {
  const { recruiter } = useTenant();
  return api.analytics.interview.interview_statistics.useQuery(input, {
    enabled: !!recruiter.id,
    staleTime: Infinity,
  });
};

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

export function useCandidatePipeline(
  module_id: string,
): ProcedureQuery<CandidatePipeline> {
  const { recruiter } = useTenant();
  return api.analytics.interview.candidate_pipeline.useQuery(
    {
      module_id,
    },
    {
      enabled: !!recruiter?.id,
      staleTime: Infinity,
    },
  );
}

export function useInterviewerPerformance(module_id: string) {
  const { data, isFetched } = useInterviewerPerformanceProcedure({ module_id });
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

const useInterviewerPerformanceProcedure = (
  input: InterviewerPerformance['input'],
): ProcedureQuery<InterviewerPerformance> => {
  const { recruiter } = useTenant();
  return api.analytics.interview.interviewer_performance.useQuery(input, {
    enabled: !!recruiter?.id,
    staleTime: Infinity,
  });
};
