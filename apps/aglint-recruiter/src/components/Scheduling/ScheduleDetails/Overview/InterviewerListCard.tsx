import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { MemberDetail } from '@/devlink3/MemberDetail';
import { MembersList } from '@/devlink3/MembersList';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import { calculateHourDifference } from '../../InterviewTypes/utils';
import { formatTimeWithTimeZone } from '../../utils';
import { ScheduleMeeting } from '../types';
import IconAccept from './IconAccept';
import IconDecline from './IconDecline';

function InterviewerListCard({
  schedule,
  item,
  setIsDeclineOpen,
  refetch,
  disableHoverListener = false,
}: {
  schedule: ScheduleMeeting;
  item: ScheduleMeeting['users'][0];
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  disableHoverListener?: boolean;
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const currentDay = dayjs();

  const onClickAccept = async (session_relation_id) => {
    if (schedule.interview_meeting.status === 'confirmed') {
      await supabase
        .from('interview_session_relation')
        .update({ accepted_status: 'accepted' })
        .eq('id', session_relation_id);
      refetch();
    }
  };

  const isAccepted =
    item.interview_session_relation.accepted_status === 'accepted';
  const isDeclined =
    item.interview_session_relation.accepted_status === 'declined';
  const isAcceptVisible =
    item.interview_session_relation.accepted_status === 'waiting' &&
    schedule.interview_meeting.status === 'confirmed' &&
    item.interview_session_relation.training_type === 'qualified';
  const isDeclineVisible =
    item.interview_session_relation.accepted_status !== 'declined' &&
    item.interview_session_relation.accepted_status !== 'request_reschedule' &&
    schedule.interview_meeting.status === 'confirmed' &&
    item.interview_session_relation.training_type === 'qualified';
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
          <MembersList
            onClickAccept={{
              onClick: () => {
                onClickAccept(item.interview_session_relation.id);
              },
            }}
            textDesignation={item.position || '--'}
            slotIcon={
              isAccepted ? <IconAccept /> : isDeclined ? <IconDecline /> : ''
            }
            isDetailVisible={true}
            isDesignationVisible={true}
            isButtonVisible={false}
            isAcceptDeclineVisibe={recruiterUser.user_id === item.id}
            isAcceptVisible={isAcceptVisible}
            isDeclineVisible={isDeclineVisible}
            onClickDecline={{
              onClick: () => {
                setIsDeclineOpen(true);
              },
            }}
            slotImage={
              <MuiAvatar
                level={fullName}
                src={item.profile_image}
                variant={'rounded-medium'}
                fontSize={'14px'}
              />
            }
            textName={fullName}
            isReverseShadow={
              item.interview_session_relation.training_type === 'reverse_shadow'
            }
            isShadow={
              item.interview_session_relation.training_type === 'shadow'
            }
            textTime={formatTimeWithTimeZone({
              start_time: schedule.interview_meeting.start_time,
              end_time: schedule.interview_meeting.end_time,
              timeZone: userTzDayjs.tz.guess(),
            })}
          />
        </Stack>
      </CustomTooltip>
    </>
  );
}

export default InterviewerListCard;
