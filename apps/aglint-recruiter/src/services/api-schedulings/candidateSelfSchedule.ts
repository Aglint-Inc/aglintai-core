import { PlanCombinationRespType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { mailSender } from '@/src/utils/mailSender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const candidateSelfSchedule = async (
  req_body: any,
  cloned_sessn_ids: string[],
  organizer_id: string,
  schedule_id: string,
  plans: PlanCombinationRespType[],
  start_date_str: string,
  end_date_str: string,
  request_id: string,
) => {
  const [filter_json] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        session_ids: cloned_sessn_ids,
        schedule_id: schedule_id,
        filter_json: {
          start_date: start_date_str,
          end_date: end_date_str,
        },
        selected_options: [...plans],
        request_id: request_id,
      })
      .select(),
  );

  await mailSender({
    target_api: 'sendSelfScheduleRequest_email_applicant',
    payload: {
      filter_json_id: filter_json.id,
      organizer_id,
    },
  });
};
