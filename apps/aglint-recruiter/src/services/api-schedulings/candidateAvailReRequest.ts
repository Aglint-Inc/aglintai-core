/* eslint-disable security/detect-object-injection */
import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { candidate_avail_request_schema } from '@aglint/shared-utils/src/scheduling/apiSchemas';
import axios from 'axios';
import * as v from 'valibot';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const candidateAvailReRequest = async ({
  end_date_str,
  organizer_id,
  req_body,
  request_id,
  start_date_str,
  cloned_sessn_ids,
}: {
  req_body: any;
  organizer_id: string;
  cloned_sessn_ids: string[];
  start_date_str;
  end_date_str;
  request_id: string;
}) => {
  const {
    application_id,
    number_of_days,
    number_of_slots,
    recruiter_id,
    api_options,
  } = v.parse(candidate_avail_request_schema, req_body);

  const [cand_avail] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .insert({
        application_id,
        recruiter_id,
        number_of_days,
        number_of_slots,
        date_range: [start_date_str, end_date_str],
        request_id: request_id,
        visited: false,
        slots: null,
        availability: {
          day_offs: api_options.include_conflicting_slots.day_off,
          free_keywords: api_options.include_free_time,
          outside_work_hours:
            api_options.include_conflicting_slots.out_of_working_hrs,
          recruiting_block_keywords: api_options.use_recruiting_blocks,
        },
      })
      .select(),
  );
  supabaseWrap(
    await supabaseAdmin.from('request_session_relation').insert(
      cloned_sessn_ids.map((s) => ({
        session_id: s,
        request_availability_id: cand_avail.id,
      })),
    ),
  );

  const payload: EmailTemplateAPi<'availabilityReqResend_email_candidate'>['api_payload'] =
    {
      recruiter_user_id: organizer_id,
      avail_req_id: cand_avail.id,
    };
  await axios.post(
    `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/availabilityReqResend_email_candidate`,
    {
      ...payload,
    },
  );
};
