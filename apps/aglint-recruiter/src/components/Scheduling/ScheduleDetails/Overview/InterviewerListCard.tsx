import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { MemberDetail } from '@/devlink3/MemberDetail';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import InterviewerUserDetail from '../../Common/InterviewerUserDetail';
import { calculateHourDifference } from '../../InterviewTypes/utils';
import { ScheduleDetailsType } from '../hooks';

function InterviewerListCard({
  schedule,
  item,
  disableHoverListener = false,
  cancelReasons,
}: {
  schedule: ScheduleDetailsType['schedule_data'];
  item: ScheduleDetailsType['schedule_data']['users'][0];
  disableHoverListener: boolean;
  cancelReasons: ScheduleDetailsType['cancel_data'];
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const currentDay = dayjs();

  const allMeetings = item.weekly_meetings || [];
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
  const fullName =
    getFullName(item.first_name, item.last_name) +
    `${item.email === recruiterUser.email ? ' ( You )' : ''}`;

  const cancelReason = cancelReasons?.find(
    (cancel) =>
      cancel.interview_session_cancel?.session_relation_id ===
      item.interview_session_relation.id,
  )?.interview_session_cancel;

  return (
    <>
      <CustomTooltip
        disableHoverListener={disableHoverListener}
        key={item.id + ' member'}
        title={
          <React.Fragment>
            <Stack bgcolor={'#fff'} borderRadius={'var(--space-2)'}>
              <MemberDetail
                slotImage={
                  <MuiAvatar
                    level={fullName}
                    src={item.profile_image}
                    variant={'circular-medium'}
                  />
                }
                textJobTitle={item.department}
                textName={fullName}
                textMail={item.email}
                textLocation={item.location}
                textDesignation={item.position}
                textTimeZone={item.scheduling_settings?.timeZone?.tzCode}
                textTodayInterview={
                  item.scheduling_settings.interviewLoad.dailyLimit.type ==
                  'Hours'
                    ? `${dailyHours} / ${item.scheduling_settings.interviewLoad.dailyLimit.value} Hours`
                    : `${dailyNumber} / ${item.scheduling_settings.interviewLoad.dailyLimit.value} Interviews`
                }
                textWeekInterview={
                  item.scheduling_settings.interviewLoad.dailyLimit.type ==
                  'Hours'
                    ? `${weeklyHours} / ${item.scheduling_settings.interviewLoad.weeklyLimit.value} Hours`
                    : `${weeklyNumber} / ${item.scheduling_settings.interviewLoad.weeklyLimit.value} Interviews`
                }
                onClickViewInterviewDetail={{
                  onClick: () => {
                    router.replace(`/scheduling/interviewer/${item.id}`);
                  },
                }}
              />
            </Stack>
          </React.Fragment>
        }
      >
        <Stack>
          <InterviewerUserDetail
            interview_meeting={{
              end_time: schedule.interview_meeting.end_time,
              start_time: schedule.interview_meeting.start_time,
              status: schedule.interview_meeting.status,
            }}
            accepted_status={item.interview_session_relation.accepted_status}
            cancelReason={cancelReason}
            userDetails={{
              first_name: item.first_name,
              last_name: item.last_name,
              position: item.position,
              profile_image: item.profile_image,
            }}
            interviewerTimeZone={item.scheduling_settings?.timeZone?.tzCode}
            isCalendarConnected={true}
            isPaused={false}
            pause_json={null}
            trainingType={item.interview_session_relation.training_type}
          />
        </Stack>
      </CustomTooltip>
    </>
  );
}

export default InterviewerListCard;
