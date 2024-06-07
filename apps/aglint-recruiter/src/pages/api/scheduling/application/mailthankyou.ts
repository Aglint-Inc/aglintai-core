/* eslint-disable security/detect-object-injection */
import {
  APICandScheduleMailThankYou
} from '@aglint/shared-types';
import axios from 'axios';
import { has } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { addScheduleActivity } from '@/src/components/Scheduling/Candidates/queries/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const required_fields: (keyof APICandScheduleMailThankYou)[] = [
  'cand_tz',
  'session_ids',
];

interface TemplateApiPayload {
  session_ids: string[];
  application_id: string;
  schedule_id?: string;
  filter_id?: string;
  availability_request_id?: string;
  cand_tz: string;
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      cand_tz,
      session_ids,
      task_id,
      application_id,
      filter_id,
      availability_request_id,
      schedule_id,
    } = req.body as APICandScheduleMailThankYou;
    required_fields.forEach((field) => {
      if (!has(req.body, field)) {
        throw new Error(`missing Field ${field}`);
      }
    });

    const session_details = await fetchSessionDetails(session_ids);

    addScheduleActivity({
      title: `Booked ${session_details.map((ses) => ses.name).join(' , ')}`,
      application_id: application_id,
      logged_by: 'candidate',
      supabase: supabaseAdmin,
      created_by: null,
      task_id,
      metadata: {
        type: 'booking_confirmation',
        sessions: session_details,
        filter_id,
        availability_request_id,
        action: 'waiting',
      },
    });

    if (task_id) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/save_meeting_to_task`,
        {
          session_ids: session_ids,
          task_id: task_id,
        },
      );
    }

    const payload: TemplateApiPayload = {
      application_id,
      availability_request_id,
      filter_id,
      schedule_id,
      session_ids,
      cand_tz,
    };
    await axios.post(
      `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/candidate-invite-confirmation`,
      payload,
    );

    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
};

export default handler;

export const fetchSessionDetails = async (session_ids: string[]) => {
  const data = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(id,start_time,end_time,status,cal_event_id,meeting_link),interview_session_relation(*,interview_module_relation(id,recruiter_user(user_id,email,first_name,last_name,profile_image)))',
      )
      .in('id', session_ids),
  );
  return data;
};
