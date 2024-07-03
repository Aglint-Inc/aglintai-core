import { Collapse, Stack } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { Text } from '@/devlink3/Text';
import { TextWithIcon } from '@/devlink3/TextWithIcon';
import InterviewerAcceptDeclineIcon from '@/src/components/Common/Icons/InterviewerAcceptDeclineIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { formatTimeWithTimeZone } from '../../../utils';
import {
  SchedulingApplication,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setSelectedSession,
} from '../../store';
import { ScheduleIndividualCardType } from './types';

function CollapseContent({
  interview_meeting,
  currentSession,
  collapsed,
  candidate,
  jobTitle,
  confirmedUsers,
}: {
  interview_meeting: ScheduleIndividualCardType['interview_meeting'];
  currentSession: SchedulingApplication['initialSessions'][0] | null;
  collapsed: boolean;
  candidate: ScheduleIndividualCardType['candidate'];
  jobTitle: ScheduleIndividualCardType['jobTitle'];
  confirmedUsers: ScheduleIndividualCardType['users'];
}) {
  return (
    <Collapse in={collapsed}>
      {!!currentSession && (
        <Stack padding={'var(--space-4)'} spacing={'var(--space-4)'}>
          <>
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

            {(interview_meeting?.status === 'confirmed' ||
              interview_meeting?.status === 'completed') && (
              <Stack spacing={'var(--space-2)'}>
                <Text content={'Interviwers'} size={1} color={'neutral'} />
                {confirmedUsers.map((user) => {
                  const item = user.user_details;
                  const fullName = getFullName(item.first_name, item.last_name);
                  return (
                    <GlobalUserDetail
                      slotCandidateStatus={
                        <Stack
                          height={'100%'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          direction={'row'}
                        >
                          <InterviewerAcceptDeclineIcon
                            type={
                              user.interview_session_relation.accepted_status
                            }
                          />
                        </Stack>
                      }
                      key={item.user_id}
                      textTimeZone={formatTimeWithTimeZone({
                        start_time: interview_meeting.start_time,
                        end_time: interview_meeting.end_time,
                        timeZone:
                          user.user_details.scheduling_settings?.timeZone
                            ?.tzCode,
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
                    />
                  );
                })}
              </Stack>
            )}
          </>
          <>
            {(interview_meeting?.status === 'waiting' ||
              interview_meeting?.status === 'confirmed') && (
              <Stack direction={'row'} spacing={'var(--space-4)'}>
                <ButtonSoft
                  size={1}
                  color={'accent'}
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
                  color={'neutral'}
                  textButton={'Cancel Schedule'}
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
