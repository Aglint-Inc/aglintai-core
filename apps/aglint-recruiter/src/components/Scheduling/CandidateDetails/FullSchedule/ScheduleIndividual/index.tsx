import { DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Checkbox, Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { Text } from '@/devlink/Text';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalBadge } from '@/devlink3/GlobalBadge';
import { GlobalScheduleCard } from '@/devlink3/GlobalScheduleCard';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { TextWithIcon } from '@/devlink3/TextWithIcon';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../../utils';
import IconSessionType from '../../RightPanel/IconSessionType';
import {
  SchedulingApplication,
  setEditSession,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setIsEditOpen,
  setSelectedSession,
  useSchedulingApplicationStore,
} from '../../store';

interface ScheduleIndividualCardType {
  isCheckboxVisible?: boolean;
  interview_session: Pick<
    DatabaseTable['interview_session'],
    | 'id'
    | 'name'
    | 'break_duration'
    | 'session_duration'
    | 'schedule_type'
    | 'session_type'
  >;
  interview_meeting: Pick<
    DatabaseTable['interview_meeting'],
    'id' | 'start_time' | 'end_time' | 'status' | 'meeting_flow'
  > | null;
  onClickCheckBox: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
  }: {
    session_id: string;
  }) => void;
  selectedSessionIds: string[];
  candidate: {
    timezone: string;
    fullname: string;
    currentJobTitle: string;
  };
  jobTitle: string;
  users?: SchedulingApplication['initialSessions'][0]['users'];
  isCollapseNeeded?: boolean;
  isActionButtonVisible?: boolean;
  cancelReasons?: DatabaseTable['interview_session_cancel'][];
}

function ScheduleIndividualCard({
  isCheckboxVisible = false,
  interview_session,
  onClickCheckBox,
  selectedSessionIds,
  candidate,
  jobTitle,
  users = [],
  interview_meeting,
  isCollapseNeeded = false,
  isActionButtonVisible = false,
  cancelReasons = [],
}: ScheduleIndividualCardType) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { initialSessions } = useSchedulingApplicationStore((state) => ({
    initialSessions: state.initialSessions,
  }));
  const currentSession = initialSessions.find(
    (session) => session.interview_session.id === interview_session.id,
  );
  const confirmedUsers = users.filter(
    (user) => user.interview_session_relation.is_confirmed,
  );

  const cancelRequests = cancelReasons.filter(
    (reason) => reason.type === 'declined',
  );

  const rescheduleRequests = cancelReasons.filter(
    (reason) => reason.type === 'reschedule',
  );

  return (
    <GlobalScheduleCard
      isCheckboxVisible={
        (!interview_meeting ||
          interview_meeting.status === 'not_scheduled' ||
          interview_meeting.status === 'cancelled' ||
          interview_meeting.status === 'reschedule') &&
        isCheckboxVisible
      }
      slotCheckbox={
        <Checkbox
          size='small'
          checked={selectedSessionIds.includes(interview_session.id)}
          onClick={(e) => {
            e.stopPropagation();
            onClickCheckBox({ session_id: interview_session.id });
          }}
        />
      }
      isSelectedVisible={selectedSessionIds.includes(interview_session.id)}
      isDropdownIconVisible={
        isCollapseNeeded &&
        (interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'completed' ||
          interview_meeting?.status === 'waiting')
      }
      isDateVisible={
        interview_meeting?.status === 'confirmed' ||
        interview_meeting?.status === 'completed'
      }
      isTimeVisible={
        interview_meeting?.status === 'confirmed' ||
        interview_meeting?.status === 'completed'
      }
      iconPanel={<IconSessionType type={interview_session.session_type} />}
      iconMeetingPlatform={
        <IconScheduleType type={interview_session.schedule_type} />
      }
      slotGlobalBadge={
        interview_meeting?.status ? (
          <StatusBadge
            isCancelledVisible={interview_meeting.status === 'cancelled'}
            isConfirmedVisible={interview_meeting.status === 'confirmed'}
            isWaitingVisible={interview_meeting.status === 'waiting'}
            isCompletedVisible={interview_meeting.status === 'completed'}
            isNotScheduledVisible={
              interview_meeting.status === 'not_scheduled' || false
            }
          />
        ) : (
          <StatusBadge
            isNotScheduledVisible={true}
            isCancelledVisible={false}
            isConfirmedVisible={false}
            isWaitingVisible={false}
            isCompletedVisible={false}
          />
        )
      }
      textDate={
        interview_meeting?.end_time
          ? dayjs(interview_meeting.end_time).format('ddd, MMM DD, YYYY')
          : '--'
      }
      textTime={
        interview_meeting?.start_time
          ? formatTimeWithTimeZone({
              start_time: interview_meeting.start_time,
              end_time: interview_meeting.end_time,
              timeZone: candidate.timezone,
            })
          : '--'
      }
      textCandidateName={candidate.fullname}
      textDuration={getBreakLabel(interview_session.session_duration)}
      textPlaformName={getScheduleType(interview_session.schedule_type)}
      textRole={jobTitle}
      textPanelName={interview_session.name}
      onClickDropdown={{
        onClick: (e) => {
          e.stopPropagation();
          setCollapsed(!collapsed);
        },
      }}
      slotDropdownContent={
        isCollapseNeeded && (
          <Collapse in={collapsed}>
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
                      const fullName = getFullName(
                        item.first_name,
                        item.last_name,
                      );
                      return (
                        <GlobalUserDetail
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
          </Collapse>
        )
      }
      slotButtonViewDetail={
        isActionButtonVisible && (
          <Stack direction={'row'} spacing={'var(--space-2)'}>
            {(interview_meeting?.status === 'completed' ||
              interview_meeting?.status === 'confirmed' ||
              interview_meeting?.status === 'waiting') && (
              <>
                <ButtonSolid
                  size={1}
                  color={'neutral'}
                  textButton={'View Detail'}
                  onClickButton={{
                    onClick: (e) => {
                      e.stopPropagation();
                      router.push(
                        `/scheduling/view?meeting_id=${interview_meeting.id}&tab=candidate_details`,
                      );
                    },
                  }}
                  iconName={'north_east'}
                  isRightIcon={true}
                />
              </>
            )}

            {(interview_meeting?.status === 'not_scheduled' ||
              interview_meeting?.status === 'cancelled' ||
              !interview_meeting) && (
              <Stack
                onClick={() => {
                  setEditSession(currentSession);
                  setIsEditOpen(true);
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <GlobalIcon iconName={'edit'} size={4} color={'neutral-10'} />
              </Stack>
            )}
          </Stack>
        )
      }
      styleGrid={{
        style: {
          gridTemplateColumns: isActionButtonVisible
            ? '1.1fr 1.7fr 0.6fr'
            : '1fr 1.7fr 0fr',
        },
      }}
      slotRequestStatus={
        <>
          {interview_meeting?.status === 'waiting' && (
            <>
              {interview_meeting?.meeting_flow === 'candidate_request' ? (
                <TextWithIcon
                  iconName={'attach_email'}
                  textContent={'Requested availability from candidate'}
                  color={'warning'}
                  fontSize={1}
                />
              ) : interview_meeting?.meeting_flow === 'self_scheduling' ? (
                <TextWithIcon
                  iconName={'attach_email'}
                  textContent={'Sent self scheduling link to candidate'}
                  color={'warning'}
                  fontSize={1}
                />
              ) : (
                ''
              )}
            </>
          )}
        </>
      }
      slotRequestDetail={
        <>
          {cancelRequests.length > 0 && (
            <GlobalBadge
              color={'error'}
              iconName='event_busy'
              textBadge={`${cancelRequests.length} Cancel Request`}
              showIcon={true}
              iconSize={2}
            />
          )}

          {rescheduleRequests.length > 0 && (
            <GlobalBadge
              color={'event_repeat'}
              iconName='refresh'
              textBadge={`${rescheduleRequests.length} Reschedule Request`}
              showIcon={true}
              iconSize={2}
            />
          )}
        </>
      }
    />
  );
}

export default ScheduleIndividualCard;
