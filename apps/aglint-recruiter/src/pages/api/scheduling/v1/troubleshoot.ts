/* eslint-disable security/detect-object-injection */
import { schema_troubleshoot } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed_body = v.parse(schema_troubleshoot, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    for (let key of Object.keys(
      parsed_body.api_options.include_conflicting_slots,
    )) {
      parsed_body.api_options.include_conflicting_slots[key] = true;
    }
    const cand_schedule = new CandidatesSchedulingV2(
      {
        recruiter_id: parsed_body.recruiter_id,
        session_ids: [parsed_body.session_id],
        candidate_tz: parsed_body.user_tz,
        start_date_str: parsed_body.schedule_date,
        end_date_str: parsed_body.schedule_date,
      },
      parsed_body.api_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const plan_combs = cand_schedule.findCandSlotForTheDay();

    return res.status(200).json(plan_combs);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};
export default handler;
