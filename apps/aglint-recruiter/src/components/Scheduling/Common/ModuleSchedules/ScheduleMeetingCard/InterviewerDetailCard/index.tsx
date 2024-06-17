import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { MemberDetail } from '@/devlink3/MemberDetail';
import { MembersList } from '@/devlink3/MembersList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { calculateHourDifference } from '@/src/components/Scheduling/InterviewTypes/utils';
import { convertTimeZoneToAbbreviation } from '@/src/components/Scheduling/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import { ScheduleListType } from '../../hooks';

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
  const currentDay = dayjs();
  const { recruiterUser } = useAuthDetails();
  const router = useRouter();
  const timeFrom = dayjs(meetingTiming.startDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );
  const timeTo = dayjs(meetingTiming.endDate).tz(
    user.scheduling_settings.timeZone.tzCode,
  );

  const allMeetings = user.weekly_meetings || [];
  const dailyMeetings = allMeetings.filter((meet) =>
    dayjs(meet?.end_time).isSame(currentDay, 'day'),
  );

  const weeklyHours = allMeetings.reduce((acc, curr) => {
    return acc + calculateHourDifference(curr.start_time, curr.end_time);
  }, 0);
  const dailyHours = dailyMeetings.reduce((acc, curr) => {
    return acc + calculateHourDifference(curr.start_time, curr.end_time);
  }, 0);
  const weeklyNumber = allMeetings.length;
  const dailyNumber = dailyMeetings.length;
  const timeZone = user.scheduling_settings.timeZone.tzCode;
  const fullName =
    getFullName(user.first_name, user.last_name) +
    `${user.email === recruiterUser.email ? ' ( You )' : ''}`;

  return (
    <CustomTooltip
      title={
        <React.Fragment>
          <Stack bgcolor={'#fff'} borderRadius={'var(--radius-4)'}>
            <MemberDetail
              slotImage={
                <MuiAvatar
                  level={fullName}
                  src={user.profile_image}
                  variant={'rounded-medium'}
                />
              }
              textJobTitle={user.position}
              textName={fullName}
              textMail={user.email}
              textLocation={user.location}
              textDesignation={user.position}
              textTimeZone={timeZone}
              textTodayInterview={
                user.scheduling_settings.interviewLoad.dailyLimit.type ==
                'Hours'
                  ? `${dailyHours} / ${user.scheduling_settings.interviewLoad.dailyLimit.value} Hours`
                  : `${dailyNumber} / ${user.scheduling_settings.interviewLoad.dailyLimit.value} Interviews`
              }
              textWeekInterview={
                user.scheduling_settings.interviewLoad.dailyLimit.type ==
                'Hours'
                  ? `${weeklyHours} / ${user.scheduling_settings.interviewLoad.weeklyLimit.value} Hours`
                  : `${weeklyNumber} / ${user.scheduling_settings.interviewLoad.weeklyLimit.value} Interviews`
              }
              onClickViewInterviewDetail={{
                onClick: (e) => {
                  e.stopPropagation();
                  router.replace(`/scheduling/interviewer/${user.id}`);
                },
              }}
            />
          </Stack>
        </React.Fragment>
      }
    >
      <Stack>
        <MembersList
          slotImage={
            <MuiAvatar
              key={user.id}
              src={user.profile_image}
              level={getFullName(user.first_name, user.last_name)}
              variant='rounded-medium'
            />
          }
          textName={getFullName(user.first_name, user.last_name)}
          isDesignationVisible={true}
          textDesignation={user.position}
          textTime={
            meetingTiming.startDate
              ? `${timeFrom.format('hh:mm A')} - ${timeTo.format('hh:mm A')} ${convertTimeZoneToAbbreviation(userTzDayjs.tz.guess())}`
              : null
          }
          isShadow={user.training_type === 'shadow'}
          isReverseShadow={user.training_type === 'reverse_shadow'}
          isButtonVisible={false}
          isDetailVisible={true}
        />
      </Stack>
    </CustomTooltip>
  );
}

export default InterviewerDetailsCard;
