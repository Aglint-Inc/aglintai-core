/* eslint-disable no-console */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
import { schema_find_availability_payload } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';

const findSlotsDateRange = async (
  parsedData: z.infer<typeof schema_find_availability_payload>,
) => {
  const cand_schedule = new CandidatesSchedulingV2(parsedData.options);
  await cand_schedule.fetchDetails({
    params: {
      company_id: parsedData.recruiter_id,
      session_ids: parsedData.session_ids,
      req_user_tz: parsedData.candidate_tz,
      start_date_str: parsedData.start_date_str,
      end_date_str: parsedData.end_date_str,
    },
  });
  const all_day_plans = cand_schedule.findCandSlotsForDateRange();

  return all_day_plans;
};

export default createPageApiPostRoute(
  schema_find_availability_payload,
  findSlotsDateRange,
);
