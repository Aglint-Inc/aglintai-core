import { DatabaseTable } from '@aglint/shared-types';

import ScheduleFlows from '../Actions/Schedule';

export const progressActionMap: Partial<
  Record<
    `${DatabaseTable['request_progress']['event_type']}_${DatabaseTable['request_progress']['status']}`,
    any
  >
> = {
  CHOOSE_SCHEDULE_FLOW_not_started: ScheduleFlows,
  REQ_CAND_AVAIL_EMAIL_LINK_failed: ScheduleFlows,
  CAND_AVAIL_REC_completed: ScheduleFlows,
};
