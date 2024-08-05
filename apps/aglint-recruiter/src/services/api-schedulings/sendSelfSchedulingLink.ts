import {
  CandReqSlotsType,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { mailSender } from '@/src/utils/mailSender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const sendSelfSchedulingLinkFunc = async ({
  cand_picked_slots,
  end_date_str,
  organizer_id,
  request_id,
  schedule_id,
  session_ids,
  start_date_str,
}: {
  cand_picked_slots: CandReqSlotsType[];
  schedule_id: string;
  organizer_id: string;
  start_date_str: string;
  end_date_str: string;
  session_ids;
  request_id;
}) => {
  let no_conf_slots: PlanCombinationRespType[] = [];
  cand_picked_slots.forEach((curr_round) => {
    curr_round.selected_dates.forEach((curr_date) => {
      const filtered_plans = curr_date.plans.filter((plan) =>
        plan.sessions.every((s) => s.ints_conflicts.length === 0),
      );
      no_conf_slots = [...no_conf_slots, ...filtered_plans];
    });
  });
  const [filter_rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        schedule_id,
        filter_json: {
          start_date: start_date_str,
          end_date: end_date_str,
        },
        selected_options: [...no_conf_slots],
        session_ids: session_ids,
        is_flow_agent: true,
        request_id,
      })
      .select(),
  );

  await mailSender({
    target_api: 'sendSelfScheduleRequest_email_applicant',
    payload: {
      filter_json_id: filter_rec.id,
      organizer_id,
    },
  });
};
