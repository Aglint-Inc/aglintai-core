import { APIEventAttendeeStatus, DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ButtonSoft } from '@/devlink3/ButtonSoft';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';
import { NewScheduleDetail } from '@/devlink3/NewScheduleDetail';
import { ScheduleTabOverview } from '@/devlink3/ScheduleTabOverview';
import { UserNameCard } from '@/devlink3/UserNameCard';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { onClickResendInvite } from '../../CandidateDetails/utils';
import IconScheduleType from '../../Candidates/ListCard/Icon';
import { getScheduleType } from '../../Candidates/utils';
import { SessionIcon } from '../../Common/ScheduleProgress/scheduleProgressPill';
import { formatTimeWithTimeZone } from '../../utils';
import { ScheduleMeeting } from '../types';
import AllRolesMeetings from './AllRolesMeetings';
import IconAccept from './IconAccept';
import IconDecline from './IconDecline';
import InterviewerListCard from './InterviewerListCard';

function Overview({
  schedule,
  setIsCancelOpen,
  refetch,
  setIsDeclineOpen,
}: {
  schedule: ScheduleMeeting;
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  setIsDeclineOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const [filterJson, setFilterJson] = useState<
    DatabaseTable['interview_filter_json'] | null
  >(null);
  const [requestAvailibility, setRequestAvailibility] = useState<
    DatabaseTable['candidate_request_availability'] | null
  >(null);

  // eslint-disable-next-line no-unused-vars
  const [allCalendarStatus, setAllCalendarStatus] = useState<
    {
      email: string;
      organizer: boolean;
      self: boolean;
      responseStatus: 'needsAction' | 'accepted' | 'declined' | 'tentative';
    }[]
  >([]);

  useEffect(() => {
    if (schedule?.interview_meeting) {
      fetchCalendarStatus();
      if (
        schedule?.interview_meeting.meeting_flow === 'self_scheduling' ||
        schedule?.interview_meeting.meeting_flow === 'debrief' ||
        schedule?.interview_meeting.meeting_flow === 'phone_agent' ||
        schedule?.interview_meeting.meeting_flow === 'mail_agent'
      ) {
        fetchFilterJson();
      } else if (
        schedule?.interview_meeting.meeting_flow === 'candidate_request'
      ) {
        fetchRequestAvailibilty();
      }
    }
  }, [schedule?.interview_meeting]);

  const fetchFilterJson = async () => {
    try {
      const { data } = await supabase
        .from('interview_filter_json')
        .select('*')
        .contains('session_ids', [schedule.interview_session.id]);

      setFilterJson(data[0]);
    } catch (e) {
      //
    }
  };

  const fetchRequestAvailibilty = async () => {
    try {
      const { data } = await supabase
        .from('candidate_request_availability')
        .select('*')
        .eq('application_id', schedule.schedule.application_id);

      const reqAvail = data.find((item) =>
        item.session_ids.some(
          (ses) => ses.id === schedule.interview_session.id,
        ),
      );

      setRequestAvailibility(reqAvail);
    } catch (e) {
      //
    }
  };

  const users = schedule?.users || [];

  const confirmedUsers = users?.filter(
    (item) => item.interview_session_relation.is_confirmed,
  );

  const fetchCalendarStatus = async () => {
    try {
      const eventId = schedule.interview_meeting?.cal_event_id;
      const user_id = confirmedUsers[0].id;

      const res = await axios.post('/api/scheduling/v1/event_attendee_status', {
        attendee_interv_id: user_id,
        event_id: eventId,
      } as APIEventAttendeeStatus);

      if (res?.data?.event_attendees_status)
        setAllCalendarStatus(res.data.event_attendees_status);
    } catch (e) {
      //
    }
  };

  if (!schedule) {
    return null;
  }

  return (
    <>
      <NewScheduleDetail
        slotInterviewerList={confirmedUsers?.map((item) => {
          return (
            <>
              <InterviewerListCard
                item={item}
                schedule={schedule}
                setIsDeclineOpen={setIsDeclineOpen}
                refetch={refetch}
              />
            </>
          );
        })}
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
                variant={'rounded-medium'}
              />
            }
          />
        }
        textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
        textTime={formatTimeWithTimeZone({
          start_time: schedule.interview_meeting.start_time,
          end_time: schedule.interview_meeting.end_time,
          timeZone: schedule.candidates.timezone,
        })}
        textDay={dayjs(schedule.interview_meeting.end_time).format('dd')}
        textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
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
              textButton={schedule.interview_module.name}
              isRightIcon={true}
              slotIcon={
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
        iconPanel={
          <SessionIcon session_type={schedule.interview_session.session_type} />
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
      />

      <ScheduleTabOverview
        isResendLinkVisible={
          checkPermissions(['scheduler_update']) &&
          (schedule.interview_meeting.status === 'waiting' ||
            schedule.interview_meeting.status === 'confirmed')
        }
        isCopyLinkVisible={
          checkPermissions(['scheduler_update']) &&
          (schedule.interview_meeting.status === 'confirmed' ||
            schedule.interview_meeting.status === 'waiting')
        }
        slotAttendeesIcon={
          schedule.users.length > 0
            ? schedule.users.map((item) => {
                return item.interview_session_relation.accepted_status ===
                  'accepted' ? (
                  <IconAccept />
                ) : item.interview_session_relation.accepted_status ===
                  'declined' ? (
                  <IconDecline />
                ) : (
                  ''
                );
              })
            : '--'
        }
        onClickResendLink={{
          onClick: () => {
            if (
              schedule.interview_meeting.status === 'waiting' ||
              schedule.interview_meeting.status === 'confirmed'
            ) {
              if (filterJson?.id) {
                onClickResendInvite({
                  session_name: schedule.interview_session.name,
                  application_id: schedule.schedule.application_id,
                  candidate_name: getFullName(
                    schedule.candidates.first_name,
                    schedule.candidates.last_name,
                  ),
                  rec_user_id: recruiterUser.user_id,
                  filter_id: filterJson.id,
                  request_id: null,
                });
              } else if (requestAvailibility?.id) {
                onClickResendInvite({
                  session_name: schedule.interview_session.name,
                  application_id: schedule.schedule.application_id,
                  candidate_name: getFullName(
                    schedule.candidates.first_name,
                    schedule.candidates.last_name,
                  ),
                  rec_user_id: recruiterUser.user_id,
                  request_id: requestAvailibility.id,
                  filter_id: null,
                });
              }
            } else {
              toast.warning(
                'Email will be sent only if meeting status is waiting or confirmed',
              );
            }
          },
        }}
        onClickCopyCandidate={{
          onClick: async () => {
            if (filterJson?.id) {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule.schedule.id}?filter_id=${filterJson?.id}`,
              );
            } else if (requestAvailibility?.id) {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/request-availability/${requestAvailibility?.id}`,
              );
            }
          },
        }}
        isScheduleCardVisible={true}
        isMeetingLinkVisible={
          schedule.interview_meeting.status == 'confirmed' &&
          Boolean(schedule.interview_meeting.meeting_link)
        }
        onClickInterviewModuleLink={{
          onClick: () => {
            checkPermissions(['scheduler_create']) &&
              window.open(
                `/scheduling/module/members/${schedule.interview_session.module_id}`,
                '_blank',
              );
          },
        }}
        textSchedule={
          schedule.interview_meeting.confirmed_date &&
          `on ${dayjs(schedule.interview_meeting.confirmed_date).format(
            'DD MMM YYYY',
          )}`
        }
        slotStatus={
          <>
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
          </>
        }
        textMeetingLink={schedule.interview_meeting.meeting_link}
        onClickCopyLink={{
          onClick: () => {
            navigator.clipboard.writeText(
              schedule.interview_meeting.meeting_link,
            );
          },
        }}
        slotOrganizer={
          <AvatarWithName
            key={schedule.organizer.id}
            textRole={schedule.organizer.position}
            isRoleVisible={true}
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
                variant={'rounded-medium'}
              />
            }
          />
        }
        isInterviewersVisible={users?.length > 0}
        slotJoinMeetingButton={
          schedule?.interview_meeting?.status === 'confirmed' &&
          schedule?.interview_meeting?.meeting_link && (
            <ButtonSurface
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
        textInterviewModuleLink={schedule.interview_session.name}
        isMembersVisible={confirmedUsers?.length > 0}
        slotMembers={confirmedUsers?.map((item) => {
          return (
            <>
              <InterviewerListCard
                item={item}
                schedule={schedule}
                setIsDeclineOpen={setIsDeclineOpen}
                refetch={refetch}
              />
            </>
          );
        })}
        slotHiringTeam={<AllRolesMeetings schedule={schedule} />}
        onClickCancelSchedule={{
          onClick: () => {
            setIsCancelOpen(true);
          },
        }}
        onClickReschedule={{
          onClick: () => {
            //
          },
        }}
        textTimeDuration={getBreakLabel(
          schedule.interview_session.session_duration,
        )}
        isDebriefIconVisible={
          schedule.interview_session.session_type === 'debrief'
        }
        isOneToOneIconVisible={
          schedule.interview_session.session_type === 'individual'
        }
        isPanelIconVisible={schedule.interview_session.session_type === 'panel'}
        textTitle={schedule.interview_session.name}
        textDate={
          schedule.interview_meeting.end_time &&
          dayjs(schedule.interview_meeting.end_time).format('ddd, MMM DD, YYYY')
        }
        textPlatformName={getScheduleType(
          schedule.interview_session.schedule_type,
        )}
        textDuration={
          schedule.interview_meeting.start_time &&
          formatTimeWithTimeZone({
            start_time: schedule.interview_meeting.start_time,
            end_time: schedule.interview_meeting.end_time,
            timeZone: userTzDayjs.tz.guess(),
          })
        }
        slotPlatformIcon={
          <IconScheduleType type={schedule.interview_session.schedule_type} />
        }
      />
    </>
  );
}

export default Overview;
