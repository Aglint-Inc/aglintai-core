import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { InterviewScreenCard, ShadowSessionCard } from '@/devlink2';
import IconScheduleType from '@/src/components/Scheduling/AllSchedules/ListCard/Icon';
import { getScheduleType } from '@/src/components/Scheduling/AllSchedules/utils';

import { ProgressType } from '../..';

function SessionCard({
  session_name,
  prog,
  isLineVisible
}: {
  session_name: string;
  prog: ProgressType;
  isLineVisible: boolean;
}) {
  const router = useRouter();
  return (
    <ShadowSessionCard
      textSessionName={session_name}
      isShadowIconVisible={prog.interviewer_type === 'shadow'}
      isReverseShadowIconVisible={prog.interviewer_type === 'reverse_shadow'}
      slotInterviewScreenCard={
        <InterviewScreenCard
          onClickCard={{
            onClick: () => {
              router.push(
                `/scheduling/view?schedule_id=${prog.interview_meeting.interview_schedule_id}&module_id=${prog.interview_meeting.module_id}`
              );
            }
          }}
          textDate={dayjs(prog.interview_meeting.end_time).format('DD')}
          textDay={dayjs(prog.interview_meeting.end_time).format('dddd')}
          textMonth={dayjs(prog.interview_meeting.end_time).format('MMM')}
          textStatus={prog.interview_meeting.status ?? ''}
          textTime={`${dayjs(prog.interview_meeting.start_time).format('hh:mm A')} - ${dayjs(prog.interview_meeting.end_time).format('hh:mm A')} ( ${prog.interview_meeting.duration} Minutes )`}
          textMeetingPlatform={getScheduleType(
            prog.interview_meeting.interview_schedule.schedule_type
          )}
          slotMeetingIcon={
            <IconScheduleType
              type={prog.interview_meeting.interview_schedule.schedule_type}
            />
          }
          textTitle={prog.interview_meeting.interview_schedule.schedule_name}
        />
      }
      isLineVisible={isLineVisible}
    />
  );
}

export default SessionCard;
