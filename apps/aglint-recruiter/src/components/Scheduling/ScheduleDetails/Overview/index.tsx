import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { NewScheduleDetail } from '@/devlink3/NewScheduleDetail';
import { UserNameCard } from '@/devlink3/UserNameCard';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';

import IconSessionType from '../../CandidateDetails/RightPanel/IconSessionType';
import IconScheduleType from '../../Candidates/ListCard/Icon/IconScheduleType';
import { getScheduleType } from '../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../utils';
import { ScheduleMeeting } from '../types';
import AllRolesMeetings from './AllRolesMeetings';
import InterviewerListCard from './InterviewerListCard';

function Overview({ schedule }: { schedule: ScheduleMeeting }) {
  const { checkPermissions } = useRolesAndPermissions();

  // eslint-disable-next-line no-unused-vars
  const [allCalendarStatus, setAllCalendarStatus] = useState<
    {
      email: string;
      organizer: boolean;
      self: boolean;
      responseStatus: 'needsAction' | 'accepted' | 'declined' | 'tentative';
    }[]
  >([]);

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
        textInterviewerCount={
          confirmedUsers?.length > 0 && `(${confirmedUsers?.length})`
        }
        slotInterviewerList={
          confirmedUsers?.length > 0 ? (
            confirmedUsers?.map((item) => {
              return (
                <>
                  <InterviewerListCard disableHoverListener={true} item={item} schedule={schedule} />
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
        slotHiringTeamList={<AllRolesMeetings schedule={schedule} />}
        slotOrganizerList={
          <UserNameCard
            textRole={schedule.organizer.position}
            textName={getFullName(
              schedule.organizer.first_name,
              schedule.organizer.last_name,
            )}
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
              textButton={schedule.interview_module.name}
              isRightIcon={true}
              slotIcon={
                <Stack>
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9.375 2.25C9.60938 2.26563 9.73438 2.39062 9.75 2.625V7.875C9.73438 8.10938 9.60938 8.23438 9.375 8.25C9.14062 8.23438 9.01562 8.10938 9 7.875V3.53906L2.88281 9.63281C2.71094 9.78906 2.53906 9.78906 2.36719 9.63281C2.21094 9.46094 2.21094 9.28906 2.36719 9.11719L8.46094 3H4.125C3.89062 2.98437 3.76562 2.85938 3.75 2.625C3.76562 2.39062 3.89062 2.26563 4.125 2.25H9.375Z'
                      fill='#CC4E00'
                    />
                  </svg>
                </Stack>
              }
              onClickButton={{
                onClick: () => {
                  checkPermissions(['scheduler_create']) &&
                    window.open(
                      `/scheduling/module/members/${schedule.interview_session.module_id}`,
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
              timeZone: userTzDayjs.tz.guess(),
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
              isRightIcon={false}
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
