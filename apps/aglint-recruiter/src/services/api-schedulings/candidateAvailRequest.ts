/* eslint-disable security/detect-object-injection */
import { type TargetApiPayloadType } from '@aglint/shared-types';
import { type ProgressLoggerType, supabaseWrap } from '@aglint/shared-utils';
import { candidate_avail_request_schema } from '@aglint/shared-utils/src/scheduling/apiSchemas';

import { mailSender } from '@/utils/mailSender';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

export const candidateAvailRequest = async ({
  cloned_sessn_ids,
  end_date_str,
  organizer_id,
  req_body,
  request_id,
  start_date_str,
  reqProgressLogger,
  mail_payload,
}: {
  req_body: any;
  organizer_id: string;
  cloned_sessn_ids: string[];
  start_date_str;
  end_date_str;
  request_id: string;
  reqProgressLogger: ProgressLoggerType;
  mail_payload: any;
}) => {
  const { application_id, number_of_days, number_of_slots, recruiter_id } =
    candidate_avail_request_schema.parse(req_body);

  supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .delete()
      .eq('request_id', request_id),
  );
  const [avail_req] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .insert({
        application_id,
        recruiter_id,
        is_task_created: false,
        number_of_days,
        number_of_slots,
        date_range: [start_date_str, end_date_str],
        total_slots: null,
        availability: {
          day_offs: true,
          free_keywords: true,
          outside_work_hours: true,
          recruiting_block_keywords: true,
        },
        request_id: request_id,
      })
      .select(),
  );
  supabaseWrap(
    await supabaseAdmin.from('request_session_relation').insert(
      cloned_sessn_ids.map((s_id) => ({
        session_id: s_id,
        request_availability_id: avail_req.id,
      })),
    ),
  );

  const payload: TargetApiPayloadType<'sendAvailabilityRequest_email_applicant'> =
    {
      organizer_user_id: organizer_id,
      avail_req_id: avail_req.id,
      overridedMailSubBody: mail_payload,
    };

  await mailSender({
    target_api: 'sendAvailabilityRequest_email_applicant',
    payload: {
      ...payload,
    },
  });

  await reqProgressLogger({
    is_progress_step: true,
    meta: {
      avail_req_id: avail_req.id,
    },
    status: 'completed',
  });
};
