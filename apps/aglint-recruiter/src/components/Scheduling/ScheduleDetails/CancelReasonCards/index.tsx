import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../CandidateDetails/store';
import { useScheduleDetails } from '../hooks';
import { ScheduleMeeting } from '../types';

interface CancelReasonCardsProps {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  cancelUserId: string;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CancelReasonCards({
  cancelReasons,
  schedule,
  setCancelUserId,
  cancelUserId,
  setIsChangeInterviewerOpen,
}: CancelReasonCardsProps) {
  const router = useRouter();
  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
  );

  return (
    <Stack spacing={'var(--space-4)'}>
      {cancelReasons?.map((item) => {
        const isChangeInterviewerVisible =
          item.interview_session_cancel.session_relation_id &&
          schedule.interview_session.session_type != 'debrief' &&
          possibleUsers.length > 0;

        const isRescheduleVisible =
          item.interview_session_cancel.type === 'reschedule';

        return (
          <>
            <GlobalBanner
              isAdditionalNotes={
                !!item.interview_session_cancel.other_details?.note
              }
              textNotes={item.interview_session_cancel.other_details?.note}
              color={
                item.interview_session_cancel.type === 'reschedule'
                  ? 'warning'
                  : item.interview_session_cancel.type === 'declined'
                    ? 'error'
                    : 'neutral'
              }
              textTitle={`${
                item.interview_session_cancel.session_relation_id
                  ? getFullName(
                      item.recruiter_user.first_name,
                      item.recruiter_user.last_name,
                    )
                  : getFullName(
                      item.candidate?.first_name,
                      item.candidate?.last_name,
                    )
              } ${
                item.interview_session_cancel.schedule_id
                  ? item.interview_session_cancel.type === 'reschedule'
                    ? 'requested a reschedule'
                    : 'cancelled this schedule'
                  : item.interview_session_cancel.type === 'reschedule'
                    ? 'requested a reschedule'
                    : 'declined this schedule'
              }`}
              textDescription={`Reason: ${item.interview_session_cancel.reason}  ${item.interview_session_cancel?.other_details?.dateRange ? ` from ${dayjs(item.interview_session_cancel.other_details.dateRange.start).format('DD MMM')} - ${dayjs(item.interview_session_cancel.other_details.dateRange.end).format('DD MMM')}` : ''}`}
              slotButtons={
                <>
                  {isChangeInterviewerVisible && (
                    <ButtonSolid
                      size={'1'}
                      textButton={'Change Interviewer'}
                      onClickButton={{
                        onClick: () => {
                          if (
                            dayjs().isBefore(
                              dayjs(schedule.interview_meeting.start_time),
                            )
                          ) {
                            setCancelUserId(item.recruiter_user.id);
                            setIsChangeInterviewerOpen(true);
                          } else {
                            toast.warning(
                              'Cannot change interviewer after the meeting has started',
                            );
                          }
                        },
                      }}
                    />
                  )}
                  {isRescheduleVisible && (
                    <ButtonSolid
                      size={'1'}
                      textButton={'Reschedule Now'}
                      onClickButton={{
                        onClick: () => {
                          setIsScheduleNowOpen(true);
                          setRescheduleSessionIds([
                            schedule.interview_session.id,
                          ]);
                          setStepScheduling('reschedule');
                          router.push(
                            ROUTES['/scheduling/application/[application_id]']({
                              application_id: schedule.schedule.application_id,
                            }),
                          );
                        },
                      }}
                    />
                  )}
                </>
              }
              iconName={
                item.interview_session_cancel.type === 'declined'
                  ? 'event_busy'
                  : item.interview_session_cancel.type === 'reschedule'
                    ? 'event_repeat'
                    : ''
              }
            />
          </>
        );
      })}
    </Stack>
  );
}

export default CancelReasonCards;
