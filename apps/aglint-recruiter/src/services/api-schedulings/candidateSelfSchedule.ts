import {
  type CustomAgentInstructionPayload,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  CApiError,
  DAYJS_FORMATS,
  dayjsLocal,
  type ProgressLoggerType,
  supabaseWrap,
} from '@aglint/shared-utils';

import { mailSender } from '@/utils/mailSender';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

export const candidateSelfSchedule = async ({
  cloned_sessn_ids,
  end_date_str,
  organizer_id,
  plans,
  request_id,
  application_id,
  start_date_str,
  reqProgressLogger,
  mail_payload,
  agent_payload,
  req_assignee_tz,
}: {
  cloned_sessn_ids: string[];
  organizer_id: string;
  application_id: string;
  plans: PlanCombinationRespType[];
  start_date_str: string;
  end_date_str: string;
  request_id: string;
  reqProgressLogger: ProgressLoggerType;
  mail_payload: any;
  agent_payload: CustomAgentInstructionPayload['agent']['ai_response'];
  req_assignee_tz: string;
}) => {
  if (plans.length === 0) {
    throw new CApiError('CLIENT', 'No plans matched');
  }
  const candidate_slots = plans.slice(0, agent_payload.maxTotalSlots);
  const [filter_json] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        session_ids: cloned_sessn_ids,
        filter_json: {
          start_date: start_date_str,
          end_date: end_date_str,
        },
        selected_options: candidate_slots, //TODO: fix this later
        request_id: request_id,
        application_id,
      })
      .select(),
  );

  await mailSender({
    target_api: 'sendSelfScheduleRequest_email_applicant',
    payload: {
      application_id,
      is_preview: false,
      organizer_id,
      overridedMailSubBody: mail_payload,
      request_id,
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
    startDate:
      Number(agent_payload.candidateAvailability.prefferredDate.startDate) *
      1000,
    endDate:
      Number(agent_payload.candidateAvailability.prefferredDate.endDate) * 1000,
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
