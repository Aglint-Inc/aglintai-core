import { DatabaseTable } from '@aglint/shared-types';
import ScheduleFlows from '../Actions/Schedule';

export const progressActionMap: Partial<
  Record<
    `${DatabaseTable['request_progress']['event_type']}_${DatabaseTable['request_progress']['status']}`,
    any
  >
> = {
  INIT_SCHEDULE_not_started: ScheduleFlows,
  REQ_CAND_AVAIL_EMAIL_LINK_failed: ScheduleFlows,
};
