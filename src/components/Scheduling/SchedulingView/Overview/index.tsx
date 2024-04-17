import axios from 'axios';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { StatusBadge } from '@/devlink2';
import {
  AvatarWithName,
  CandidatesCard,
  ScheduleCard,
  ScheduleTabOverview,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { BodyParams } from '@/src/pages/api/scheduling/v1/event_attendee_status';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';
import DeleteScheduleDialog from './DeleteDialog';
import RescheduleDialog from './RescheduleDialog';

function Overview({ schedule }: { schedule: TransformSchedule }) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [allCalendarStatus, setAllCalendarStatus] = useState<
    {
      email: string;
      organizer: boolean;
      self: boolean;
      responseStatus: 'needsAction' | 'accepted' | 'declined' | 'tentative';
    }[]
  >([]);

  useEffect(() => {
    if (schedule?.interview_meeting) {
      fetchCalendarStatus();
    }
  }, [schedule?.interview_meeting]);

  const fetchCalendarStatus = async () => {
    try {
      const eventId = (schedule.interview_meeting?.meeting_json as any)?.id;
      const user_id = schedule.users[0].id;

      const res = await axios.post('/api/scheduling/v1/event_attendee_status', {
        attendee_interv_id: user_id,
        event_id: eventId,
      } as BodyParams);

      if (res?.data?.event_attendees_status)
        setAllCalendarStatus(res.data.event_attendees_status);
    } catch (e) {
      //
    }
  };

  if (!schedule) {
    return null;
  }
  const { candidates, schedule: scheduleDetails, users } = schedule;

  const qualifiedMembers = users.filter(
    (item) => item.interviewer_type === 'qualified',
  );

  const trainingMembers = users.filter(
    (item) => item.interviewer_type === 'training',
  );

  return (
    <>
      <DeleteScheduleDialog
        schedule={schedule}
        isCancelOpen={isCancelOpen}
        setIsCancelOpen={setIsCancelOpen}
      />
      <RescheduleDialog
        schedule={schedule}
        isRescheduleOpen={isRescheduleOpen}
        setIsRescheduleOpen={setIsRescheduleOpen}
      />
      <ScheduleTabOverview
        onClickInterviewModuleLink={{
          onClick: () => {
            router.push(
              `/scheduling/module/members/${schedule.interview_session.module_id}`,
            );
          },
        }}
        textSchedule={
          schedule.interview_meeting.confirmed_date &&
          `This Schedule has been confirmed on ${dayjs(schedule.interview_meeting.confirmed_date).format('DD MMM YYYY')}`
        }
        slotStatus={
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
        textMeetingLink={schedule.interview_meeting.meeting_link}
        onClickCopyLink={{
          onClick: () => {
            navigator.clipboard.writeText(
              schedule.interview_meeting.meeting_link,
            );
          },
        }}
        isInterviewersVisible={qualifiedMembers.length > 0}
        slotJoinMeetingButton={
          <ButtonPrimaryRegular
            textLabel={'Join Meeting'}
            onClickButton={{
              onClick: () => {
                window.open(schedule.interview_meeting.meeting_link, '_blank');
              },
            }}
          />
        }
        isTraineesVisible={trainingMembers.length > 0}
        isCoordinatorVisible={Boolean(schedule?.coordinator?.first_name)}
        slotInterviewers={qualifiedMembers.map((item, i) => {
          const isTickVisible =
            allCalendarStatus.find((event) => event.email === item.email)
              ?.responseStatus === 'accepted' ||
            allCalendarStatus.find((event) => event.email === item.email)
              ?.responseStatus === 'tentative';

          return (
            <AvatarWithName
              key={i}
              isRoleVisible={false}
              textName={
                getFullName(item.first_name, item.last_name) +
                `${item.email === recruiterUser.email ? ' ( You )' : ''}`
              }
              isTickVisible={isTickVisible}
              slotAvatar={
                <MuiAvatar
                  level={getFullName(item.first_name, item.last_name)}
                  src={item.profile_image}
                  variant={'circular'}
                  width={'100%'}
                  height={'100%'}
                  fontSize={'14px'}
                />
              }
            />
          );
        })}
        textInterviewModuleLink={schedule.interview_session.name}
        slotTrainees={trainingMembers.map((item, i) => {
          const isTickVisible =
            allCalendarStatus.find((event) => event.email === item.email)
              ?.responseStatus === 'accepted' ||
            allCalendarStatus.find((event) => event.email === item.email)
              ?.responseStatus === 'tentative';
          return (
            <AvatarWithName
              key={i}
              isRoleVisible={false}
              textName={
                getFullName(
                  schedule.coordinator.first_name,
                  schedule.coordinator.last_name,
                ) + `${item.email === recruiterUser.email ? ' ( You )' : ''}`
              }
              isTickVisible={isTickVisible}
              slotAvatar={
                <MuiAvatar
                  level={getFullName(item.first_name, item.last_name)}
                  src={item.profile_image}
                  variant={'circular'}
                  width={'100%'}
                  height={'100%'}
                  fontSize={'14px'}
                />
              }
            />
          );
        })}
        slotCoordinators={
          schedule?.coordinator?.first_name && (
            <AvatarWithName
              isRoleVisible={false}
              textName={getFullName(
                schedule.coordinator.first_name,
                schedule.coordinator.last_name,
              )}
              slotAvatar={
                <MuiAvatar
                  level={getFullName(
                    schedule.coordinator.first_name,
                    schedule.coordinator.last_name,
                  )}
                  src={schedule.coordinator.profile_image}
                  variant={'circular'}
                  width={'100%'}
                  height={'100%'}
                  fontSize={'14px'}
                />
              }
            />
          )
        }
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
        slotScheduleCard={
          <ScheduleCard
            textTimeDuration={getBreakLabel(
              schedule.interview_session.session_duration,
            )}
            isDebriefIconVisible={
              schedule.interview_session.session_type === 'debrief'
            }
            isOneToOneIconVisible={
              schedule.interview_session.session_type === 'individual'
            }
            isPanelIconVisible={
              schedule.interview_session.session_type === 'panel'
            }
            textTitle={scheduleDetails.schedule_name}
            textStatus={capitalize(schedule.interview_meeting.status)}
            textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
            textDay={dayjs(schedule.interview_meeting.end_time).format('ddd')}
            textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
            textPlatformName={getScheduleType(
              schedule.interview_session.schedule_type,
            )}
            textDuration={`${dayjs(
              schedule.interview_meeting.start_time,
            ).format(
              'hh:mm A',
            )} - ${dayjs(schedule.interview_meeting.end_time).format('hh:mm A')}`}
            slotPlatformIcon={
              <IconScheduleType
                type={schedule.interview_session.schedule_type}
              />
            }
          />
        }
        slotCandidateCard={
          <CandidatesCard
            isLinks={false}
            textMail={candidates.email}
            textName={candidates.first_name + ' ' + candidates.last_name}
            textRole={schedule.file?.resume_json?.basics?.currentJobTitle}
            slotImage={
              <MuiAvatar
                level={getFullName(
                  schedule?.candidates.first_name,
                  schedule?.candidates.last_name,
                )}
                src={schedule?.candidates.avatar}
                variant={'rounded'}
                width={'100%'}
                height={'100%'}
                fontSize={'20px'}
              />
            }
          />
        }
      />
    </>
  );
}

export default Overview;
