import { DatabaseTable } from '@aglint/shared-types';

import AvailabilityLinkSent from '../Actions/AvailabilityLinkSent';
import CandAvailRecieved from '../Actions/CandAvailRecieved';
import FirstFollowUp from '../Actions/FirstFollowUp';
import SelfScheduleLinkSent from '../Actions/SelfScheduleLinkSent';

export const progressActionMap: Partial<
  Record<
    `${DatabaseTable['request_progress']['event_type']}_${DatabaseTable['request_progress']['status']}`,
    any
  >
> = {
  CAND_AVAIL_REC_completed: CandAvailRecieved,
  SCHEDULE_FIRST_FOLLOWUP_SELF_SCHEDULE_completed: FirstFollowUp,
  SCHEDULE_FIRST_FOLLOWUP_AVAILABILITY_LINK_completed: FirstFollowUp,
  SELF_SCHEDULE_LINK_completed: SelfScheduleLinkSent,
  REQ_CAND_AVAIL_EMAIL_LINK_completed: AvailabilityLinkSent,
  CANDIDATE_AVAILABILITY_RE_REQUESTED_completed: AvailabilityLinkSent,
};
