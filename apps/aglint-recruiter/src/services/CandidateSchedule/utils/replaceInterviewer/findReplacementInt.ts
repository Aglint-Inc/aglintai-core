'use server';
import { CApiError, dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { type z } from 'zod';

import { type schemaFindAlternativeSlots } from '@/routers/scheduling/v1/findReplacementInts/schema';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import { CandidatesScheduling } from '../../CandidatesScheduling';

// TODO: when added more 20C4 to the it fails
export const findReplacementIntsUtil = async (
  input: z.output<typeof schemaFindAlternativeSlots>,
) => {
  const { meeting_detail, meeting_ints, module_rec, candidate_tz } =
    await fetchDetails(input);
  const current_confirmed_ints = meeting_ints
    .filter((int) => int.is_confirmed)
    .map((int) => int.user_id);
  const declined_int = meeting_ints.find(
    (int) =>
      int.is_confirmed &&
      int.session_relation_id === input.declined_int_sesn_reln_id,
  );
  if (!declined_int) {
    throw new CApiError(
      'SERVER_ERROR',
      `${input.declined_int_sesn_reln_id} is not confirmed interviwer`,
    );
  }
  const cand_schedule = new CandidatesScheduling({
    return_empty_slots_err: true,
    include_conflicting_slots: {
      day_off: true,
      holiday: true,
      interviewer_pause: true,
      interviewers_load: true,
      out_of_office: true,
      out_of_working_hrs: true,
      show_soft_conflicts: true,
      show_conflicts_events: true,
      calender_not_connected: false,
      day_passed: true,
    },
  });

  await cand_schedule.fetchDetails({
    params: {
      company_id: module_rec.recruiter_id,
      session_ids: [input.session_id],
      req_user_tz: candidate_tz,

      end_date_str: dayjsLocal(meeting_detail.start_time)
        .tz(candidate_tz)
        .format('DD/MM/YYYY'),
      start_date_str: dayjsLocal(meeting_detail.start_time)
        .tz(candidate_tz)
        .format('DD/MM/YYYY'),
    },
    include_all_module_ints: true,
  });

  cand_schedule.ignoreTrainee();
  const replacement_ints = cand_schedule.findSlotAlternativeInts({
    slot_details: {
      start_time: meeting_detail.start_time as string,
      end_time: meeting_detail.end_time as string,
    },
    curr_day_js: dayjsLocal(meeting_detail.start_time).tz(candidate_tz),
    curr_day_str: dayjsLocal(meeting_detail.start_time)
      .tz(candidate_tz)
      .startOf('day')
      .format(),
    declined_int_user_id: declined_int.user_id as string,
    confirmed_int_user_ids: current_confirmed_ints,
  });

  return replacement_ints;
};

const fetchDetails = async (
  parsed_body: z.output<typeof schemaFindAlternativeSlots>,
) => {
  const db = getSupabaseServer();
  const meeting_detail = supabaseWrap(
    await db
      .from('meeting_details')
      .select()
      .eq('session_id', parsed_body.session_id)
      .single(),
  );
  if (!meeting_detail.module_id) {
    throw new CApiError('SERVER_ERROR', 'No schedule request found');
  }
  if (!meeting_detail.confirmed_candidate_tz) {
    throw new CApiError('SERVER_ERROR', 'No candidate timezone found');
  }
  if (meeting_detail.start_time === null) {
    throw new CApiError('SERVER_ERROR', 'No start time found');
  }
  const meeting_ints = supabaseWrap(
    await db
      .from('meeting_interviewers')
      .select()
      .eq('session_id', parsed_body.session_id),
  );
  const module_rec = supabaseWrap(
    await db
      .from('interview_module')
      .select()
      .eq('id', meeting_detail.module_id)
      .single(),
  );
  return {
    meeting_detail,
    meeting_ints,
    module_rec,
    candidate_tz: meeting_detail.confirmed_candidate_tz,
  };
};
