import { getFullName } from '@aglint/shared-utils';
import { type getAllInterviews } from '@interviews/hooks/useAllInterviews';
import dayjs from 'dayjs';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MeetingStatusBadge } from 'src/app/_common/components/MeetingStatusBadge';
import { MembersList } from 'src/app/_common/components/MembersList';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { getBreakLabel } from '@/utils/getBreakLabel';

import {
  getScheduleBgcolor,
  getScheduleTextcolor,
  getScheduleType,
} from '../../../../../utils/scheduling/colors_and_enums';
import { convertTimeZoneToAbbreviation } from '../../../utils';
import InterviewerUserDetail from '../../InterviewerUserDetail';
import { MyScheduleSubCard } from './MyScheduleSubCard';

function ScheduleMeetingCard({
  meetingDetails,
}: {
  meetingDetails: Awaited<ReturnType<typeof getAllInterviews>>[number];
}) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const router = useRouter();
  const interviewers = meetingDetails.meeting_interviewers as any; // TODO: fix

  return (
    <>
      <div
        className='cursor-pointer'
        onClick={() => {
          router.push(
            `/interviews/view?meeting_id=${meetingDetails.id}&tab=job_details`,
          );
        }}
      >
        <MyScheduleSubCard
          onClickDropdownIocn={(e) => {
            setCollapseOpen((pre) => !pre);
            e.stopPropagation();
          }}
          isDropdownIconVisible={interviewers.length > 0}
          isMembersListVisible={interviewers.length > 0 && collapseOpen}
          slotMembersList={
            <>
              <div className={`${collapseOpen ? 'block' : 'hidden'}`}>
                <div className='flex flex-col space-y-2'>
                  <MembersList
                    slotImage={<User size={40} />}
                    textName={getFullName(
                      meetingDetails.applications.candidates.first_name,
                      meetingDetails.applications.candidates.last_name,
                    )}
                    isDesignationVisible={true}
                    textDesignation={'Candidate'}
                    textTime={null}
                  />
                  {interviewers.map((user) => {
                    return (
                      <>
                        <InterviewerUserDetail
                          key={user.email}
                          interview_meeting={{
                            end_time: meetingDetails.end_time,
                            start_time: meetingDetails.start_time,
                            status: meetingDetails.status,
                          }}
                          accepted_status={user.accepted_status}
                          cancelReason={user.cancel_reasons?.find(
                            (can) =>
                              can.session_relation_id ===
                              user.session_relation_id,
                          )}
                          userDetails={{
                            first_name: user.first_name,
                            last_name: user.last_name,
                            user_id: user.user_id,
                            position: user.position,
                            profile_image: user.profile_image,
                          }}
                          interviewerTimeZone={user.tz_code}
                          isCalendarConnected={true}
                          isPaused={false}
                          pause_json={null}
                          trainingType={user.training_type}
                          interviewerType={user.interviewer_type}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          }
          textTime={`${dayjs(meetingDetails?.start_time).format('hh:mm A')} - ${dayjs(meetingDetails?.end_time).format('hh:mm A')}  ${convertTimeZoneToAbbreviation(dayjs.tz.guess())}`}
          textMeetingPlatform={getScheduleType(meetingDetails?.schedule_type)}
          textMeetingTitle={meetingDetails?.session_name}
          slotMeetingIcon={
            <IconScheduleType type={meetingDetails?.schedule_type} />
          }
          isMeetingPlatformVisible={
            meetingDetails?.schedule_type === 'google_meet' ||
            meetingDetails?.schedule_type === 'zoom'
          }
          isDurationVisible={true}
          isPhoneCallVisible={false}
          isTimeVisible={Boolean(meetingDetails?.start_time)}
          slotStatus={<MeetingStatusBadge status={meetingDetails.status} />}
          isLocationVisible={false}
          textDuration={getBreakLabel(meetingDetails.session_duration)}
          slotAvatarWithName={
            <div className='flex items-center space-x-2'>
              <User className='h-4 w-4' />
              <span className='text-sm font-medium'>
                {getFullName(
                  meetingDetails.applications.candidates.first_name,
                  meetingDetails.applications.candidates.last_name,
                )}
              </span>
            </div>
          }
          isAvatarWithNameVisible={!collapseOpen}
          textJob={
            <div className='flex flex-row items-center space-y-5'>
              <span>{meetingDetails?.public_jobs.job_title}</span>
            </div>
          }
          bgColorProps={{
            background: getScheduleBgcolor(meetingDetails.status),
            color: getScheduleTextcolor(meetingDetails.status),
          }}
        />
      </div>
    </>
  );
}

export default ScheduleMeetingCard;
