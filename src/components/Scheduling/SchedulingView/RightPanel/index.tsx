import axios from 'axios';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
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
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';
import DeleteScheduleDialog from './DeleteDialog';
import RescheduleDialog from './RescheduleDialog';

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
    const currentUserID = recruiterUser?.user_id;
    const isUserInvolved = schedule?.users?.some(
      (user) => user.id === currentUserID,
    );
    const isMeetingInFuture =
      new Date(schedule.interview_meeting.start_time) > new Date();
    return isUserInvolved && isMeetingInFuture;
  }, [router.query.module_id]);

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
            textStatus={capitalize(schedule.interview_meeting.status)}
            textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
            textDay={dayjs(schedule.interview_meeting.end_time).format('dddd')}
            textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
            textPlatformName={getScheduleType(
              schedule.interview_session.schedule_type,
            )}
            textDuration={`${dayjs(
              schedule.interview_meeting.start_time,
            ).format('hh:mm A')} - ${dayjs(
              schedule.interview_meeting.end_time,
            ).format(
              'hh:mm A',
            )} ( ${schedule.interview_session.session_duration} Minutes )`}
            colorPropsText={{
              style: {
                color:
                  schedule.interview_meeting.status === 'completed'
                    ? '#228F67'
                    : schedule.interview_meeting.status === 'confirmed'
                      ? '#337FBD'
                      : schedule.interview_meeting.status === 'waiting'
                        ? '#ED8F1C'
                        : '#D93F4C',
              },
            }}
            slotPlatformIcon={
              <IconScheduleType
                type={schedule.interview_session.schedule_type}
              />
            }
          />
        }
        isJoinLinkVisible={isMeetVisible}
        onClickJoinMeet={{
          onClick: () => {
            window.open(schedule.interview_meeting.meeting_link, '_blank');
          },
        }}
        textUrl={schedule.interview_meeting.meeting_link}
        onClickCopy={{
          onClick: () => {
            navigator.clipboard
              .writeText(schedule.interview_meeting.meeting_link)
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
        slotInterviewPlanCard={''}
        isCandidateInfoVisible={false}
        isJobVisible={false}
        slotStatusPill={
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
        isScheduleButtonVisible={
          recruiter.email === recruiterUser.email &&
          schedule.interview_meeting.status === 'confirmed'
        }
        textScheduleConfirmed={``}
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
