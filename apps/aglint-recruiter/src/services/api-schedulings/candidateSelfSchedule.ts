import { PlanCombinationRespType } from '@aglint/shared-types';
import {
  candidate_self_schedule_request,
  supabaseWrap,
} from '@aglint/shared-utils';
import * as v from 'valibot';

import { mailSender } from '@/src/utils/mailSender';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const candidateSelfSchedule = async (
  req_body: any,
  cloned_sessn_ids: string[],
  organizer_id: string,
  schedule_id: string,
  plans: PlanCombinationRespType[],
) => {
  const { date_range } = v.parse(candidate_self_schedule_request, req_body);

  const [filter_json] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .insert({
        session_ids: cloned_sessn_ids,
        schedule_id: schedule_id,
        filter_json: {
          start_date: date_range.start_date,
          end_date: date_range.end_date,
        },
        selected_options: [...plans],
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
