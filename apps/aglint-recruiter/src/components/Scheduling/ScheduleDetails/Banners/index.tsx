import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../CandidateDetails/store';
import { onClickResendInvite } from '../../CandidateDetails/utils';
import { useScheduleDetails } from '../hooks';
import { ScheduleMeeting } from '../types';
import { onClickAccept, onClickCopyLink } from '../utils';

interface CancelReasonCardsProps {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  cancelUserId: string;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterJson: DatabaseTable['interview_filter_json'];
  requestAvailibility: DatabaseTable['candidate_request_availability'];
  refetch: () => void;
  sessionRelation: DatabaseTable['interview_session_relation'];
  setIsDeclineOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Banners({
  cancelReasons,
  schedule,
  setCancelUserId,
  cancelUserId,
  setIsChangeInterviewerOpen,
  filterJson,
  requestAvailibility,
  refetch,
  sessionRelation,
  setIsDeclineOpen,
}: CancelReasonCardsProps) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
  );

  const meetingFlow = schedule.interview_meeting.meeting_flow;

  const isUnconfirmedBannerVisible =
    schedule.interview_meeting.status === 'waiting' &&
    schedule.interview_meeting.meeting_flow !== 'debrief' &&
    (meetingFlow === 'self_scheduling' || meetingFlow === 'candidate_request');

  const isAcceptVisible =
    sessionRelation?.accepted_status === 'waiting' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isDeclineVisible =
    sessionRelation?.accepted_status !== 'declined' &&
    sessionRelation?.accepted_status !== 'request_reschedule' &&
    schedule.interview_meeting.status === 'confirmed' &&
    sessionRelation?.training_type === 'qualified';

  const isConfirmed = schedule.interview_meeting.status === 'confirmed';

  return (
    <Stack spacing={'var(--space-4)'}>
      {isConfirmed && (isDeclineVisible || isAcceptVisible) && (
        <GlobalBanner
          color={'info'}
          textTitle={'You are invited for this interview'}
          isDescriptionVisible={false}
          isAdditionalNotes={false}
          iconName={'archive'}
          slotButtons={
            <>
              {isDeclineVisible && (
                <ButtonSoft
                  size={'1'}
                  textButton={'Decline'}
                  color={'neutral'}
                  onClickButton={{
                    onClick: () => {
                      setIsDeclineOpen(true);
                    },
                  }}
                />
              )}
              {isAcceptVisible && (
                <ButtonSolid
                  size={'1'}
                  textButton={'Accept'}
                  onClickButton={{
                    onClick: () => {
                      onClickAccept(sessionRelation.id);
                      refetch();
                    },
                  }}
                />
              )}
            </>
          }
        />
      )}

      {isUnconfirmedBannerVisible && (
        <GlobalBanner
          color={'warning'}
          textTitle={
            meetingFlow === 'self_scheduling'
              ? 'Candidate received a self scheduling link'
              : meetingFlow === 'candidate_request'
                ? 'Candidate received a request availibility link'
                : ''
          }
          textDescription={
            meetingFlow === 'self_scheduling'
              ? 'The interview will be confirmed once the candidate picks the suitable option'
              : meetingFlow === 'candidate_request'
                ? 'The interview will be confirmed once the candidate picks the suitable option and you confirm it'
                : ''
          }
          slotButtons={
            <>
              <ButtonSoft
                size={'1'}
                textButton={'Copy Link'}
                onClickButton={{
                  onClick: () => {
                    onClickCopyLink({
                      schedule_id: schedule.schedule.id,
                      filter_id: filterJson?.id,
                      request_id: requestAvailibility?.id,
                    });
                  },
                }}
              />
              <ButtonSolid
                size={'1'}
                textButton={'Resend'}
                onClickButton={{
                  onClick: () => {
                    if (
                      schedule.interview_meeting.status === 'waiting' ||
                      schedule.interview_meeting.status === 'confirmed'
                    ) {
                      onClickResendInvite({
                        session_name: schedule.interview_session.name,
                        application_id: schedule.schedule.application_id,
                        candidate_name: getFullName(
                          schedule.candidates.first_name,
                          schedule.candidates.last_name,
                        ),
                        rec_user_id: recruiterUser.user_id,
                        filter_id: filterJson.id,
                        request_id: requestAvailibility.id,
                      });
                    } else {
                      toast.warning(
                        'Email will be sent only if meeting status is waiting or confirmed',
                      );
                    }
                  },
                }}
              />
            </>
          }
        />
      )}

      {(schedule.interview_meeting.status === 'confirmed' ||
        schedule.interview_meeting.status === 'waiting' ||
        schedule.interview_meeting.status === 'cancelled') && (
        <>
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
                          color={'error'}
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
                                ROUTES[
                                  '/scheduling/application/[application_id]'
                                ]({
                                  application_id:
                                    schedule.schedule.application_id,
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
        </>
      )}
    </Stack>
  );
}

export default Banners;
