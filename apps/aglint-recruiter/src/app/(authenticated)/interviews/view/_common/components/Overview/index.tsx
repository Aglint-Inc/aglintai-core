import { dayjsLocal, getFullName } from '@aglint/shared-utils';
import { getBreakLabel } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { UIAlert } from '@components/ui-alert';
import { Globe, SquareArrowOutUpRight, User } from 'lucide-react';
import Link from 'next/link';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { UIButton } from '@/components/Common/UIButton';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';

import IconSessionType from '../../../../../../../components/Common/Icons/IconSessionType';
import { formatTimeWithTimeZone } from '../../../../../../../components/Scheduling/utils';
import { getScheduleType } from '../../../../../../../utils/scheduling/colors_and_enums';
import { MeetingStatusBadge } from '../../../../../../_common/components/MeetingStatusBadge';
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
        confirmedUsers?.length > 0 ? `(${confirmedUsers?.length})` : '(0)'
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
          <UIAlert variant='alert'>
            <p>Interviewers will be decided once the interview is confirmed.</p>
          </UIAlert>
        )
      }
      slotHiringTeamList={<AllRolesMeetings />}
      slotOrganizerList={
        schedule.organizer && (
          <div className='mb-2 flex items-center gap-2'>
            <Avatar className='h-12 w-12 rounded-md'>
              <AvatarImage
                src={schedule.organizer.profile_image ?? 'avatar.png'}
                alt={getFullName(
                  schedule.organizer.first_name ?? '',
                  schedule?.organizer.last_name ?? '',
                )}
              />
              <AvatarFallback className='h-12 w-12 rounded-md'>
                {getFullName(
                  schedule?.organizer?.first_name ?? '',
                  schedule?.organizer?.last_name ?? '',
                ).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <Link
                href={`/user/${schedule.organizer.user_id}`}
                className='text-md hover:underline'
              >
                {getFullName(
                  schedule?.organizer?.first_name ?? '',
                  schedule?.organizer?.last_name ?? '',
                )}
              </Link>
              <p className='text-sm text-muted-foreground'>
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
              timeZone: schedule?.candidates?.timezone || '',
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
      textPanelName={schedule?.interview_session.name ?? ''}
      slotStatusBadge={
        <MeetingStatusBadge status={schedule.interview_meeting.status} />
      }
      slotInterviewTypeButton={
        <UIButton
          variant='outline'
          size='sm'
          onClick={() => {
            if (checkPermissions) {
              checkPermissions(['interview_types']) &&
                window.open(
                  `/interview-pool/${schedule.interview_session.module_id}`,
                  '_blank',
                );
            }
          }}
        >
          {schedule?.interview_module?.name}
          <SquareArrowOutUpRight className='ml-2 h-4 w-4' />
        </UIButton>
      }
      slotCandidateList={
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-md bg-gray-200 text-lg font-medium text-muted-foreground'>
              <User className='h-6 w-6' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-md'>
                {getFullName(
                  schedule?.candidates?.first_name ?? '',
                  schedule?.candidates?.last_name ?? '',
                )}
              </p>
              <div className='flex items-center gap-1 text-sm text-gray-500'>
                <Globe className='h-3 w-3' />
                <span>
                  {formatTimeWithTimeZone({
                    start_time: schedule.interview_meeting.start_time ?? '',
                    end_time: schedule.interview_meeting.end_time ?? '',
                    timeZone: schedule?.candidates?.timezone ?? '',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      }
      textMeetingLink={schedule.interview_meeting.meeting_link || '--'}
      slotJoinMeeting={
        schedule?.interview_meeting?.status === 'confirmed' &&
        schedule?.interview_meeting?.meeting_link && (
          <div
            className='cursor-pointer hover:underline'
            onClick={() => {
              window.open(
                schedule?.interview_meeting?.meeting_link ?? '',
                '_blank',
              );
            }}
          >
            <div>{schedule.interview_meeting.meeting_link || '--'}</div>
          </div>
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
