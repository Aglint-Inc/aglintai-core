import { type RecruiterUserType } from '@aglint/shared-types';
import {
  type TooltipProps,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { MemberDetail } from '@/devlink3/MemberDetail';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { type ScheduleListType } from '@/src/components/Scheduling/Common/ModuleSchedules/hooks';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

function AssigneeDetailsCard({
  assigneeDetails,
}: {
  assigneeDetails: RecruiterUserType;
}) {
  const router = useRouter();
  const {
    data: meetingDetails,
    isLoading,
    isFetched,
  } = useMeetingDetails(assigneeDetails.user_id);
  if (isLoading && !isFetched) {
    return (
      <Stack bgcolor={'var(--white-a7'}>
        <DynamicLoader height='200px' />
      </Stack>
    );
  }
  const userMeetingDetails = meetingDetails.map(
    (ele) => ele.interviewer_meetings,
  ) as unknown as ScheduleListType[number]['users'][number]['weekly_meetings'];

  const today = dayjs().startOf('day');
  let totalInterviewsThisWeek: {
    start_time: string;
    end_time: string;
    duration: number;
  }[] = [];
  let totalInterviewsToday: {
    start_time: string;
    end_time: string;
    duration: number;
  }[] = [];
  let totalHoursThisWeek = 0;
  let totalHoursToday = 0;

  const firstDayOfWeek = dayjs().startOf('week').startOf('day').format();
  const lastDayOfWeek = dayjs().endOf('week').endOf('day').format();
  if (userMeetingDetails.length) {
    totalInterviewsToday = userMeetingDetails.filter((interview) =>
      dayjs(interview.end_time).isSame(today, 'day'),
    );

    totalInterviewsThisWeek = userMeetingDetails.filter(
      (interview) =>
        interview.start_time >= firstDayOfWeek &&
        interview.end_time <= lastDayOfWeek,
    );
    totalHoursToday =
      Number(totalInterviewsToday.reduce((a, b) => a + b.duration, 0)) / 60;

    totalHoursThisWeek =
      Number(totalInterviewsThisWeek.reduce((a, b) => a + b.duration, 0)) / 60;
  }

  return (
    <MemberDetail
      slotImage={
        <MuiAvatar
          src={assigneeDetails?.profile_image}
          variant='rounded-medium'
          level={getFullName(
            assigneeDetails?.first_name,
            assigneeDetails?.last_name,
          )}
        />
      }
      textName={getFullName(
        assigneeDetails?.first_name,
        assigneeDetails?.last_name,
      )}
      isDesignationVisible={true}
      textDesignation={capitalizeAll(assigneeDetails?.role)}
      textLocation={assigneeDetails?.department?.name || '--'}
      textMail={assigneeDetails.email}
      textTimeZone={assigneeDetails?.scheduling_settings?.timeZone.tzCode}
      //   textTime={`${timeFrom.format('hh:mm A')} - ${timeTo.format('hh:mm A')} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`}
      isShadow={false}
      onClickViewInterviewDetail={{
        onClick: (e) => {
          e.stopPropagation();
          router.push(`/scheduling/interviewer/${assigneeDetails.user_id}`);
        },
      }}
      textJobTitle={assigneeDetails.position}
      textWeekInterview={
        <ShowCode>
          <ShowCode.When
            isTrue={
              assigneeDetails?.scheduling_settings?.interviewLoad?.weeklyLimit
                .type === 'Interviews'
            }
          >
            {`${totalInterviewsThisWeek.length}/${assigneeDetails.scheduling_settings?.interviewLoad?.weeklyLimit.value} ${assigneeDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              assigneeDetails?.scheduling_settings?.interviewLoad?.weeklyLimit
                .type === 'Hours'
            }
          >
            {`${totalHoursThisWeek}/${assigneeDetails?.scheduling_settings?.interviewLoad?.weeklyLimit.value} ${assigneeDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
        </ShowCode>
      }
      textTodayInterview={
        <ShowCode>
          <ShowCode.When
            isTrue={
              assigneeDetails.scheduling_settings?.interviewLoad?.dailyLimit
                .type === 'Interviews'
            }
          >
            {`${totalInterviewsToday.length}/${assigneeDetails.scheduling_settings?.interviewLoad?.dailyLimit.value} ${assigneeDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              assigneeDetails?.scheduling_settings?.interviewLoad?.dailyLimit
                .type === 'Hours'
            }
          >
            {`${totalHoursToday}/${assigneeDetails.scheduling_settings?.interviewLoad?.dailyLimit.value} ${assigneeDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default AssigneeDetailsCard;

export const useMeetingDetails = (user_id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_Meeting_Details', { user_id }],
    queryFn: () => getMeetingDetails(user_id),
    staleTime: Infinity,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_Meeting_Details', { user_id }],
    });
  return { ...query, refetch };
};

async function getMeetingDetails(user_id: string) {
  const { data: meetings } = await supabase.rpc('get_interviewer_meetings', {
    target_user_id: user_id,
  });

  return meetings;
}

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--neutral-6)',
    color: 'var(--neutral-12)',
    boxShadow: 'none',
    fontSize: 12,
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    minWidth: 360,
  },
}));
