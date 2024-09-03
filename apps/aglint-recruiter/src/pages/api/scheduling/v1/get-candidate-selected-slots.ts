import { schema_verify_interviewer_selected_slots } from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { fetchCandidateAvailability } from '@/src/services/CandidateScheduleV2/utils/fetchCandidateAvailability';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsedData = v.parse(schema_verify_interviewer_selected_slots, {
      ...req.body,
    });
    const {
      api_options,
      session_ids,
      candidate_selected_slots,
      start_date_str,
      end_date_str,
      recruiter_id,
    } = await fetchCandidateAvailability(parsedData.cand_availability_id);
    const cand_schedule = new CandidatesSchedulingV2(api_options);
    await cand_schedule.fetchDetails({
      company_id: recruiter_id,
      session_ids: session_ids,
      req_user_tz: parsedData.user_tz,
      start_date_str: start_date_str,
      end_date_str: end_date_str,
    });
    const all_combs = cand_schedule.getCandidateSelectedSlots(
      candidate_selected_slots,
    );

    return res
      .status(200)
      .send({
        slots: all_combs,
        availabilities: cand_schedule.calendar_events,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;
