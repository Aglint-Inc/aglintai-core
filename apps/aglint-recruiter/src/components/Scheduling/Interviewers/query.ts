import { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { schedulesSupabase } from '../schedules-query';

export const useAllSchedulesByUserId = ({ filter }) => {
  const router = useRouter();
  const member_id = router.query.member_id as string;
  const query = useQuery({
    queryKey: ['schedulesByModuleId', member_id, filter],
    queryFn: () => fetchUserSchedules(member_id, filter),
    enabled: !!member_id,
    placeholderData: {
      schedules: [],
      totalInterviewsToday: 0,
      totalHoursToday: 0,
      totalInterviewsThisWeek: 0,
      totalHoursThisWeek: 0,
    },
  });
  return query;
};

export const fetchUserSchedules = async (
  user_id: string,
  filter: DatabaseTable['interview_meeting']['status'],
) => {
  const { data } = await schedulesSupabase()
    .contains('confirmed_user_ids', [user_id])
    .eq('status', filter)
    .throwOnError();

  const user = data[0]?.meeting_interviewers?.find(
    (interviewer) => interviewer.user_id === user_id,
  );

  return {
    schedules: data,
    totalInterviewsToday: user?.totalinterviewstoday || 0,
    totalHoursToday: user?.totalhourstoday,
    totalInterviewsThisWeek: user?.totalinterviewsthisweek || 0,
    totalHoursThisWeek: user?.totalhoursthisweek || 0,
  };
};
