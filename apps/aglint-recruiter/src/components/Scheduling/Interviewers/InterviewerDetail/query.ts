import { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { supabase } from '@/src/utils/supabase/client';

import { schedulesSupabase } from '../../schedules-query';

export const useAllSchedulesByUserId = ({
  filter,
  member_id,
}: {
  filter:
    | DatabaseTable['interview_meeting']['status']
    | DatabaseTable['interview_meeting']['status'][]
    | null;
  member_id: string;
}) => {
  const query = useQuery({
    queryKey: ['schedulesByModuleId', member_id, filter],
    queryFn: () => fetchUserSchedules({ member_id, filter }),
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

export const fetchUserSchedules = async ({
  filter,
  member_id,
}: {
  filter:
    | DatabaseTable['interview_meeting']['status']
    | null
    | DatabaseTable['interview_meeting']['status'][];
  member_id: string;
}) => {
  const query = schedulesSupabase()
    .contains('confirmed_user_ids', [member_id])
    .eq('meeting_interviewers.is_confirmed', true);

  if (typeof filter === 'string' || _.isArray(filter)) {
    if (typeof filter === 'string') query.eq('status', filter);
    else if (_.isArray(filter)) query.in('status', filter);
  }

  const { data } = await query.throwOnError();
  if (data.length === 0) {
    return {
      schedules: [],
      totalInterviewsToday: 0,
      totalHoursToday: 0,
      totalInterviewsThisWeek: 0,
      totalHoursThisWeek: 0,
    };
  }
  // TODO: fix
  const user = (data[0]?.meeting_interviewers as any)?.find(
    (interviewer) => interviewer.user_id === member_id,
  );

  return {
    schedules: data,
    totalInterviewsToday: user?.totalinterviewstoday || 0,
    totalHoursToday: user?.totalhourstoday || 0,
    totalInterviewsThisWeek: user?.totalinterviewsthisweek || 0,
    totalHoursThisWeek: user?.totalhoursthisweek || 0,
  };
};

export const fetchSchedulesCountByUserId = async (user_id: string) => {
  const { data } = await supabase
    .from('meeting_details')
    .select()
    .contains('confirmed_user_ids', [user_id]);

  const upcomingCount = data.reduce(
    (acc, cur) => (cur.status === 'confirmed' ? acc + 1 : acc),
    0,
  );

  const completedCount = data.reduce(
    (acc, cur) => (cur.status === 'completed' ? acc + 1 : acc),
    0,
  );

  const cancelledCount = data.reduce(
    (acc, cur) => (cur.status === 'cancelled' ? acc + 1 : acc),
    0,
  );

  return {
    upcomingCount,
    completedCount,
    cancelledCount,
  };
};
