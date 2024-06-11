import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { RescheduleCard } from '@/devlink3/RescheduleCard';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { useScheduleDetails } from '../hooks';
import { ScheduleMeeting } from '../types';

function CancelReasonCards({
  cancelReasons,
  schedule,
  setIsCancelOpen,
  setIsRescheduleOpen,
  setCancelUserId,
  cancelUserId,
  setRange,
  setIsChangeInterviewerOpen,
}: {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRescheduleOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  cancelUserId: string;
  setRange: React.Dispatch<
    React.SetStateAction<{
      start_date: string;
      end_date: string;
    }>
  >;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const currentDay = dayjs();
  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
  );

  return (
    <Stack spacing={'var(--space-4)'}>
      {cancelReasons?.map((item) => {
        return (
          <RescheduleCard
            textColorProps={{
              style: {
                color:
                  item.interview_session_cancel.type === 'reschedule'
                    ? '#703815'
                    : '#681219',
              },
            }}
            textName={
              item.interview_session_cancel.session_relation_id
                ? getFullName(
                    item.recruiter_user.first_name,
                    item.recruiter_user.last_name,
                  )
                : getFullName(
                    item.candidate?.first_name,
                    item.candidate?.last_name,
                  )
            }
            key={item.interview_session_cancel.id}
            slotProfileImage={
              item.interview_session_cancel.session_relation_id ? (
                <MuiAvatar
                  level={getFullName(
                    item.recruiter_user.first_name,
                    item.recruiter_user.last_name,
                  )}
                  src={item.recruiter_user.profile_image}
                  variant={'rounded-small'}
                />
              ) : (
                <GlobalIcon iconName='account_circle' />
                // <svg
                //   width='25'
                //   height='25'
                //   viewBox='0 0 25 25'
                //   fill='none'
                //   xmlns='http://www.w3.org/2000/svg'
                // >
                //   <circle
                //     cx='12'
                //     cy='12'
                //     r='12'
                //     fill='url(#pattern0_10109_111939)'
                //   />
                //   <defs>
                //     <pattern
                //       id='pattern0_10109_111939'
                //       patternContentUnits='objectBoundingBox'
                //       width='1'
                //       height='1'
                //     >
                //       <use
                //         href='#image0_10109_111939'
                //         transform='scale(0.00625)'
                //       />
                //     </pattern>
                //     <image
                //       id='image0_10109_111939'
                //       width='160'
                //       height='160'
                //       href='data:image/png;base64,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'
                //     />
                //   </defs>
                // </svg>
              )
            }
            onClickRescheduleNow={{
              onClick: () => {
                setRange({
                  start_date:
                    item.interview_session_cancel?.other_details?.dateRange
                      ?.start || currentDay.toISOString(),
                  end_date:
                    item.interview_session_cancel?.other_details?.dateRange
                      ?.end || currentDay.add(15, 'day').toISOString(),
                });
                setIsRescheduleOpen(true);
              },
            }}
            textReschedule={
              item.interview_session_cancel.schedule_id
                ? item.interview_session_cancel.type === 'reschedule'
                  ? 'requested for reschedule'
                  : 'cancelled this schedule'
                : item.interview_session_cancel.type === 'reschedule'
                  ? 'requested for reschedule'
                  : 'declined this schedule'
            }
            isChangeInterviewerVisible={
              item.interview_session_cancel.session_relation_id &&
              schedule.interview_session.session_type != 'debrief' &&
              possibleUsers.length > 0
            }
            textReason={item.interview_session_cancel.reason}
            onClickChangeInterviewer={{
              onClick: () => {
                setCancelUserId(item.recruiter_user.id);
                setIsChangeInterviewerOpen(true);
              },
            }}
            isRescheduleBtnVisible={!item.interview_session_cancel.schedule_id}
            isCancelVisible={
              item.interview_session_cancel.schedule_id &&
              item.interview_session_cancel.type === 'declined'
            }
            onClickCancel={{
              onClick: () => {
                setCancelUserId(item.recruiter_user.id);
                setIsCancelOpen(true);
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default CancelReasonCards;
