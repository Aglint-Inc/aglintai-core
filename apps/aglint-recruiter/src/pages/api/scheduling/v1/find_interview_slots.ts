/* eslint-disable no-console */
import { schema_find_interview_slot } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { combineSlots } from '@/utils/scheduling_v2/utils';

const findInterviewSlot = async (
  parsedData: z.infer<typeof schema_find_interview_slot>,
) => {
  const cand_schedule = new CandidatesSchedulingV2(parsedData.options);

  await cand_schedule.fetchDetails({
    params: {
      company_id: parsedData.recruiter_id,
      session_ids: parsedData.session_ids,
      req_user_tz: parsedData.candidate_tz,
      start_date_str: parsedData.schedule_date,
      end_date_str: parsedData.schedule_date,
    },
  });
  const plan_combs = cand_schedule.findCandSlotForTheDay();

  const session_combs = combineSlots(plan_combs);
  return session_combs;
};

export default createPageApiPostRoute(
  schema_find_interview_slot,
  findInterviewSlot,
);
