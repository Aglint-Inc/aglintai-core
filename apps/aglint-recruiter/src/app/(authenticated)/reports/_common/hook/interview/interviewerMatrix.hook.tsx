import { useTenant } from '@/company/hooks';
import type { InterviewerAnalytics } from '@/routers/analytics/interviewer_analytics';
import type { InterviewerLeaderboard } from '@/routers/analytics/interviewer_leaderboard';
import type { InterviewerRejections } from '@/routers/analytics/interviewer_reject';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

import { useAnalyticsContext } from '../../context/AnalyticsContext/AnalyticsContextProvider';

const useInterviewerLeaderBoardProcedure = (
  input: InterviewerLeaderboard['input'],
): ProcedureQuery<InterviewerLeaderboard> =>
  api.analytics.interviewer_leaderboard.useQuery(input, {
    enabled: !!input.recruiter_id,
    refetchOnMount: false,
  });

export function useInterviewerLeaderboard() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data, isFetching } = useInterviewerLeaderBoardProcedure({
    recruiter_id: recruiter.id,
    job_id: filters.job,
    locations: Number.isInteger(filters.location)
      ? [filters.location!]
      : undefined,
    departments: Number.isInteger(filters.department)
      ? [filters.department!]
      : undefined,
    data_range: filters.dateRange,
  });
  return {
    data: (data || [])
      .sort((a, b) => b.total_hours - a.total_hours)
      .map((item, index) => {
        return {
          rank: index + 1,
          ...item,
          interviews: item.accepted + item.rejected,
        };
      }),
    isFetching: isFetching,
  };
}

const useInterviewerAnalytics = (
  input: InterviewerAnalytics['input'],
): ProcedureQuery<InterviewerAnalytics> => {
  const { isFetching: iFInterviewers } = useInterviewerLeaderboard();
  return api.analytics.interviewer_analytics.useQuery(input, {
    enabled: !(!input.recruiter_id && iFInterviewers),
  });
};

export function useInterviewer_upcoming() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const { data: interviewers, isFetching: iFInterviewers } =
    useInterviewerLeaderboard();
  const { data, isFetching } = useInterviewerAnalytics({
    recruiter_id: recruiter.id,
    job_id: filters.job,
    locations: Number.isInteger(filters.location)
      ? [filters.location!]
      : undefined,
    departments: Number.isInteger(filters.department)
      ? [filters.department!]
      : undefined,
    data_range: filters.dateRange,
  });
  const temp = [...(interviewers || []), ...(data || [])].reduce(
    (acc, curr) => {
      const temp = acc[curr.user_id] || ({} as (typeof acc)[string]);
      const base = {
        accepted: 0,
        feedback: 0,
        rejected: 0,
        total_hours: 0,
        qualified: 0,
        training: 0,
        upcoming: 0,
        rank: 0,
        average_weekly_count: 0,
        average_weekly_duration: 0,
        duration: 0,
      };
      acc[curr.user_id] = {
        ...base,
        ...temp,
        ...curr,
      };
      return acc;
    },
    {} as {
      [key: string]: (typeof interviewers)[number] &
        NonNullable<typeof data>[number];
    },
  );
  return {
    data: Object.values(temp),
    partialData: iFInterviewers,
    isFetching: isFetching,
  };
}

export function useInterviewerDeclines(): ProcedureQuery<InterviewerRejections> {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  return api.analytics.interviewer_rejections.useQuery(
    {
      recruiter_id: recruiter.id,
      job_id: filters.job,
      locations: Number.isInteger(filters.location)
        ? [filters.location!]
        : undefined,
      departments: Number.isInteger(filters.department)
        ? [filters.department!]
        : undefined,
      data_range: filters.dateRange,
    },
    {
      enabled: !!recruiter.id,
      refetchOnMount: false,
    },
  );
}
