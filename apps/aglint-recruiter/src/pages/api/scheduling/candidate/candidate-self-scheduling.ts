import {
  addErrorHandlerWrap,
  candidate_self_schedule_request,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body;
  const { application_id, date_range, session_ids, slots_options, company_id } =
    v.parse(candidate_self_schedule_request, req_body);

  const cand_schedule = new CandidatesSchedulingV2({
    include_conflicting_slots: {
      show_conflicts_events: slots_options.enable_soft_conf_slots,
      out_of_working_hrs: slots_options.enable_soft_conf_slots,
    },
  });

  await cand_schedule.fetchDetails({
    company_id: company_id,
    start_date_str: date_range.start_date,
    end_date_str: date_range.end_date,
    req_user_tz: 'asia/colombo',
    session_ids: session_ids,
  });
  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  // filterSchedulingOptionsArray()
  return res.status(200).send('OK');
};

export default addErrorHandlerWrap(handler);

// preffered time range {start_time, end_time}
// whether to show slots on soft conflicts
// whether to show slots on outside working hours
