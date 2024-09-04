import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { NewScheduleDetail } from '@/devlink3/NewScheduleDetail';
import { UserNameCard } from '@/devlink3/UserNameCard';
import IconScheduleType from '@/src/components/Common/Icons/IconScheduleType';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/src/utils/jsonResume';

import { getScheduleType } from '../../../../utils/scheduling/colors_and_enums';
import IconSessionType from '../../../Common/Icons/IconSessionType';
import { formatTimeWithTimeZone } from '../../utils';
import { useScheduleDetails } from '../hooks';
import AllRolesMeetings from './AllRolesMeetings';
import InterviewerListCard from './InterviewerListCard';

function Overview() {
  const { checkPermissions } = useRolesAndPermissions();
  const { data } = useScheduleDetails();
  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data;

  const users = schedule?.users || [];

  const confirmedUsers = users?.filter(
    (item) => item.interview_session_relation.is_confirmed,
  );

  if (!schedule) {
    return null;
  }

  return (
    <>
      <NewScheduleDetail
        isDateCardVisible={
          schedule.interview_meeting.status === 'confirmed' ||
          schedule.interview_meeting.status === 'completed'
        }
        isMeetingLinkVisible={schedule.interview_meeting.status === 'confirmed'}
        isTimingVisible={
          schedule.interview_meeting.status === 'confirmed' ||
          schedule.interview_meeting.status === 'completed'
        }
        textInterviewer={`Interviewer${confirmedUsers?.length > 1 ? 's' : ''}`}
        textInterviewerCount={
          confirmedUsers?.length > 0 && `(${confirmedUsers?.length})`
        }
        slotInterviewerList={
          confirmedUsers?.length > 0 ? (
            confirmedUsers?.map((item) => {
              return (
                <>
                  <InterviewerListCard
                    item={item}
                    schedule={schedule}
                    cancelReasons={cancelReasons}
                  />
                </>
              );
            })
          ) : (
            <GlobalEmptyState
              iconName='groups'
              textDesc={
                'Interviewers will be decided once interview is confirmed'
              }
              size={8}
              styleEmpty={{
                style: {
                  backgroundColor: 'var(--neutral-2)',
                  color: 'var(--neutral-11)',
                },
              }}
            />
          )
        }
        slotHiringTeamList={<AllRolesMeetings />}
        slotOrganizerList={
          schedule.organizer && (
            <UserNameCard
              textRole={schedule.organizer.position}
              textName={
                <Link href={`/user/profile/${schedule.organizer.user_id}`}>
                  {getFullName(
                    schedule.organizer.first_name,
                    schedule.organizer.last_name,
                  )}
                </Link>
              }
              slotAvatar={
                <MuiAvatar
                  level={getFullName(
                    schedule.organizer.first_name,
                    schedule.organizer.last_name,
                  )}
                  src={schedule.organizer.profile_image}
                  variant={'rounded'}
                  width='100%'
                  height='100%'
                />
              }
            />
          )
        }
        textDate={
          schedule.interview_meeting.end_time
            ? dayjs(schedule.interview_meeting.end_time).format('DD')
            : '--'
        }
        textTime={
          schedule.interview_meeting.start_time
            ? formatTimeWithTimeZone({
                start_time: schedule.interview_meeting.start_time,
                end_time: schedule.interview_meeting.end_time,
                timeZone: schedule.candidates.timezone,
              })
            : '--'
        }
        textDay={
          schedule.interview_meeting.end_time
            ? dayjs(schedule.interview_meeting.end_time).format('dddd')
            : '--'
        }
        textMonth={
          schedule.interview_meeting.end_time
            ? dayjs(schedule.interview_meeting.end_time).format('MMMM')
            : '--'
        }
        textPanelName={schedule.interview_session.name}
        slotStatusBadge={
          <StatusBadge
            isCancelledVisible={
              schedule.interview_meeting.status === 'cancelled'
            }
            isCompletedVisible={
              schedule.interview_meeting.status === 'completed'
            }
            isConfirmedVisible={
              schedule.interview_meeting.status === 'confirmed'
            }
            isInProgressVisible={false}
            isWaitingVisible={schedule.interview_meeting.status === 'waiting'}
          />
        }
        slotInterviewTypeButton={
          <Stack direction={'row'}>
            <ButtonSoft
              size={1}
              color={'accent'}
              textButton={schedule?.interview_module?.name}
              isRightIcon={true}
              iconName='north_east'
              iconSize={3}
              onClickButton={{
                onClick: () => {
                  checkPermissions(['interview_types']) &&
                    window.open(
                      `/scheduling/interview-types/${schedule.interview_session.module_id}?tab=qualified`,
                      '_blank',
                    );
                },
              }}
            />
          </Stack>
        }
        slotCandidateList={
          <GlobalUserDetail
            isRoleVisible={false}
            textName={getFullName(
              schedule.candidates.first_name,
              schedule.candidates.last_name,
            )}
            textTimeZone={formatTimeWithTimeZone({
              start_time: schedule.interview_meeting.start_time,
              end_time: schedule.interview_meeting.end_time,
              timeZone: schedule.candidates.timezone,
            })}
          />
        }
        textMeetingLink={schedule.interview_meeting.meeting_link || '--'}
        slotJoinMeeting={
          schedule?.interview_meeting?.status === 'confirmed' &&
          schedule?.interview_meeting?.meeting_link && (
            <ButtonSoft
              color={'accent'}
              size={1}
              textButton={'Join Meeting'}
              isLeftIcon={false}
              isRightIcon={true}
              iconName='north_east'
              iconSize={3}
              onClickButton={{
                onClick: () => {
                  window.open(
                    schedule.interview_meeting.meeting_link,
                    '_blank',
                  );
                },
              }}
            />
          )
        }
        textDuration={getBreakLabel(
          schedule.interview_session.session_duration,
        )}
        slotMeetingIcon={
          <IconScheduleType type={schedule.interview_session.schedule_type} />
        }
        textMeetingPlatform={getScheduleType(
          schedule.interview_session.schedule_type,
        )}
        slotPanelIcon={
          <IconSessionType
            type={schedule.interview_session.session_type}
            size={4}
          />
        }
      />
    </>
  );
}

export default Overview;
