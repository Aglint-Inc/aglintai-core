import { type ActionPayloadType } from '@aglint/shared-types';
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
import { selfScheduleLinkInstruction } from './utils/selfScheduleLinkInstruction';

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
    input: {
      instruction: job_payload.agent.instruction,
      user_tz: req_assignee_tz,
    },
  });

  const plans = await findPlanCombs({
    date_range: date_range,
    recruiter_id: parsed_body.recruiter_id,
    session_ids: parsed_body.session_ids,
    reqProgressLogger,
    time_zone: req_assignee_tz,
    schedule_filters: {
      isHardConflicts: false,
      isNoConflicts: true,
      isOutSideWorkHours: formatted_ai_reponse.include_outside_working_hours,
      isSoftConflicts: formatted_ai_reponse.includeAllSoftConflictSlots,
      preferredDateRanges: [
        {
          startTime:
            formatted_ai_reponse.candidateAvailability.prefferredTime.startTime,
          endTime:
            formatted_ai_reponse.candidateAvailability.prefferredTime.endTime,
        },
      ],
      preferredInterviewers: [],
      isWorkLoad: true,
    },
  });
  if (plans.length === 0) {
    throw new CApiError('CLIENT', 'No plans matched');
  }
  const candidate_slots = plans
    .slice(0, formatted_ai_reponse.maxTotalSlots)
    .sort((s1, s2) => {
      return dayjsLocal(s1.sessions[0].start_time).diff(
        dayjsLocal(s2.sessions[0].start_time),
      );
    });
  //
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
  //
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
