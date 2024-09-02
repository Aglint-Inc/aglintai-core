/* eslint-disable security/detect-object-injection */
import {
  type APICandScheduleMailThankYou,
  type EmailTemplateAPi,
} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { type ApiDebriefAddUsers } from './debrief-add-users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      session_ids,
      application_id,
      filter_id,
      availability_request_id,
      is_debreif,
    } = req.body as APICandScheduleMailThankYou;

    const { meeting_data } = await fetchSessionDetails(
      session_ids,
      application_id,
    );

    addScheduleActivity({
      title: `Booked ${meeting_data.map((ses) => ses.name).join(' , ')}`,
      application_id: application_id,
      logged_by: 'candidate',
      supabase: supabaseAdmin,
      created_by: null,
      metadata: {
        type: 'booking_confirmation',
        sessions: meeting_data,
        filter_id,
        availability_request_id,
        action: 'waiting',
      },
    });

    if (filter_id) {
      const payloadDebriefAddUsers: ApiDebriefAddUsers = {
        filter_id,
      };
      axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/application/debrief-add-users`,
        payloadDebriefAddUsers,
      );
      supabaseWrap(
        await supabaseAdmin
          .from('interview_filter_json')
          .update({
            confirmed_on: dayjsLocal().toISOString(),
          })
          .eq('id', filter_id),
      );
    }

    if (!is_debreif) {
      const payload: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'] =
        {
          availability_req_id: availability_request_id,
          application_id: application_id,
          session_ids: session_ids,
          filter_id: filter_id,
        };
      await axios.post(
        `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/confirmInterview_email_applicant`,
        { ...payload },
      );
    }

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

export const fetchSessionDetails = async (
  session_ids: string[],
  application_id: string,
) => {
  const meeting_data = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(id,start_time,end_time,status,cal_event_id,meeting_link),interview_session_relation(*,interview_module_relation(id,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
      )
      .in('id', session_ids),
  );
  const [application] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('id,candidates(id,first_name,last_name,email)')
      .eq('id', application_id),
  );
  return { meeting_data, candidate: application.candidates };
};
