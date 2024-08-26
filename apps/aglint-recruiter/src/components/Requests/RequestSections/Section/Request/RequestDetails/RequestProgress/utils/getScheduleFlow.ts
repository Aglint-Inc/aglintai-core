import { EventTargetMapType, RequestProgressMapType } from '../types';
type ScheduleFlow = 'availability' | 'selfSchedule';
export const getSchedulFlow = ({
  eventTargetMap,
  requestTargetMp,
}: {
  eventTargetMap: EventTargetMapType;
  requestTargetMp: RequestProgressMapType;
}) => {
  let scheduleFlow: ScheduleFlow;

  if (requestTargetMp['REQ_CAND_AVAIL_EMAIL_LINK']) {
    scheduleFlow = 'availability';
  } else if (
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
