import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import { StatusPill } from '@/devlink';
import {
  AvatarWithName,
  RelatedJobCard,
  ScheduleCard,
  ScheduleDetailSidepanel,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';

function RightPanel({ schedule }: { schedule: TransformSchedule }) {
  const router = useRouter();
  const { recruiterUser, recruiter } = useAuthDetails();
  const isMeetVisible = useMemo(() => {
    const planFiltered = schedule?.schedule?.confirmed_option?.plans.find(
      (plan) => plan.module_id === router.query.module_id,
    );
    if (!planFiltered) {
      return false;
    }
    const currentUserID = recruiterUser?.user_id.toString();
    const isUserSelected = (plan) =>
      plan.selectedIntervs.some((int) => int.interv_id === currentUserID);
    const isUserRevShadow = (plan) =>
      plan.revShadowIntervs.some((int) => int.interv_id === currentUserID);
    const isUserShadow = (plan) =>
      plan.shadowIntervs.some((int) => int.interv_id === currentUserID);
    const isUserInvolved =
      isUserSelected(planFiltered) ||
      isUserRevShadow(planFiltered) ||
      isUserShadow(planFiltered);
    const isMeetingInFuture = new Date(planFiltered.start_time) > new Date();
    return isUserInvolved && isMeetingInFuture;
  }, [schedule?.schedule?.confirmed_option?.plans, router.query.module_id]);
  if (!schedule) {
    return null;
  }
  return (
    <ScheduleDetailSidepanel
      textScheduleConfirmed={schedule.schedule.status}
      slotScheduleCard={
        <ScheduleCard
          textTitle={schedule.schedule.schedule_name}
          textStatus={schedule.schedule.status}
          textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
          textDay={dayjs(schedule.interview_meeting.end_time).format('dddd')}
          textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
          textPlatformName={getScheduleType(schedule.schedule.schedule_type)}
          textDuration={`${dayjs(schedule.interview_meeting.start_time).format(
            'hh:mm A',
          )} - ${dayjs(schedule.interview_meeting.end_time).format(
            'hh:mm A',
          )} ( ${schedule.interview_meeting.duration} Minutes )`}
          colorPropsText={{
            style: {
              color:
                schedule.schedule.status === 'completed'
                  ? '#228F67'
                  : schedule.schedule.status === 'confirmed'
                    ? '#337FBD'
                    : schedule.schedule.status === 'pending'
                      ? '#ED8F1C'
                      : '#D93F4C',
            },
          }}
          slotPlatformIcon={
            <IconScheduleType type={schedule.schedule.schedule_type} />
          }
        />
      }
      isJoinLinkVisible={isMeetVisible}
      onClickJoinMeet={{
        onClick: () => {
          window.open(
            schedule.interview_meeting.meeting_json.hangoutLink,
            '_blank',
          );
        },
      }}
      textUrl={schedule.interview_meeting.meeting_json.hangoutLink}
      onClickCopy={{
        onClick: () => {
          navigator.clipboard
            .writeText(schedule.interview_meeting.meeting_json.hangoutLink)
            .then(() => {
              toast.success('Link copied');
            });
        },
      }}
      slotRelatedJobCard={
        <RelatedJobCard
          textJobTitle={schedule.job.job_title}
          textJobTypeAndLocation={
            (schedule.job.jd_json as any)?.level + ', ' + schedule.job.location
          }
        />
      }
      slotInterviewPlanCard={<></>}
      isCandidateInfoVisible={false}
      isJobVisible={false}
      slotCandidateCard={<>asds</>}
      slotStatusPill={
        <StatusPill
          colorBgPropsStatus={{
            style: {
              backgroundColor:
                schedule.schedule.status === 'completed'
                  ? '#228F6711'
                  : schedule.schedule.status === 'confirmed'
                    ? '#337FBD11'
                    : schedule.schedule.status === 'pending'
                      ? '#ED8F1C11'
                      : '#D93F4C11',
              color:
                schedule.schedule.status === 'completed'
                  ? '#228F67'
                  : schedule.schedule.status === 'confirmed'
                    ? '#337FBD'
                    : schedule.schedule.status === 'pending'
                      ? '#ED8F1C'
                      : '#D93F4C',
            },
          }}
          textStatus={schedule.schedule.status}
        />
      }
      slotAvatarWithName={
        <>
          <AvatarWithName
            isRoleVisible={false}
            textName={recruiter.name}
            slotAvatar={
              <MuiAvatar
                level={getFullName(recruiter.name, '')}
                variant={'circular'}
                width={'100%'}
                height={'100%'}
                fontSize={'14px'}
              />
            }
          />
        </>
      }
    />
  );
}

export default RightPanel;
