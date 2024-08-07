import { APIOptions, DatabaseTable } from '@aglint/shared-types';

import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';
import { ProgressLoggerType } from './utils';

export const findCandSelectedSlots = async ({
  api_options,
  company_id,
  end_date_str,
  req_user_tz,
  session_ids,
  start_date_str,
  cand_avail,
  reqProgressLogger,
}: {
  api_options: APIOptions;
  session_ids: string[];
  end_date_str: string;
  start_date_str: string;
  company_id: string;
  req_user_tz: string;
  cand_avail: DatabaseTable['candidate_request_availability']['slots'];
  reqProgressLogger: ProgressLoggerType;
}) => {
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    session_ids,
    start_date_str,
    end_date_str,
    company_id,
    req_user_tz,
  });
  const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(cand_avail);
  const flatted_plans = cand_picked_slots
    .map((c) => c.selected_dates.flatMap((d) => d.plans))
    .flat();
  await reqProgressLogger({
    log: `Found ${flatted_plans.length}`,
    event_type: 'FIND_SUITABLE_SLOTS',
    is_progress_step: true,
    status: 'completed',
  });
  return cand_picked_slots;
};
