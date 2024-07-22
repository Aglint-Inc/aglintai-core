import { Collapse, Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { Text } from '@/devlink3/Text';
import { TextWithIcon } from '@/devlink3/TextWithIcon';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { numberToText } from '@/src/utils/number/numberToText';

import InterviewerUserDetail from '../../../../Common/InterviewerUserDetail';
import { formatTimeWithTimeZone } from '../../../../utils';
import {
  SchedulingApplication,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setSelectedSession,
} from '../../../store';
import { ScheduleIndividualCardType } from '../types';
import CancelBanners from './AdminCancelBanners';

function CollapseContent({
  currentSession,
  collapsed,
  candidate,
  allUsers,
  jobTitle = null,
  isCollapseButtonsVisible = false,
}: {
  currentSession: SchedulingApplication['initialSessions'][0] | null;
  collapsed: boolean;
  candidate: ScheduleIndividualCardType['candidate'];
  allUsers: ScheduleIndividualCardType['users'];
  jobTitle?: ScheduleIndividualCardType['jobTitle'];
  isCollapseButtonsVisible?: boolean;
}) {
  const { recruiter } = useAuthDetails();

  let users = allUsers;

  const interview_meeting = currentSession?.interview_meeting;
  const interview_session = currentSession?.interview_session;

  if (
    interview_meeting?.status === 'confirmed' ||
    interview_meeting?.status === 'completed'
  ) {
    users = allUsers?.filter(
      (user) => user.interview_session_relation.is_confirmed,
    );
  }

  const cancelReasons = currentSession?.cancel_reasons;

  return (
    <Collapse in={collapsed}>
      {!!currentSession && (
        <Stack padding={'var(--space-4)'} spacing={'var(--space-4)'}>
          <>
            {candidate.timezone && interview_meeting?.start_time && (
              <Stack spacing={'var(--space-2)'}>
                <GlobalUserDetail
                  textTimeZone={
                    interview_meeting?.start_time
                      ? formatTimeWithTimeZone({
                          start_time: interview_meeting.start_time,
                          end_time: interview_meeting.end_time,
                          timeZone: candidate.timezone,
                        })
                      : '--'
                  }
                  isRoleVisible={Boolean(candidate.currentJobTitle)}
                  slotRole={
                    jobTitle ? (
                      <TextWithIcon
                        fontWeight={'regular'}
                        textContent={candidate.currentJobTitle}
                        iconName={'work'}
                        iconSize={4}
                        color='neutral'
                      />
                    ) : (
                      '--'
                    )
                  }
                  textName={candidate.fullname}
                  isCandidateAvatarVisible={true}
                  textRole={''}
                />
              </Stack>
            )}

            <Stack spacing={'var(--space-2)'}>
              <Text
                content={
                  interview_meeting?.status === 'confirmed' ||
                  interview_meeting?.status === 'completed'
                    ? 'Interviewer(s)'
                    : interview_session.session_type === 'panel'
                      ? `${numberToText(
                          interview_session.interviewer_cnt,
                        )} of the member below will be picked as interviewer`
                      : interview_session.session_type === 'individual'
                        ? `One of the member below will be picked as interviewer`
                        : 'Interviewer(s)'
                }
                size={1}
                color={'neutral'}
                weight={'regular'}
              />
              {users.map((user) => {
                const item = user.user_details;
                const pause_json = user.interview_module_relation?.pause_json;
                const isPaused = !!pause_json; //null check needed because debrief doesnt have module relation
                const isCalendarConnected =
                  (!!recruiter.service_json &&
                    recruiter.email.split('@')[1] ===
                      user.user_details.email.split('@')[1]) ||
                  !!(user.user_details.schedule_auth as any)?.access_token;

                const cancelReason = cancelReasons?.find(
                  (can) =>
                    can.interview_session_cancel.session_relation_id ===
                    user.interview_session_relation.id,
                )?.interview_session_cancel;

                return (
                  <InterviewerUserDetail
                    key={item.user_id}
                    accepted_status={
                      user.interview_session_relation.accepted_status
                    }
                    cancelReason={cancelReason}
                    interview_meeting={{
                      end_time: interview_meeting?.end_time,
                      start_time: interview_meeting?.start_time,
                      status: interview_meeting?.status,
                    }}
                    interviewerTimeZone={
                      item.scheduling_settings?.timeZone.tzCode
                    }
                    isCalendarConnected={isCalendarConnected}
                    isPaused={isPaused}
                    pause_json={pause_json}
                    userDetails={{
                      first_name: item.first_name,
                      last_name: item.last_name,
                      position: item.position,
                      profile_image: item.profile_image,
                    }}
                    trainingType={user.interview_session_relation.training_type}
                    interviewerType={
                      user.interview_session_relation.interviewer_type
                    }
                  />
                );
              })}
            </Stack>
          </>
          <>
            {isCollapseButtonsVisible &&
              (interview_meeting?.status === 'waiting' ||
                interview_meeting?.status === 'confirmed') && (
                <Stack
                  direction={'row'}
                  spacing={'var(--space-2)'}
                  justifyContent={'flex-end'}
                >
                  <ButtonSoft
                    size={1}
                    color={'neutral'}
                    textButton={'Reschedule'}
                    onClickButton={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedSession(currentSession);
                        setIndividualRescheduleOpen(true);
                      },
                    }}
                  />
                  <ButtonSoft
                    size={1}
                    color={'error'}
                    textButton={'Cancel'}
                    onClickButton={{
                      onClick: (e) => {
                        e.stopPropagation();
                        setSelectedSession(currentSession);
                        setIndividualCancelOpen(true);
                      },
                    }}
                  />
                </Stack>
              )}
          </>
          <CancelBanners
            cancelReasons={cancelReasons}
            currentSession={currentSession}
          />
        </Stack>
      )}
    </Collapse>
  );
}

export default CollapseContent;
