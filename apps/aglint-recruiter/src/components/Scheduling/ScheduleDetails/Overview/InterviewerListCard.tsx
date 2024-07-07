import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { MemberDetail } from '@/devlink3/MemberDetail';
import InterviewerAcceptDeclineIcon from '@/src/components/Common/Icons/InterviewerAcceptDeclineIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { CustomTooltip } from '@/src/components/Common/Tooltip';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import { calculateHourDifference } from '../../InterviewTypes/utils';
import { formatTimeWithTimeZone } from '../../utils';
import { ScheduleMeeting } from '../types';

function InterviewerListCard({
  schedule,
  item,
  disableHoverListener = false,
}: {
  schedule: ScheduleMeeting;
  item: ScheduleMeeting['users'][0];
  disableHoverListener: boolean;
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
          <GlobalUserDetail
            textTimeZone={formatTimeWithTimeZone({
              start_time: schedule.interview_meeting.start_time,
              end_time: schedule.interview_meeting.end_time,
              timeZone: item.scheduling_settings?.timeZone?.tzCode,
            })}
            isRoleVisible={true}
            slotRole={
              item.position ? (
                <TextWithIcon
                  fontWeight={'regular'}
                  textContent={item.position}
                  iconName={'work'}
                  iconSize={4}
                  color='neutral'
                />
              ) : (
                '--'
              )
            }
            textName={fullName}
            slotImage={
              <MuiAvatar
                level={fullName}
                src={item.profile_image}
                variant={'rounded'}
                fontSize={'14px'}
                width='100%'
                height='100%'
              />
            }
            isSlotImageVisible={true}
            isCandidateAvatarVisible={false}
            slotCandidateStatus={
              <Stack
                height={'100%'}
                alignItems={'center'}
                justifyContent={'center'}
                direction={'row'}
              >
                <InterviewerAcceptDeclineIcon
                  type={item.interview_session_relation.accepted_status}
                />
              </Stack>
            }
          />
        </Stack>
      </CustomTooltip>
    </>
  );
}

export default InterviewerListCard;
