import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { Clock, SquareArrowOutUpRight, User, Users } from 'lucide-react';
import Link from 'next/link';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getBreakLabel } from '@/utils/getBreakLabel';

import IconSessionType from '../../../../../../../components/Common/Icons/IconSessionType';
import {
  formatTimeWithTimeZone,
  getShortTimeZone,
} from '../../../../../../../components/Scheduling/utils';
import { MeetingStatusBadge } from '../../../../../../_common/components/MeetingStatusBadge';
import { getScheduleType } from '../../../../../../_common/utils/sessionScheduleType';
import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import { NewScheduleDetail } from '../ui/NewScheduleDetails';
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
          confirmedUsers?.map((item, i) => {
            return (
              <InterviewerListCard
                key={i}
                item={item}
                schedule={schedule}
                cancelReasons={cancelReasons}
              />
            );
          })
        ) : (
          <Card className='flex items-center justify-center bg-neutral-100 p-4 text-neutral-700'>
            <Users className='mr-2 h-8 w-8' />
            <p>Interviewers will be decided once interview is confirmed</p>
          </Card>
        )
      }
      slotHiringTeamList={<AllRolesMeetings />}
      slotOrganizerList={
        schedule.organizer && (
          <div className='mb-2 flex items-center space-x-3'>
            <Avatar className='h-8 w-8'>
              <AvatarImage
                src={schedule.organizer.profile_image}
                alt={getFullName(
                  schedule.organizer.first_name,
                  schedule.organizer.last_name,
                )}
              />
              <AvatarFallback>
                {getFullName(
                  schedule.organizer.first_name,
                  schedule.organizer.last_name,
                ).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <Link
                href={`/user/${schedule.organizer.user_id}`}
                className='text-sm font-medium hover:underline'
              >
                {getFullName(
                  schedule.organizer.first_name,
                  schedule.organizer.last_name,
                )}
              </Link>
              <p className='text-xs text-gray-500'>
                {schedule.organizer.position}
              </p>
            </div>
          </div>
        )
      }
      textDate={
        schedule.interview_meeting.end_time
          ? dayjsLocal(schedule.interview_meeting.end_time).format('DD')
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
          ? dayjsLocal(schedule.interview_meeting.end_time).format('dddd')
          : '--'
      }
      textMonth={
        schedule.interview_meeting.end_time
          ? dayjsLocal(schedule.interview_meeting.end_time).format('MMMM')
          : '--'
      }
      textPanelName={schedule.interview_session.name}
      slotStatusBadge={
        <MeetingStatusBadge status={schedule.interview_meeting.status} />
      }
      slotInterviewTypeButton={
        <Button
          variant='outline'
          size='sm'
          onClick={() => {
            checkPermissions(['interview_types']) &&
              window.open(
                `/interview-pool/${schedule.interview_session.module_id}`,
                '_blank',
              );
          }}
        >
          {schedule?.interview_module?.name}
          <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
        </Button>
      }
      slotCandidateList={
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='flex-shrink-0'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-medium text-gray-500'>
                <User className='h-6 w-6' />
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='text-base font-semibold'>
                {getFullName(
                  schedule.candidates.first_name,
                  schedule.candidates.last_name,
                )}
              </p>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <div className='flex items-center text-sm text-gray-600'>
              <Clock className='mr-1 h-4 w-4' />
              <span>
                {formatTimeWithTimeZone({
                  start_time: schedule.interview_meeting.start_time,
                  end_time: schedule.interview_meeting.end_time,
                  timeZone: schedule.candidates.timezone,
                })}
              </span>
            </div>
            <p className='text-xs text-gray-500'>
              {getShortTimeZone(schedule.candidates.timezone)}
            </p>
          </div>
        </div>
      }
      textMeetingLink={schedule.interview_meeting.meeting_link || '--'}
      slotJoinMeeting={
        schedule?.interview_meeting?.status === 'confirmed' &&
        schedule?.interview_meeting?.meeting_link && (
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              window.open(schedule.interview_meeting.meeting_link, '_blank');
            }}
          >
            Join Meeting
            <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
          </Button>
        )
      }
      textDuration={getBreakLabel(schedule.interview_session.session_duration)}
      slotMeetingIcon={
        <IconScheduleType type={schedule.interview_session.schedule_type} />
      }
      textMeetingPlatform={getScheduleType(
        schedule.interview_session.schedule_type,
      )}
      slotPanelIcon={
        <IconSessionType
          type={schedule.interview_session.session_type}
          size={16}
        />
      }
    />
  );
}

export default Overview;
