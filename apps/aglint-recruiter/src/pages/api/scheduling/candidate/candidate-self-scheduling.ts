import {
  addErrorHandlerWrap,
  candidate_self_schedule_request,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { filterSchedulingOptionsArray } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/BodyDrawer/StepScheduleFilter/utils';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getClonedSessionIds } from '@/src/utils/scheduling/getClonedSessionIds';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body;
  const {
    application_id,
    date_range,
    session_ids,
    slots_options,
    recruiter_id,
  } = v.parse(candidate_self_schedule_request, req_body);

  const cand_schedule = new CandidatesSchedulingV2({
    include_conflicting_slots: {
      show_soft_conflicts: slots_options.enable_soft_conf_slots,
      out_of_working_hrs: slots_options.enable_soft_conf_slots,
    },
    return_empty_slots_err: true,
  });
  const cloned_sessn_ids = await getClonedSessionIds(
    application_id,
    session_ids,
  );
  console.log(cloned_sessn_ids);
  await cand_schedule.fetchDetails({
    company_id: recruiter_id,
    start_date_str: date_range.start_date,
    end_date_str: date_range.end_date,
    req_user_tz: 'asia/colombo',
    session_ids: cloned_sessn_ids,
  });
  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  console.log(slots);
  const filtered_slot_info = filterSchedulingOptionsArray({
    schedulingOptions: slots,
    filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours: slots_options.enable_oow_conf_slots,
      isSoftConflicts: slots_options.enable_soft_conf_slots,
      isWorkLoad: true,
      preferredDateRanges: [],
      preferredInterviewers: [],
    },
  });

  const plans = filtered_slot_info.combs.flatMap((c) => c.plans);
  console.log(plans.length);

  return res.status(200).send('OK');
};

export default addErrorHandlerWrap(handler);

// preffered time range {start_time, end_time}
// whether to show slots on soft conflicts
// whether to show slots on outside working hours
