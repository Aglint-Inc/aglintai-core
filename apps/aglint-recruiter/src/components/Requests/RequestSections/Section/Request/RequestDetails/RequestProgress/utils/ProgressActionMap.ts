import { DatabaseTable } from '@aglint/shared-types';

import FirstFollowUp from '../Actions/FirstFollowUp';
import ScheduleFlows from '../Actions/Schedule';
import SelfScheduleLinkSent from '../Actions/SelfScheduleLinkSent';

export const progressActionMap: Partial<
  Record<
    `${DatabaseTable['request_progress']['event_type']}_${DatabaseTable['request_progress']['status']}`,
    any
  >
> = {
  CHOOSE_SCHEDULE_FLOW_not_started: ScheduleFlows,
  SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE_completed: FirstFollowUp,
  SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK_completed: FirstFollowUp,
  SELF_SCHEDULE_LINK_completed: SelfScheduleLinkSent,
};
