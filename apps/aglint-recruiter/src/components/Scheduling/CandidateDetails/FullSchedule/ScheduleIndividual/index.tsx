import { Checkbox, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { StatusBadge } from '@/devlink2/StatusBadge';
import { EditOptionModule } from '@/devlink3/EditOptionModule';
import { NewInterviewPlanCard } from '@/devlink3/NewInterviewPlanCard';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';

import IconScheduleType from '../../../Candidates/ListCard/Icon';
import { getScheduleBgcolor, getScheduleType } from '../../../Candidates/utils';
import { formatTimeWithTimeZone } from '../../../utils';
import {
  SchedulingApplication,
  setEditSession,
  setIndividualCancelOpen,
  setIndividualRescheduleOpen,
  setIsEditOpen,
  setSelectedSession,
} from '../../store';

function ScheduleIndividualCard({
  session,
  isCheckboxVisible = false,
  isThreeDotVisible = true,
  onClickCheckBox,
  selectedSessionIds,
  isOnclickCard = true,
}: {
  session: SchedulingApplication['initialSessions'][number];
  isCheckboxVisible?: boolean;
  isThreeDotVisible?: boolean;
  onClickCheckBox: ({
    // eslint-disable-next-line no-unused-vars
    session,
  }: {
    session: SchedulingApplication['initialSessions'][0];
  }) => void;
  selectedSessionIds: string[];
  isOnclickCard?: boolean;
}) {
  const router = useRouter();

  return (
    <NewInterviewPlanCard
      isScheduleNowButtonVisible={false}
      isCheckboxVisible={true}
      onClickCard={{
        onClick: (e) => {
          e.stopPropagation();
          if (isOnclickCard) {
            if (
              session.interview_meeting?.status === 'completed' ||
              session.interview_meeting?.status === 'confirmed' ||
              session.interview_meeting?.status === 'waiting'
            ) {
              router.push(
                `/scheduling/view?meeting_id=${session.interview_meeting.id}&tab=candidate_details`,
              );
            } else if (
              session.interview_meeting?.status === 'not_scheduled' ||
              !session.interview_meeting ||
              session.interview_meeting?.status === 'cancelled'
            ) {
              onClickCheckBox({ session });
            }
          } else {
            onClickCheckBox({ session });
          }
        },
      }}
      isDateVisible={
        session.interview_meeting?.status !== 'cancelled' &&
        Boolean(session.interview_meeting?.start_time)
      }
      isThreeDotVisible={
        session.interview_meeting?.status !== 'completed' && isThreeDotVisible
      }
      propsBgColorStatus={{
        style: {
          background: getScheduleBgcolor(session.interview_meeting?.status),
        },
      }}
      slotStatus={
        session.interview_meeting?.status ? (
          <StatusBadge
            isCancelledVisible={
              session.interview_meeting.status === 'cancelled'
            }
            isConfirmedVisible={
              session.interview_meeting.status === 'confirmed'
            }
            isWaitingVisible={session.interview_meeting.status === 'waiting'}
            isCompletedVisible={
              session.interview_meeting.status === 'completed'
            }
            isNotScheduledVisible={
              session.interview_meeting.status === 'not_scheduled' || false
            }
          />
        ) : (
          <StatusBadge
            isNotScheduledVisible={true}
            isCancelledVisible={false}
            isConfirmedVisible={false}
            isWaitingVisible={false}
            isCompletedVisible={false}
          />
        )
      }
      isDebriefIconVisible={session.session_type === 'debrief'}
      isPanelIconVisible={session.session_type === 'panel'}
      isOnetoOneIconVisible={session.session_type === 'individual'}
      isDurationVisible={true}
      isLocationVisible={Boolean(session.location)}
      isNotScheduledIconVisible={!session.interview_meeting?.start_time}
      slotCheckbox={
        !session.interview_meeting ||
        session.interview_meeting.status === 'not_scheduled' ||
        session.interview_meeting.status === 'cancelled' ||
        session.interview_meeting.status === 'reschedule' ||
        isCheckboxVisible ? (
          <Checkbox
            size='small'
            checked={selectedSessionIds.includes(session.id)}
          />
        ) : (
          <Stack width={'18px'}></Stack>
        )
      }
      isSelected={selectedSessionIds.includes(session.id)}
      isTimeVisible={
        (session.interview_meeting?.status == 'confirmed' ||
          session.interview_meeting?.status == 'completed') &&
        Boolean(session.interview_meeting?.start_time)
      }
      slotPlatformIcon={<IconScheduleType type={session.schedule_type} />}
      textDuration={`${session.session_duration} Minutes`}
      textLocation={session.location || '--'}
      textMeetingPlatform={getScheduleType(session.schedule_type)}
      textMeetingTitle={session.name || '--'}
      textDate={
        (session.interview_meeting?.status == 'confirmed' ||
          session.interview_meeting?.status == 'completed') &&
        (session.interview_meeting?.start_time
          ? dayjs(session.interview_meeting?.start_time).format(
              'ddd, MMM DD, YYYY',
            )
          : '')
      }
      textTime={formatTimeWithTimeZone({
        start_time: session.interview_meeting?.start_time,
        end_time: session.interview_meeting?.end_time,
        timeZone: userTzDayjs.tz.guess(),
      })}
      slotEditOptionModule={
        <EditOptionModule
          isResendInviteVisible={false}
          isEditVisible={
            !session.interview_meeting ||
            session.interview_meeting?.status === 'not_scheduled' ||
            session.interview_meeting?.status === 'cancelled'
          }
          isViewScheduleVisible={false}
          isCancelScheduleVisible={
            session.interview_meeting?.status === 'confirmed' ||
            session.interview_meeting?.status === 'waiting'
          }
          isRescheduleVisible={
            session.interview_meeting?.status === 'confirmed' ||
            session.interview_meeting?.status === 'waiting'
          }
          onClickCancelSchedule={{
            onClick: () => {
              setSelectedSession(session);
              setIndividualCancelOpen(true);
            },
          }}
          onClickReschedule={{
            onClick: () => {
              setSelectedSession(session);
              setIndividualRescheduleOpen(true);
            },
          }}
          onClickEdit={{
            onClick: () => {
              setEditSession(session);
              setIsEditOpen(true);
            },
          }}
        />
      }
    />
  );
}

export default ScheduleIndividualCard;
