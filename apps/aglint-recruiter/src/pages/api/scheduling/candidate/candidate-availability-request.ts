/* eslint-disable security/detect-object-injection */
import { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import axios, { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { getOrganizerId } from '@/src/utils/scheduling/getOrganizerId';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { candidate_avail_request_schema } from '../../../../../../../packages/shared-utils/src/scheduling/apiSchemas';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const req_body = req.body;
  try {
    const {
      application_id,
      availability,
      date_range,
      is_task_created,
      number_of_days,
      number_of_slots,
      recruiter_id,
      session_ids,
    } = v.parse(candidate_avail_request_schema, req_body);
    const organizer_id = await getOrganizerId(application_id, supabaseAdmin);
    const app_session_ids = await getAppSessionIds(
      application_id,
      organizer_id,
      session_ids,
    );
    const [avail_req] = supabaseWrap(
      await supabaseAdmin
        .from('candidate_request_availability')
        .insert({
          application_id,
          recruiter_id,
          is_task_created,
          number_of_days,
          number_of_slots,
          date_range: [date_range.start_date, date_range.end_date],
          total_slots: null,
          availability: {
            day_offs: availability.day_offs,
            free_keywords: availability.free_keywords,
            outside_work_hours: availability.outside_work_hours,
            recruiting_block_keywords: availability.recruiting_block_keywords,
          },
        })
        .select(),
    );
    supabaseWrap(
      await supabaseAdmin.from('request_session_relation').insert(
        app_session_ids.map((s_id) => ({
          session_id: s_id,
          request_availability_id: avail_req.id,
        })),
      ),
    );
    const payload: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'] =
      {
        organizer_user_id: organizer_id,
        avail_req_id: avail_req.id,
      };
    await axios.post(
      `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/emails/sendAvailabilityRequest_email_applicant`,
      {
        ...payload,
      },
    );
    return res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    if (err instanceof AxiosError) {
      return res.status(500).json({
        type: 'MAIL_API',
        message: err.message,
      });
    }
    return res.status(500).json({
      type: 'API_FAIL',
      message: err.message,
    });
  }
};

export default handler;

type CloneSessionsType = {
  app_session_ids: string[];
  job_session_ids: string[];
};

const getAppSessionIds = async (
  application_id,
  organizer_id,
  session_ids: string[],
) => {
  const cloned_data = supabaseWrap(
    await supabaseAdmin.rpc('clone_sessions', {
      app_id: application_id,
      organizer_user_id: organizer_id,
    }),
  ) as CloneSessionsType;
  let app_session_ids: string[] = [];
  if (session_ids.find((s_id) => cloned_data.job_session_ids.includes(s_id))) {
    app_session_ids = session_ids.map((s_id) => {
      const idx = cloned_data.job_session_ids.findIndex(
        (j_s_id) => j_s_id === s_id,
      );
      return cloned_data.app_session_ids[idx];
    });
  } else if (
    session_ids.every((s_id) => cloned_data.app_session_ids.includes(s_id))
  ) {
    app_session_ids = [...session_ids];
  } else {
    throw new Error(
      'one of the session id does not match application session id',
    );
  }

  return app_session_ids;
};
