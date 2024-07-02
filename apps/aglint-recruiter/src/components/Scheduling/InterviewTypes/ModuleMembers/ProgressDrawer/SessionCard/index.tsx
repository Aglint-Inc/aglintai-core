import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { InterviewScreenCard } from '@/devlink2/InterviewScreenCard';
import { ShadowSessionCard } from '@/devlink2/ShadowSessionCard';
import { StatusBadge } from '@/devlink2/StatusBadge';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon/IconScheduleType';
import {
  getScheduleTextcolor,
  getScheduleType,
} from '@/src/components/Scheduling/Candidates/utils';

import { ProgressUser } from '../../SlotBodyComp/SlotTrainingMembers';

function SessionCard({
  session_name,
  prog,
  isLineVisible,
}: {
  session_name: string;
  prog: ProgressUser['progress'][0];
  isLineVisible: boolean;
}) {
  const router = useRouter();
  return (
    <ShadowSessionCard
      textSessionName={session_name}
      isShadowIconVisible={prog.training_type === 'shadow'}
      isReverseShadowIconVisible={prog.training_type === 'reverse_shadow'}
      slotStatusBadge={
        <StatusBadge
          isNotScheduledVisible={false}
          isConfirmedVisible={prog.interview_meeting.status == 'confirmed'}
          isCancelledVisible={prog.interview_meeting.status == 'cancelled'}
          isCompletedVisible={prog.interview_meeting.status == 'completed'}
          isInProgressVisible={prog.interview_meeting.status == 'waiting'}
        />
      }
      slotInterviewScreenCard={
        <InterviewScreenCard
          onClickCard={{
            onClick: () => {
              router.push(
                `/scheduling/view?schedule_id=${prog.interview_meeting.interview_schedule_id}&module_id=${prog.interview_session.module_id}`,
              );
            },
          }}
          colorPropsText={{
            style: {
              color: getScheduleTextcolor(prog.interview_meeting.status),
            },
          }}
          textDate={dayjs(prog.interview_meeting.end_time).format('DD')}
          textDay={dayjs(prog.interview_meeting.end_time).format('dddd')}
          textMonth={dayjs(prog.interview_meeting.end_time).format('MMM')}
          isStatusVisible={false}
          textTime={`${dayjs(prog.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(prog.interview_meeting.end_time).format('hh:mm A')}`}
          textMeetingPlatform={getScheduleType(
            prog.interview_session.schedule_type,
          )}
          slotMeetingIcon={
            <IconScheduleType type={prog.interview_session.schedule_type} />
          }
          textTitle={prog.interview_session.name}
        />
      }
      isLineVisible={isLineVisible}
    />
  );
}

export default SessionCard;
