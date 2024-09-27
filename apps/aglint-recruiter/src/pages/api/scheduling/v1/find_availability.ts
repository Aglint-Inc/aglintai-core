/* eslint-disable no-console */
import { type DateRangePlansType } from '@aglint/shared-types';
import { type schema_find_availability_payload } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';

export type ApiResponseFindAvailability = {
  slots: DateRangePlansType[];
  availabilities: CandidatesSchedulingV2['calendar_events'];
};

const findAvailability = async (
  parsedData: z.infer<typeof schema_find_availability_payload>,
) => {
  parsedData.options.return_empty_slots_err = true;
  const cand_schedule = new CandidatesSchedulingV2(parsedData.options);

  await cand_schedule.fetchDetails({
    params: {
      company_id: parsedData.recruiter_id,
      req_user_tz: parsedData.candidate_tz,
      session_ids: parsedData.session_ids,
      start_date_str: parsedData.start_date_str,
      end_date_str: parsedData.end_date_str,
    },
  });

  const availabilities = cand_schedule.calendar_events;

  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  return { slots, availabilities };
};

export default createPageApiPostRoute(null, findAvailability);
