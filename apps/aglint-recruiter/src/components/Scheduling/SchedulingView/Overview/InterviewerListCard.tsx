import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { MemberDetail, MembersList } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import { calculateHourDifference } from '../../Modules/utils';
import { convertTimeZoneToAbbreviation } from '../../utils';
import { ScheduleMeeting } from '../types';

function InterviewerListCard({
  schedule,
  item,
  setIsDeclineOpen,
}: {
  schedule: ScheduleMeeting;
  item: ScheduleMeeting['users'][0];
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const currentDay = dayjs();
  const queryClient = useQueryClient();

  const onClickAccept = async (session_relation_id) => {
    if (schedule.interview_meeting.status === 'confirmed') {
      await supabase
        .from('interview_session_relation')
        .update({ accepted_status: 'accepted' })
        .eq('id', session_relation_id);
      queryClient.invalidateQueries({
        queryKey: ['schedule_details', router?.query?.meeting_id],
      });
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
  const timeZone = item.scheduling_settings.timeZone.tzCode;
  const fullName =
    getFullName(item.first_name, item.last_name) +
    `${item.email === recruiterUser.email ? ' ( You )' : ''}`;

  return (
    <>
      <CustomTooltip
        key={item.id + ' member'}
        title={
          <React.Fragment>
            <Stack bgcolor={'#fff'} borderRadius={'10px'}>
              <MemberDetail
                slotImage={
                  <MuiAvatar
                    level={fullName}
                    src={item.profile_image}
                    variant={'circular'}
                    width={'100%'}
                    height={'100%'}
                    fontSize={'14px'}
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
            isCorrectVisible={isAccepted}
            isWrongVisible={isDeclined}
            isDetailVisible={true}
            isDesignationVisible={recruiterUser.user_id !== item.id}
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
                variant={'circular'}
                width={'100%'}
                height={'100%'}
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
            textTime={`${dayjs(schedule.interview_meeting.start_time)
              .tz(timeZone)
              .format(
                'hh:mm A',
              )} - ${dayjs(schedule.interview_meeting.end_time).tz(timeZone).format('hh:mm A')} ${convertTimeZoneToAbbreviation(timeZone)}`}
          />
        </Stack>
      </CustomTooltip>
    </>
  );
}

export default InterviewerListCard;
