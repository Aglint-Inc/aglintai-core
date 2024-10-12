import { type DatabaseTable } from '@aglint/shared-types';

import {
  type RequestProgressMapType,
  type TriggerActionMapType,
} from '../types';
type ScheduleFlow = 'availability' | 'selfSchedule';
export const getSchedulFlow = ({
  eventTargetMap,
  requestProgMp,
}: {
  eventTargetMap: TriggerActionMapType;
  requestProgMp: RequestProgressMapType;
}) => {
  let scheduleFlow: ScheduleFlow | null = null;
  if (requestProgMp['REQ_CAND_AVAIL_EMAIL_LINK']) {
    scheduleFlow = 'availability';
  } else if (requestProgMp['SELF_SCHEDULE_LINK']) {
    scheduleFlow = 'selfSchedule';
  }
  if (scheduleFlow) {
    return scheduleFlow;
  }

  let workflowAction: DatabaseTable['workflow_action'] | null = null;
  if (
    eventTargetMap['onRequestSchedule'] &&
    eventTargetMap['onRequestSchedule'].actions.length > 0
  ) {
    workflowAction = eventTargetMap['onRequestSchedule'].actions[0];
  }
  if (
    workflowAction &&
    workflowAction.target_api ===
      'onRequestSchedule_emailLink_getCandidateAvailability'
  ) {
    scheduleFlow = 'availability';
  } else if (
    workflowAction &&
    workflowAction.target_api ===
      'onRequestSchedule_emailLink_sendSelfSchedulingLink'
  ) {
    scheduleFlow = 'selfSchedule';
  }

  return scheduleFlow;
};
