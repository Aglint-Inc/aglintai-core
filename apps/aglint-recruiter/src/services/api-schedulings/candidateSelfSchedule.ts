import {
  type ActionPayloadType,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  type candidate_new_schedule_schema,
  CApiError,
  DAYJS_FORMATS,
  dayjsLocal,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';
import type * as v from 'valibot';

import { mailSender } from '@/utils/mailSender';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

import { findPlanCombs } from './findPlanCombs';
import { selfScheduleLinkInstruction } from './textTransforms/selfScheduleLinkInstruction';

export const candidateSelfSchedule = async ({
  parsed_body,
  date_range,
  reqProgressLogger,
  job_payload,
  req_assignee_tz,
  organizer_id,
}: {
  parsed_body: v.InferInput<typeof candidate_new_schedule_schema>;
  date_range: {
    start_date_str: string;
    end_date_str: string;
  };
  reqProgressLogger: ProgressLoggerType;
  job_payload: ActionPayloadType['agent_instruction'];
  req_assignee_tz: string;
  organizer_id: string;
}) => {
  const formatted_ai_reponse = await selfScheduleLinkInstruction({
    instruction: job_payload.agent.instruction,
    user_tz: req_assignee_tz,
    default_preferred_dates: {
      startDate: date_range.start_date_str,
      endDate: date_range.end_date_str,
    },
  });

  const planCombs = await findPlanCombs({
    date_range: date_range,
    recruiter_id: parsed_body.recruiter_id,
    session_ids: parsed_body.session_ids,
    reqProgressLogger,
    time_zone: req_assignee_tz,
    agent_instruction: job_payload.agent.instruction,
    schedule_filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours: formatted_ai_reponse.include_outside_working_hours,
      isSoftConflicts: formatted_ai_reponse.includeAllSoftConflictSlots,
      preferredTimeRanges: [
        {
          startTime:
            formatted_ai_reponse.candidateAvailability.prefferredTime.startTime,
          endTime:
            formatted_ai_reponse.candidateAvailability.prefferredTime.endTime,
        },
      ], //this is not date but time
      preferredInterviewers: [],
      isWorkLoad: true,
    },
  });

  if (planCombs.length === 0) {
    throw new CApiError('CLIENT', 'No plans matched');
  }
  const date_filtered_slots = getPrefferredDateSlots(
    planCombs,
    {
      startDate:
        formatted_ai_reponse.candidateAvailability.preferredDates.startDate,
      endDate:
        formatted_ai_reponse.candidateAvailability.preferredDates.endDate,
    },
    req_assignee_tz,
  );
  if (date_filtered_slots.length === 0) {
    throw new CApiError('CLIENT', 'No plans matched for given preferred dates');
  }
  const candidate_slots = getNSlots(
    date_filtered_slots,
    formatted_ai_reponse.maxTotalSlots,
  );
  const [filter_json] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        session_ids: parsed_body.session_ids,
        filter_json: {
          start_date: date_range.start_date_str,
          end_date: date_range.end_date_str,
        },
        selected_options: candidate_slots, //TODO: fix this later
        request_id: parsed_body.request_id,
        application_id: parsed_body.application_id,
      })
      .select(),
  );

  await mailSender({
    target_api: 'sendSelfScheduleRequest_email_applicant',
    payload: {
      application_id: parsed_body.application_id,
      is_preview: false,
      organizer_id: organizer_id,
      overridedMailSubBody: job_payload.email,
      request_id: parsed_body.request_id,
    },
  });

  const slots: Record<string, number> = {};
  candidate_slots.forEach((plan) => {
    const starting_sesn = plan.sessions[0].start_time;
    if (!slots[starting_sesn]) {
      slots[starting_sesn] = 1;
    }
  });
  const total_slots = Object.values(slots).reduce((acc, val) => acc + val, 0);
  let prog_log = '';
  const cand_avail_date = {
    startDate: candidate_slots[0].sessions[0].start_time,
    endDate: candidate_slots[candidate_slots.length - 1].sessions[0].start_time,
  };

  if (cand_avail_date.startDate !== cand_avail_date.endDate) {
    prog_log = `Sent total ${total_slots} slots to the candidate from ${dayjsLocal(cand_avail_date.startDate).tz(req_assignee_tz).format(DAYJS_FORMATS.DATE_FORMAT)} - ${dayjsLocal(cand_avail_date.endDate).tz(req_assignee_tz).format(DAYJS_FORMATS.DATE_FORMATZ)}`;
  } else {
    prog_log = `Sent total ${total_slots} slots to the candidate on ${dayjsLocal(cand_avail_date.startDate).tz(req_assignee_tz).format(DAYJS_FORMATS.DATE_FORMATZ)}`;
  }

  await reqProgressLogger({
    log: prog_log,
    status: 'completed',
    is_progress_step: true,
  });
  await reqProgressLogger({
    is_progress_step: true,
    status: 'completed',
    meta: {
      filter_json_id: filter_json.id,
    },
  });
};

const getNSlots = (
  slots: PlanCombinationRespType[],
  slot_cnt: number,
): PlanCombinationRespType[] => {
  const slot_time = new Set<string>();
  let added_slots_cnt = 0;
  const filtered_slots: PlanCombinationRespType[] = [];

  for (const curr_slot of slots) {
    if (added_slots_cnt >= slot_cnt) {
      break;
    }
    if (!slot_time.has(curr_slot.sessions[0].start_time)) {
      slot_time.add(curr_slot.sessions[0].start_time);
      filtered_slots.push(curr_slot);
      added_slots_cnt++;
    }
  }
  return filtered_slots;
};

// supports only single round
const getPrefferredDateSlots = (
  slots: PlanCombinationRespType[],
  preferred_dates: {
    startDate: string;
    endDate: string;
  },
  tz: string,
): PlanCombinationRespType[] => {
  const preferred_dates_dayjs = {
    startDate: dayjsLocal(preferred_dates.startDate).tz(tz),
    endDate: dayjsLocal(preferred_dates.endDate).tz(tz),
  };
  const filtered_slots: PlanCombinationRespType[] = slots.filter((slot) => {
    return (
      dayjsLocal(slot.sessions[0].start_time)
        .tz(tz)
        .isSameOrAfter(preferred_dates_dayjs.startDate, 'date') &&
      dayjsLocal(slot.sessions[0].start_time)
        .tz(tz)
        .isSameOrBefore(preferred_dates_dayjs.endDate, 'date')
    );
  });
  return filtered_slots;
};
