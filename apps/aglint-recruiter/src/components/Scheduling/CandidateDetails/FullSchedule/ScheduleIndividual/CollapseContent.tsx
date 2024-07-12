import { Collapse, Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { Text } from '@/devlink3/Text';
import { TextWithIcon } from '@/devlink3/TextWithIcon';
import InterviewerAcceptDeclineIcon from '@/src/components/Common/Icons/InterviewerAcceptDeclineIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToText } from '@/src/utils/number/numberToText';

import { getPauseMemberText } from '../../../InterviewTypes/ModuleMembers/SlotBodyComp/utils';
import { formatTimeWithTimeZone, getShortTimeZone } from '../../../utils';
import {
  SchedulingApplication,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setSelectedSession,
} from '../../store';
import { ScheduleIndividualCardType } from './types';

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
                  interview_session.session_type === 'panel'
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
                const fullName = getFullName(item.first_name, item.last_name);
                const isPaused = !!user?.interview_module_relation?.pause_json; //null check needed because debrief doesnt have module relation
                const isCalendarConnected =
                  (!!recruiter.service_json &&
                    recruiter.email.split('@')[1] ===
                      user.user_details.email.split('@')[1]) ||
                  !!(user.user_details.schedule_auth as any)?.access_token;

                return (
                  <GlobalUserDetail
                    slotCandidateStatus={
                      <Stack
                        height={'100%'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        direction={'row'}
                      >
                        {(interview_meeting?.status === 'confirmed' ||
                          interview_meeting?.status === 'completed') && (
                          <InterviewerAcceptDeclineIcon
                            type={
                              user.interview_session_relation.accepted_status
                            }
                          />
                        )}

                        {interview_meeting?.status !== 'confirmed' &&
                          interview_meeting?.status !== 'completed' && (
                            <>
                              {!isCalendarConnected && (
                                <GlobalBadge
                                  size={1}
                                  showIcon={true}
                                  iconName={'warning'}
                                  color={'error'}
                                  textBadge={`Calendar not connected`}
                                />
                              )}
                              {isPaused && (
                                <GlobalBadge
                                  size={1}
                                  showIcon={true}
                                  iconName={'error'}
                                  color={'warning'}
                                  textBadge={`Paused ${getPauseMemberText(
                                    user.interview_module_relation.pause_json,
                                  )}`}
                                />
                              )}
                            </>
                          )}
                      </Stack>
                    }
                    key={item.user_id}
                    textTimeZone={
                      interview_meeting?.start_time
                        ? formatTimeWithTimeZone({
                            start_time: interview_meeting.start_time,
                            end_time: interview_meeting.end_time,
                            timeZone:
                              user.user_details.scheduling_settings?.timeZone
                                ?.tzCode,
                          })
                        : getShortTimeZone(
                            user.user_details.scheduling_settings?.timeZone
                              ?.tzCode,
                          )
                    }
                    isRoleVisible={true}
                    slotRole={
                      item.position ? (
                        <TextWithIcon
                          fontWeight={'regular'}
                          textContent={item.position}
                          iconName={'work'}
                          iconSize={4}
                          color='neutral'
                          fontSize={1}
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
                  />
                );
              })}
            </Stack>
          </>
          <>
            {isCollapseButtonsVisible &&
              (interview_meeting?.status === 'waiting' ||
                interview_meeting?.status === 'confirmed') && (
                <Stack direction={'row'} spacing={'var(--space-2)'}>
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
        </Stack>
      )}
    </Collapse>
  );
}

export default CollapseContent;
