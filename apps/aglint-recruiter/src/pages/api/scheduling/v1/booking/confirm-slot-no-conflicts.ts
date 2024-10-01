/* eslint-disable security/detect-object-injection */
import { SchemaConfirmSlotNoConflict } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import {
  CApiError,
  dayjsLocal,
  scheduling_options_schema,
} from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { confirmSlotNoConflict } from '@/services/CandidateScheduleV2/utils/bookingUtils/confirmSlotNoConflict';
import { fetchDBScheduleDetails } from '@/services/CandidateScheduleV2/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';

const confirmSlotNoConflicts = async (
  parsed: z.infer<typeof SchemaConfirmSlotNoConflict>,
) => {
  const schedule_db_details = await fetchDBScheduleDetails({
    cand_tz: parsed.cand_tz,
    filter_id: parsed.filter_id,
    selected_plan: [
      {
        start_time: parsed.selected_slot.slot_start_time,
        end_time: '',
      },
    ],
  });
  const zod_options = scheduling_options_schema.parse({
    include_conflicting_slots: {},
  });
  const selected_date = dayjsLocal(parsed.selected_slot.slot_start_time)
    .tz(parsed.cand_tz)
    .format('DD/MM/YYYY');
  const cand_schedule = new CandidatesSchedulingV2(zod_options);

  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: parsed.cand_tz,
      start_date_str: selected_date,
      end_date_str: selected_date,
      company_id: schedule_db_details.company.id,
      session_ids: schedule_db_details.session_ids,
    },
  });
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }

  const [first_day_slots] = cand_schedule.findCandSlotForTheDay();

  const curr_time_slots = first_day_slots.plans.filter((curr_day_slot) => {
    return (
      curr_day_slot.sessions[0].start_time ===
      parsed.selected_slot.slot_start_time
    );
  });
  await confirmSlotNoConflict(
    parsed,
    cand_schedule.db_details,
    curr_time_slots[0],
    schedule_db_details,
  );
};

export default createPageApiPostRoute(
  SchemaConfirmSlotNoConflict,
  confirmSlotNoConflicts,
);
