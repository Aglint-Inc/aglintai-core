import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { NewScheduleDetail } from '@devlink3/NewScheduleDetail';
import { SquareArrowOutUpRight, Users } from 'lucide-react';
import Link from 'next/link';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import dayjs from '@/utils/dayjs';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getFullName } from '@/utils/jsonResume';

import { getScheduleType } from '../../../../utils/scheduling/colors_and_enums';
import IconSessionType from '../../../Common/Icons/IconSessionType';
import { MeetingStatusBadge } from '../../_common/components/MeetingStatusBadge';
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
            <Card className='bg-neutral-100 text-neutral-700 p-4 flex items-center justify-center'>
              <Users className='w-8 h-8 mr-2' />
              <p>Interviewers will be decided once interview is confirmed</p>
            </Card>
          )
        }
        slotHiringTeamList={<AllRolesMeetings />}
        slotOrganizerList={
          schedule.organizer && (
            <div className='flex items-center space-x-4'>
              <Avatar className='h-10 w-10'>
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
              <div>
                <Link
                  href={`/user/profile/${schedule.organizer.user_id}`}
                  className='font-medium'
                >
                  {getFullName(
                    schedule.organizer.first_name,
                    schedule.organizer.last_name,
                  )}
                </Link>
                <p className='text-sm text-gray-500'>
                  {schedule.organizer.position}
                </p>
              </div>
            </div>
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
            <SquareArrowOutUpRight className='w-4 h-4 ml-2' />
          </Button>
        }
        slotCandidateList={
          <div className='flex flex-col space-y-2'>
            <div className='text-sm font-medium'>
              {getFullName(
                schedule.candidates.first_name,
                schedule.candidates.last_name,
              )}
            </div>
            <div className='text-xs text-gray-500'>
              {formatTimeWithTimeZone({
                start_time: schedule.interview_meeting.start_time,
                end_time: schedule.interview_meeting.end_time,
                timeZone: schedule.candidates.timezone,
              })}
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
              <SquareArrowOutUpRight className='w-4 h-4 ml-2' />
            </Button>
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
