import { PlanCombinationRespType } from '@aglint/shared-types';
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
  cand_picked_slots: PlanCombinationRespType[];
  schedule_id: string;
  organizer_id: string;
  start_date_str: string;
  end_date_str: string;
  session_ids;
  request_id;
}) => {
  const [filter_rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        schedule_id,
        filter_json: {
          start_date: start_date_str,
          end_date: end_date_str,
        },
        selected_options: [...cand_picked_slots],
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
