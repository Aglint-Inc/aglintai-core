import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { MembersList } from '@/devlink3/MembersList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { convertTimeZoneToAbbreviation } from '@/src/components/Scheduling/utils';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import { ScheduleListType } from '../..';

function InterviewerDetailsCard({
  user,
  meetingTiming,
}: {
  user: ScheduleListType[number]['users'][number];
  meetingTiming: {
    startDate: string;
    endDate: string;
  };
}) {
  const router = useRouter();
  const timeFrom = dayjs(meetingTiming.startDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );
  const timeTo = dayjs(meetingTiming.endDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );

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
  if (user.weekly_meetings) {
    totalInterviewsToday = user.weekly_meetings.filter((interview) =>
      dayjs(interview.end_time).isSame(today, 'day'),
    );

    totalInterviewsThisWeek = user.weekly_meetings.filter(
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
    <MembersList
      isCorrectVisible={user.accepted_status === 'accepted'}
      slotImage={
        <MuiAvatar
          key={user.id}
          src={user.profile_image}
          level={getFullName(user.first_name, user.last_name)}
          variant='circular'
          height='40px'
          width='40px'
          fontSize='12px'
        />
      }
      textName={getFullName(user.first_name, user.last_name)}
      isDesignationVisible={true}
      textDesignation={user.position}
      textLocation={user.location}
      textMail={user.email}
      textTimeZone={user.scheduling_settings.timeZone.label}
      textTime={`${timeFrom.format('hh:mm A')} - ${timeTo.format('hh:mm A')} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`}
      isShadow={user.training_type !== 'qualified'}
      onClickViewInterviewDetail={{
        onClick: (e) => {
          e.stopPropagation();
          router.push(`/scheduling/interviewer/${user.id}`);
        },
      }}
      textJobTitle={user.position}
      textWeekInterview={
        <ShowCode>
          <ShowCode.When
            isTrue={
              user?.scheduling_settings?.interviewLoad?.weeklyLimit.type ===
              'Interviews'
            }
          >
            {`${totalInterviewsThisWeek.length}/${user.scheduling_settings?.interviewLoad?.weeklyLimit.value} ${user?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              user?.scheduling_settings?.interviewLoad?.weeklyLimit.type ===
              'Hours'
            }
          >
            {`${totalHoursThisWeek}/${user?.scheduling_settings?.interviewLoad?.weeklyLimit.value} ${user?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
        </ShowCode>
      }
      textTodayInterview={
        <ShowCode>
          <ShowCode.When
            isTrue={
              user.scheduling_settings?.interviewLoad?.dailyLimit.type ===
              'Interviews'
            }
          >
            {`${totalInterviewsToday.length}/${user.scheduling_settings?.interviewLoad?.dailyLimit.value} ${user?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
          <ShowCode.When
            isTrue={
              user?.scheduling_settings?.interviewLoad?.dailyLimit.type ===
              'Hours'
            }
          >
            {`${totalHoursToday}/${user.scheduling_settings?.interviewLoad?.dailyLimit.value} ${user?.scheduling_settings?.interviewLoad?.dailyLimit.type}`}
          </ShowCode.When>
        </ShowCode>
      }
      isButtonVisible={false}
      isDetailVisible={true}
    />
  );
}

export default InterviewerDetailsCard;
