import { Collapse, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { StatusBadge } from '@/devlink2/StatusBadge';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { MembersList } from '@/devlink3/MembersList';
import { MyScheduleSubCard } from '@/devlink3/MyScheduleSubCard';
import CandidateDefaultIcon from '@/src/components/Common/Icons/CandidateDefaultIcon';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from '../../../Candidates/ListCard/Icon';
import {
  getScheduleBgcolor,
  getScheduleTextcolor,
  getScheduleType,
} from '../../../Candidates/utils';
import { convertTimeZoneToAbbreviation } from '../../../utils';
import { ScheduleListType } from '../hooks';
import InterviewerDetailsCard from './InterviewerDetailCard';

function ScheduleMeetingCard({
  meetingDetails,
}: {
  meetingDetails: ScheduleListType[number];
}) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const router = useRouter();
  let interviewers = meetingDetails.users || [];
  if (
    meetingDetails.interview_meeting.status === 'confirmed' ||
    meetingDetails.interview_meeting.status === 'completed'
  ) {
    interviewers = meetingDetails.users.filter((user) => user.is_confirmed);
  } else {
    interviewers = [];
  }
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
          isDropdownIconVisible={interviewers.length > 0}
          isMembersListVisible={interviewers.length > 0 && collapseOpen}
          slotMembersList={
            <>
              <Collapse in={collapseOpen}>
                <Stack direction={'column'} spacing={'var(--space-2)'}>
                  <MembersList
                    slotImage={<CandidateDefaultIcon size={40} />}
                    textName={getFullName(
                      meetingDetails.candidate?.first_name,
                      meetingDetails.candidate?.last_name,
                    )}
                    isDesignationVisible={true}
                    textDesignation={
                      <Typography variant='caption'>{'Candidate'}</Typography>
                    }
                    textTime={null}
                  />
                  {/* members profile */}
                  {interviewers.map((user, i) => {
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
          slotAvatarWithName={<AvatarWithName
            isAvatarVisible={false}
            isCandidateIconVisible={true}
            textName={getFullName(
              meetingDetails.candidate.first_name,
              meetingDetails.candidate.last_name,
            )}
          
          />}
          isAvatarWithNameVisible={!collapseOpen}
          textJob={
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={'var(--space-5)'}
            >
              <span>{meetingDetails?.interview_meeting?.job_title}</span>
              
              
            </Stack>
          }
          bgColorProps={{
            style: {
              background: getScheduleBgcolor(
                meetingDetails.interview_meeting?.status,
              ),
              color: getScheduleTextcolor(
                meetingDetails.interview_meeting?.status,
              ),
            },
          }}
        />
      </Stack>
    </>
  );
}

export default ScheduleMeetingCard;
