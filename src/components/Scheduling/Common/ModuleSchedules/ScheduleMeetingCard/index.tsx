import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { StatusBadge } from '@/devlink2';
import { MyScheduleSubCard } from '@/devlink3';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';

import IconScheduleType from '../../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../../AllSchedules/utils';
import { convertTimeZoneToAbbreviation } from '../../../utils';
import { ScheduleListType } from '..';
import InterviewerDetailsCard from './interviewerDetailsCard';

function ScheduleMeetingCard({
  meetingDetails,
}: {
  meetingDetails: ScheduleListType[number];
}) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          router.push(
            `/scheduling/view?meeting_id=${meetingDetails.interview_meeting.meeting_id}&tab=candidate_details`,
          );
        }}
      >
        <MyScheduleSubCard
          onClickDropdownIocn={{
            onClick: (e) => {
              setCollapseOpen((pre) => !pre);
              e.stopPropagation();
            },
          }}
          slotMembersList={
            <>
              <Collapse in={collapseOpen}>
                <Stack direction={'column'} gap={'10px'}>
                  {meetingDetails.users.map((user, i) => {
                    return (
                      <InterviewerDetailsCard
                        key={i}
                        meetingTiming={{
                          startDate:
                            meetingDetails.interview_meeting.start_time,
                          endDate: meetingDetails.interview_meeting.end_time,
                        }}
                        user={user}
                      />
                    );
                  })}
                </Stack>
              </Collapse>
            </>
          }
          textTime={`${dayjs(meetingDetails.interview_meeting?.start_time).format('hh:mm A')} - ${dayjs(meetingDetails.interview_meeting?.end_time).format('hh:mm A')}  ${convertTimeZoneToAbbreviation(dayjs.tz.guess())}`}
          textMeetingPlatform={getScheduleType(
            meetingDetails?.interview_meeting.schedule_type,
          )}
          textMeetingTitle={meetingDetails?.interview_meeting?.session_name}
          slotMeetingIcon={
            <IconScheduleType
              type={meetingDetails?.interview_meeting?.schedule_type}
            />
          }
          isMeetingPlatformVisible={
            meetingDetails.interview_meeting?.schedule_type === 'google_meet' ||
            meetingDetails.interview_meeting?.schedule_type === 'zoom'
          }
          isDurationVisible={true}
          isPhoneCallVisible={false}
          isTimeVisible={Boolean(meetingDetails.interview_meeting?.start_time)}
          slotStatus={
            <StatusBadge
              isCancelledVisible={
                meetingDetails.interview_meeting?.status === 'cancelled'
              }
              isConfirmedVisible={
                meetingDetails.interview_meeting?.status === 'confirmed'
              }
              isWaitingVisible={
                meetingDetails.interview_meeting?.status === 'waiting'
              }
              isCompletedVisible={
                meetingDetails.interview_meeting?.status === 'completed'
              }
              isNotScheduledVisible={
                meetingDetails.interview_meeting?.status === 'not_scheduled'
              }
            />
          }
          isLocationVisible={false}
          textDuration={getBreakLabel(
            meetingDetails.interview_meeting.session_duration,
          )}
          textJob={meetingDetails?.interview_meeting?.job_title}
          bgColorProps={{
            style: {
              background:
                meetingDetails.interview_meeting?.status === 'cancelled'
                  ? '#D93F4C'
                  : meetingDetails.interview_meeting?.status === 'completed'
                    ? '#228F67'
                    : meetingDetails.interview_meeting?.status === 'confirmed'
                      ? '#337FBD'
                      : meetingDetails.interview_meeting?.status ===
                          'not_scheduled'
                        ? '#D8DCDE'
                        : meetingDetails.interview_meeting?.status === 'waiting'
                          ? '#F79A3E'
                          : meetingDetails.interview_meeting?.status ===
                              'reschedule'
                            ? '#D8DCDE'
                            : '#D8DCDE',
            },
          }}
        />
      </Stack>
    </>
  );
}

export default ScheduleMeetingCard;
