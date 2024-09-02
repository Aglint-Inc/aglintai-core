/* eslint-disable no-console */
import { schema_find_availability_payload } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_find_availability_payload, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    parsedData.options.return_empty_slots_err = true;
    const cand_schedule = new CandidatesSchedulingV2(parsedData.options);

    await cand_schedule.fetchDetails({
      company_id: parsedData.recruiter_id,
      req_user_tz: parsedData.candidate_tz,
      session_ids: parsedData.session_ids,
      start_date_str: parsedData.start_date_str,
      end_date_str: parsedData.end_date_str,
    });

    const availabilities = cand_schedule.calendar_events;

    const slots = cand_schedule.findAvailabilitySlotsDateRange();
    return res.status(200).json({ slots, availabilities });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;
