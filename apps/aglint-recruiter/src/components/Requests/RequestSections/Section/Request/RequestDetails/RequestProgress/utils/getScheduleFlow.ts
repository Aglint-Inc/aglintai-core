import { RequestProgressMapType, TriggerActionMapType } from '../types';
type ScheduleFlow = 'availability' | 'selfSchedule';
export const getSchedulFlow = ({
  eventTargetMap,
  requestTargetMp,
}: {
  eventTargetMap: TriggerActionMapType;
  requestTargetMp: RequestProgressMapType;
}) => {
  let scheduleFlow: ScheduleFlow = null;
  if (requestTargetMp['REQ_CAND_AVAIL_EMAIL_LINK']) {
    scheduleFlow = 'availability';
  } else if (requestTargetMp['SELF_SCHEDULE_LINK']) {
    scheduleFlow = 'selfSchedule';
  } else if (
    eventTargetMap['onRequestSchedule'] &&
    eventTargetMap['onRequestSchedule'].length > 0
  ) {
    if (
      eventTargetMap['onRequestSchedule'][0].target_api ===
      'onRequestSchedule_emailLink_getCandidateAvailability'
    ) {
      scheduleFlow = 'availability';
    } else if (
      eventTargetMap['onRequestSchedule'][0].target_api ===
      'onRequestSchedule_emailLink_sendSelfSchedulingLink'
    ) {
      scheduleFlow = 'selfSchedule';
    }
  }

  return scheduleFlow;
};
