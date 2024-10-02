import { dayjsLocal } from '@aglint/shared-utils';
import { z } from 'zod';

import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { fetchCandidateAvailability } from '@/services/CandidateSchedule/utils/fetchCandidateAvailability';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const schema = z.object({
  availability_id: z.string().uuid(),
});

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const { availability_id } = input;
  const user_tz = dayjsLocal.tz.guess();
  const {
    api_options,
    session_ids,
    candidate_selected_slots,
    start_date_str,
    end_date_str,
    recruiter_id,
  } = await fetchCandidateAvailability(availability_id);
  const cand_schedule = new CandidatesScheduling(api_options);
  await cand_schedule.fetchDetails({
    params: {
      company_id: recruiter_id,
      session_ids: session_ids,
      req_user_tz: user_tz,
      start_date_str: start_date_str,
      end_date_str: end_date_str,
    },
  });

  const all_combs = cand_schedule.getCandidateSelectedSlots(
    candidate_selected_slots,
  );

  return {
    slots: all_combs ?? [],
    availabilities: cand_schedule.calendar_events ?? [],
  };
};

export const availableSlots = privateProcedure.input(schema).query(query);
