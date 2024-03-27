import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { StatusBadge } from '@/devlink2';
import {
  AvatarWithName,
  RelatedJobCard,
  ScheduleCard,
  ScheduleDetailSidepanel,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import DeleteScheduleDialog from './DeleteDialog';
import RescheduleDialog from './RescheduleDialog';
import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import SchedulingOptionComp from '../../AllSchedules/SchedulingApplication/Common/ScheduleOption';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';

// import { setIsViewProfileOpen, useSchedulingApplicationStore } from '../store';
// import { setIsCancelOpen, setIsRescheduleOpen } from '../../store';
function RightPanel({ schedule }: { schedule: TransformSchedule }) {
  const router = useRouter();
  const [coordinator, setCoordinator] = useState(null);
  const [loading, setLoading] = useState(true);

  const { recruiterUser, recruiter } = useAuthDetails();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
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

  const scheduleOptions =
    [
      {
        plans: schedule?.schedule?.confirmed_option?.plans,
      } as InterviewPlanScheduleDbType,
    ] || [];

  async function getCoordinator() {
    const resMem = await axios.post('/api/scheduling/fetchUserDetails', {
      recruiter_id: recruiter.id,
    });
    if (resMem.data) {
      const members = resMem.data;
      const coordinator = members.find(
        (member) => member.user_id === schedule.schedule.coordinator_id,
      );
      setCoordinator(coordinator);
    }
    setLoading(false);
  }
  useEffect(() => {
    setCoordinator(null);
    if (schedule) getCoordinator();
  }, [schedule, router]);
  if (!schedule) {
    return null;
  }
  return (
    <>
      <DeleteScheduleDialog
        isCancelOpen={isCancelOpen}
        setIsCancelOpen={setIsCancelOpen}
      />
      <RescheduleDialog
        isRescheduleOpen={isRescheduleOpen}
        setIsRescheduleOpen={setIsRescheduleOpen}
      />
      <ScheduleDetailSidepanel
        slotScheduleCard={
          <ScheduleCard
            textTitle={schedule.schedule.schedule_name}
            textStatus={schedule.schedule.status}
            textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
            textDay={dayjs(schedule.interview_meeting.end_time).format('dddd')}
            textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
            textPlatformName={getScheduleType(schedule.schedule.schedule_type)}
            textDuration={`${dayjs(
              schedule.interview_meeting.start_time,
            ).format('hh:mm A')} - ${dayjs(
              schedule.interview_meeting.end_time,
            ).format(
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
              (schedule.job.jd_json as any)?.level +
              ', ' +
              schedule.job.location
            }
          />
        }
        slotInterviewPlanCard={
          <SchedulingOptionComp
            schedulingOptions={scheduleOptions}
            isBadgeVisible={true}
          />
        }
        isCandidateInfoVisible={false}
        isJobVisible={false}
        slotStatusPill={
          <>
            <StatusBadge
              isCancelledVisible={schedule.schedule.status === 'cancelled'}
              isCompletedVisible={schedule.schedule.status === 'completed'}
              isConfirmedVisible={schedule.schedule.status === 'confirmed'}
              isInProgressVisible={schedule.schedule.status === 'pending'}
              isWaitingVisible={schedule.schedule.status === 'pending'}
            />
          </>
        }
        isScheduleButtonVisible={
          recruiter.email === recruiterUser.email &&
          schedule.schedule.status === 'confirmed'
        }
        textScheduleConfirmed={`This Schedule has been ${schedule.schedule.status} on ${dayjs(schedule.schedule.created_at).format('DD MMM YYYY')}`}
        onClickCancelSchedule={{
          onClick: () => {
            setIsCancelOpen(true);
          },
        }}
        onClickReschedule={{
          onClick: () => {
            setIsRescheduleOpen(true);
          },
        }}
        slotAvatarWithName={
          <ShowCode>
            <ShowCode.When isTrue={loading}>Loading...</ShowCode.When>
            <ShowCode.When isTrue={!loading && !!coordinator?.first_name}>
              <AvatarWithName
                isRoleVisible={false}
                textName={
                  coordinator?.first_name + ' ' + coordinator?.last_name
                }
                slotAvatar={
                  <MuiAvatar
                    level={getFullName(
                      coordinator?.first_name,
                      coordinator?.last_name,
                    )}
                    variant={'circular'}
                    width={'100%'}
                    height={'100%'}
                    fontSize={'14px'}
                  />
                }
              />
            </ShowCode.When>
            <ShowCode.Else>{'Not assigned'}</ShowCode.Else>
          </ShowCode>
        }
      />
    </>
  );
}

export default RightPanel;
