import { type DatabaseEnums, type schedulingSettingType } from '@aglint/shared-types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { supabase } from '@/src/utils/supabase/client';

const today = dayjs().startOf('day');
const firstDayOfWeek = dayjs().startOf('week').startOf('day').format();
const lastDayOfWeek = dayjs().endOf('week').endOf('day').format();

export const useScheduleList = ({ user_id }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_scheduleList', user_id],
    queryFn: () => getScheduleList(user_id),
    enabled: !!user_id,
    placeholderData: {
      schedules: [],
      totalHoursToday: 0,
      totalHoursThisWeek: 0,
      totalInterviewsToday: 0,
      totalInterviewsThisWeek: 0,
    },
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_scheduleList', user_id] });
  return { ...query, refetch };
};

async function getScheduleList(user_id: string) {
  const { data, error } = await supabase.rpc(
    'new_get_interview_schedule_by_user_id',
    {
      target_user_id: user_id,
    },
  );

  if (error) throw Error(error.message);
  else {
    const completedInterviews = (data as ScheduleListType)?.filter(
      (item) =>
        item.interview_meeting.status == 'completed' ||
        item.interview_meeting.status == 'confirmed',
    );

    const totalInterviewsToday = completedInterviews?.filter((interview) =>
      dayjs(interview.interview_meeting.end_time).isSame(today, 'day'),
    );

    const totalInterviewsThisWeek = completedInterviews?.filter(
      (interview) =>
        interview.interview_meeting.start_time >= firstDayOfWeek &&
        interview.interview_meeting.end_time <= lastDayOfWeek,
    );

    const totalHoursToday =
      Number(
        totalInterviewsToday.reduce(
          (a, b) => a + b.interview_meeting.session_duration,
          0,
        ),
      ) / 60;

    const totalHoursThisWeek =
      Number(
        totalInterviewsThisWeek.reduce(
          (a, b) => a + b.interview_meeting.session_duration,
          0,
        ),
      ) / 60;

    return {
      schedules: data,
      totalHoursToday: totalHoursToday || 0,
      totalHoursThisWeek: totalHoursThisWeek || 0,
      totalInterviewsToday: totalInterviewsToday?.length || 0,
      totalInterviewsThisWeek: totalInterviewsThisWeek?.length || 0,
    } as {
      schedules: ScheduleListType;
      totalHoursToday: number;
      totalHoursThisWeek: number;
      totalInterviewsToday: number;
      totalInterviewsThisWeek: number;
    };
  }
}

export type ScheduleListType = {
  interview_meeting: {
    end_time: string;
    job_id: string;
    job_title: string;
    schedule_type: DatabaseEnums['interview_schedule_type'];
    session_duration: number;
    session_name: string;
    start_time: string;
    status: DatabaseEnums['interview_schedule_status'];
    meeting_id: string;
    module_id: string;
  };
  users: {
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    location: string;
    position: string;
    profile_image: string;
    scheduling_settings: schedulingSettingType;
    training_type: DatabaseEnums['interviewer_type'];
    is_confirmed: boolean;
    weekly_meetings: {
      end_time: string;
      duration: number;
      start_time: string;
    }[];
    accepted_status: DatabaseEnums['session_accepted_status'];
  }[];
  candidate: {
    candidate_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    application_id: string;
  };
}[];
