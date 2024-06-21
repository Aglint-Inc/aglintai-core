import {
  APIEventAttendeeStatus,
  InterviewFilterJsonType,
  InterviewSessionRelationTypeDB,
} from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import { ScheduleTabOverview } from '@/devlink3/ScheduleTabOverview';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { onClickResendInvite } from '../../CandidateDetails/utils';
import IconScheduleType from '../../Candidates/ListCard/Icon';
import { getScheduleType } from '../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../utils';
import CancelScheduleDialog from '../CancelScheduleDialog';
import DeclineScheduleDialog from '../DeclineScheduleDialog';
import { useScheduleDetails } from '../hooks';
import IconCancelSchedule from '../Icons/IconCancelSchedule';
import IconReschedule from '../Icons/IconReschedule';
import RequestRescheduleDialog from '../RequestRescheduleDialog';
import { ScheduleMeeting } from '../types';
import AllRolesMeetings from './AllRolesMeetings';
import IconAccept from './IconAccept';
import IconDecline from './IconDecline';
import InterviewerListCard from './InterviewerListCard';

function Overview({
  cancelReasons,
  schedule,
  isCancelOpen,
  setIsCancelOpen,
  refetch,
}: {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  isCancelOpen: boolean;
  setIsCancelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}) {
  const router = useRouter();
  const { recruiterUser, isAllowed } = useAuthDetails();
  const [filterJson, setFilterJson] = useState<InterviewFilterJsonType>();
  const [isRequestRescheduleOpen, setIsRequestRescheduleOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);

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
      fetchFilterJson();
    }
  }, [schedule?.interview_meeting]);

  const fetchFilterJson = async () => {
    const { data } = await supabase
      .from('interview_filter_json')
      .select('*')
      .contains('session_ids', [schedule.interview_session.id]);

    setFilterJson(data[0]);
  };

  const fetchCalendarStatus = async () => {
    try {
      const eventId = (schedule.interview_meeting?.meeting_json as any)?.id;
      const user_id = schedule.users[0].id;

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

  const { users } = schedule;

  const isRescheduleCardVisible =
    recruiterUser.role === 'admin' ||
    recruiterUser.role === 'recruiter' ||
    recruiterUser.role === 'hiring_manager' ||
    recruiterUser.role === 'recruiting_coordinator' ||
    recruiterUser.user_id === schedule.interview_coordinator?.id;

  const confirmedUsers = users?.filter(
    (item) => item.interview_session_relation.is_confirmed,
  );

  const isRescheduleButtonVisible =
    (schedule?.users?.find(
      (user) =>
        user.interview_session_relation.is_confirmed &&
        user.email === recruiterUser.email &&
        user.interview_session_relation.training_type === 'qualified',
    ) &&
      !cancelReasons?.some(
        (item) =>
          item.recruiter_user.id === recruiterUser.user_id &&
          !item.interview_session_cancel.is_resolved,
      )) ||
    schedule?.interview_meeting?.status === 'confirmed';

  const isCancelButtonVisible =
    (recruiterUser.role === 'admin' ||
      recruiterUser.role === 'recruiter' ||
      recruiterUser.role === 'hiring_manager' ||
      recruiterUser.role === 'recruiting_coordinator' ||
      recruiterUser.user_id === schedule?.interview_coordinator?.id) &&
    schedule?.interview_meeting?.status === 'confirmed';

  const [sessionRelation, setSessionRelation] =
    useState<InterviewSessionRelationTypeDB>();

  useEffect(() => {
    if (schedule?.users) {
      setSessionRelation(
        schedule?.users?.find((user) => user.email === recruiterUser.email)
          ?.interview_session_relation,
      );
    }
  }, [schedule?.users]);

  if (!schedule) {
    return null;
  }

  return (
    <>
      {schedule && (
        <>
          <DeclineScheduleDialog
            sessionRelation={sessionRelation}
            isDeclineOpen={isDeclineOpen}
            setIsDeclineOpen={setIsDeclineOpen}
            schedule={schedule}
            refetch={refetch}
          />
          <CancelScheduleDialog
            sessionRelation={sessionRelation}
            isDeclineOpen={isCancelOpen}
            setIsDeclineOpen={setIsCancelOpen}
            schedule={schedule}
            refetch={refetch}
          />
          <RequestRescheduleDialog
            isRequestRescheduleOpen={isRequestRescheduleOpen}
            setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
            sessionRelation={sessionRelation}
            schedule={schedule}
            refetch={refetch}
          />
        </>
      )}

      <ScheduleTabOverview
        isResendLinkVisible={
          isAllowed([
            'admin',
            'recruiter',
            'hiring_manager',
            'recruiting_coordinator',
          ]) &&
          (schedule.interview_meeting.status === 'waiting' ||
            schedule.interview_meeting.status === 'confirmed')
        }
        isCopyLinkVisible={
          isAllowed([
            'admin',
            'recruiter',
            'hiring_manager',
            'recruiting_coordinator',
          ]) &&
          (schedule.interview_meeting.status === 'confirmed' ||
            schedule.interview_meeting.status === 'waiting')
        }
        slotAttendeesIcon={schedule.users.map((item) => {
          return item.interview_session_relation.accepted_status ===
            'accepted' ? (
            <IconAccept />
          ) : item.interview_session_relation.accepted_status === 'declined' ? (
            <IconDecline />
          ) : (
            ''
          );
        })}
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
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule.schedule.id}?filter_id=${filterJson?.id}`,
            );
          },
        }}
        slotButton={
          <>
            {isRescheduleButtonVisible && (
              <ScheduleButton
                textLabel={'Reschedule'}
                slotIcon={<IconReschedule />}
                onClickProps={{
                  onClick: () => {
                    setIsRequestRescheduleOpen(true);
                  },
                }}
              />
            )}
            {isCancelButtonVisible && (
              <ScheduleButton
                textLabel={'Cancel Schedule'}
                slotIcon={<IconCancelSchedule />}
                textColorProps={{
                  style: {
                    color: '#D93F4C',
                  },
                }}
                onClickProps={{
                  style: { background: '#FFF0F1' },
                  onClick: () => {
                    setIsCancelOpen(true);
                  },
                }}
              />
            )}
          </>
        }
        isScheduleCardVisible={
          isRescheduleCardVisible && cancelReasons?.length > 0
        }
        isMeetingLinkVisible={
          schedule.interview_meeting.status == 'confirmed' &&
          Boolean(schedule.interview_meeting.meeting_link)
        }
        onClickInterviewModuleLink={{
          onClick: () => {
            isAllowed([
              'admin',
              'recruiter',
              'hiring_manager',
              'recruiting_coordinator',
            ]) &&
              router.push(
                `/scheduling/module/members/${schedule.interview_session.module_id}`,
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
