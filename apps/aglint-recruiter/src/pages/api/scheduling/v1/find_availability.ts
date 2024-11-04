import { type DateRangePlansType } from '@aglint/shared-types';
import { type schema_find_availability_payload } from '@aglint/shared-utils/src/scheduling/apiSchemas';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';

export type ApiResponseFindAvailability = {
  slots: DateRangePlansType[];
  availabilities: CandidatesScheduling['calendar_events'];
};

const findAvailability = async (
  parsedData: NonNullable<z.output<typeof schema_find_availability_payload>>,
) => {
  parsedData.options.return_empty_slots_err = true;
  const cand_schedule = new CandidatesScheduling(parsedData.options);
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
  cand_schedule.setQualifiedIntervs(parsedData.selected_ints ?? []);
  const slots = cand_schedule.findAvailabilitySlotsDateRange();
  return { slots, availabilities };
};

export default createPageApiPostRoute(null, findAvailability);
