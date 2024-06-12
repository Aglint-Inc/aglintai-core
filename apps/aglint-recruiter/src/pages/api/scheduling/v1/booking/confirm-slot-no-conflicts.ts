/* eslint-disable security/detect-object-injection */
import { schema_confirm_slot_no_conflict } from '@aglint/shared-types/src/aglintApi/valibotSchema/candidate-self-schedule';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { confirmSlotNoConflict } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/confirmSlotNoConflict';
import { fetchDBScheduleDetails } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed = v.parse(schema_confirm_slot_no_conflict, req.body);
    const schedule_db_details = await fetchDBScheduleDetails(parsed.filter_id);
    const { filter_json_data } = schedule_db_details;
    const zod_options = scheduling_options_schema.parse({
      include_conflicting_slots: {},
    });
    const selected_date = userTzDayjs(parsed.selected_slot.slot_start_time)
      .tz(parsed.cand_tz)
      .format('DD/MM/YYYY');
    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: parsed.cand_tz,
        start_date_str: selected_date,
        end_date_str: selected_date,
        recruiter_id: filter_json_data.interview_schedule.recruiter_id,
        session_ids: filter_json_data.session_ids,
      },
      zod_options,
    );

    await cand_schedule.fetchDetails();

    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    const [first_day_slots] = cand_schedule.findCandSlotForTheDay();

    const curr_time_slots = first_day_slots.filter((curr_day_slot) => {
      return (
        curr_day_slot.sessions[0].start_time ===
        parsed.selected_slot.slot_start_time
      );
    });
    await confirmSlotNoConflict(
      parsed,
      cand_schedule,
      curr_time_slots[0],
      schedule_db_details,
    );
    return res.status(200).json('ok');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};
export default handler;
