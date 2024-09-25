import { type DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import { schedulesSupabase } from 'src/app/_common/utils/schedules-query';

import { supabase } from '@/utils/supabase/client';

export const useInterviewsByUserId = ({
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
    queryKey: ['get_Interviews_BY_UserId', member_id, filter],
    queryFn: () => getInterviewsBYUserId({ member_id, filter }),
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

export const getInterviewsBYUserId = async ({
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

  if (typeof filter === 'string' || Array.isArray(filter)) {
    if (typeof filter === 'string') query.eq('status', filter);
    else if (Array.isArray(filter)) query.in('status', filter);
  }

  const { data } = await query.throwOnError();
  const interviews = data ?? [];
  if (interviews.length === 0) {
    return {
      schedules: [],
      totalInterviewsToday: 0,
      totalHoursToday: 0,
      totalInterviewsThisWeek: 0,
      totalHoursThisWeek: 0,
    };
  }
  // TODO: fix
  const user = (interviews[0]?.meeting_interviewers as any)?.find(
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

export const getInterviewsCountByUserId = async (user_id: string) => {
  const { data } = await supabase
    .from('meeting_details')
    .select()
    .contains('confirmed_user_ids', [user_id]);
  const meetingDetails = data ?? [];
  const upcomingCount = meetingDetails.reduce(
    (acc, cur) => (cur.status === 'confirmed' ? acc + 1 : acc),
    0,
  );

  const completedCount = meetingDetails.reduce(
    (acc, cur) => (cur.status === 'completed' ? acc + 1 : acc),
    0,
  );

  const cancelledCount = meetingDetails.reduce(
    (acc, cur) => (cur.status === 'cancelled' ? acc + 1 : acc),
    0,
  );

  return {
    upcomingCount,
    completedCount,
    cancelledCount,
  };
};
