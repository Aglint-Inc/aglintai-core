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

import IconScheduleType from '../../../Candidates/ListCard/Icon/IconScheduleType';
import {
  getScheduleBgcolor,
  getScheduleTextcolor,
  getScheduleType,
} from '../../../Candidates/utils';
import { getAllScheduleList } from '../../../Schedules/ScheduleStatesContext';
import { convertTimeZoneToAbbreviation } from '../../../utils';
import InterviewerUserDetail from '../../InterviewerUserDetail';

function ScheduleMeetingCard({
  meetingDetails,
}: {
  meetingDetails: Awaited<ReturnType<typeof getAllScheduleList>>[number];
}) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const router = useRouter();
  let interviewers = meetingDetails.meeting_interviewers || [];

  return (
    <>
      <Stack
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          router.push(
            `/scheduling/view?meeting_id=${meetingDetails.id}&tab=candidate_details`,
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
                      meetingDetails.applications.candidates.first_name,
                      meetingDetails.applications.candidates.last_name,
                    )}
                    isDesignationVisible={true}
                    textDesignation={
                      <Typography variant='caption'>{'Candidate'}</Typography>
                    }
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
                </Stack>
              </Collapse>
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
          slotStatus={
            <StatusBadge
              isCancelledVisible={meetingDetails?.status === 'cancelled'}
              isConfirmedVisible={meetingDetails?.status === 'confirmed'}
              isWaitingVisible={meetingDetails?.status === 'waiting'}
              isCompletedVisible={meetingDetails?.status === 'completed'}
              isNotScheduledVisible={meetingDetails?.status === 'not_scheduled'}
            />
          }
          isLocationVisible={false}
          textDuration={getBreakLabel(meetingDetails.session_duration)}
          slotAvatarWithName={
            <AvatarWithName
              isAvatarVisible={false}
              isCandidateIconVisible={true}
              textName={getFullName(
                meetingDetails.applications.candidates.first_name,
                meetingDetails.applications.candidates.last_name,
              )}
            />
          }
          isAvatarWithNameVisible={!collapseOpen}
          textJob={
            <Stack
              direction={'row'}
              alignItems={'center'}
              spacing={'var(--space-5)'}
            >
              <span>{meetingDetails?.public_jobs.job_title}</span>
            </Stack>
          }
          bgColorProps={{
            style: {
              background: getScheduleBgcolor(meetingDetails.status),
              color: getScheduleTextcolor(meetingDetails.status),
            },
          }}
        />
      </Stack>
    </>
  );
}

export default ScheduleMeetingCard;
