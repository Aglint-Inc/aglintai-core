import { DatabaseTable } from '@aglint/shared-types';

import { EventTargetMapType } from './types';
type ScheduleFlow = 'availability' | 'selfSchedule';
export const getSchedulFlow = ({
  eventTargetMap,
  request_progress,
}: {
  eventTargetMap: EventTargetMapType;
  request_progress: DatabaseTable['request_progress'][];
}) => {
  let scheduleFlow: ScheduleFlow;

  let progrEndIdx = request_progress.findIndex(
    (prog) => prog.event_type === 'CAND_AVAIL_REC',
  );

  if (progrEndIdx !== -1) {
    if (
      request_progress[progrEndIdx].event_type === 'REQ_CAND_AVAIL_EMAIL_LINK'
    ) {
      scheduleFlow = 'availability';
    } else if (
      request_progress[progrEndIdx].event_type === 'SELF_SCHEDULE_LINK'
    ) {
      scheduleFlow = 'selfSchedule';
    }
  }
  if (
    eventTargetMap['onRequestSchedule'] &&
    eventTargetMap['onRequestSchedule'].length > 0
  ) {
    if (
      eventTargetMap['onRequestSchedule'][0] ===
      'onRequestSchedule_emailLink_getCandidateAvailability'
    ) {
      scheduleFlow = 'availability';
    } else {
      scheduleFlow = 'selfSchedule';
    }
  }
  return scheduleFlow;
};
