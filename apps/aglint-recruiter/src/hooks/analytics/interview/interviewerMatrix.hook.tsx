import { useMemberList } from '@/components/Requests/ViewRequestDetails/Components/MemberList';
import { useAnalyticsContext } from '@/context/AnalyticsContext/AnalyticsContextProvider';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { api } from '@/trpc/client';

export function useInterviewerMatrix() {
  const { recruiter } = useAuthDetails();
  const { filters } = useAnalyticsContext();
  const { data: members, isFetching: isFetchingMem } = useMemberList();
  const { data, isFetching } = api.analytics.interviewer_leaderboard.useQuery(
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
    data: (data || [])
      .sort((a, b) => b.total_hours - a.total_hours)
      .map((item, index) => {
        return {
          rank: index + 1,
          topSkills: [],
          ...item,
          ...(members || []).find((member) => member.user_id === item.user_id),
        };
      }),
    isFetching: isFetching || isFetchingMem,
  };
}
