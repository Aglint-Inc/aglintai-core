import { APIWorkFlowCron } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getResponseFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log('req.method', req.method, req.body);
  const getResponse = getResponseFactory<APIWorkFlowCron['response']>(res);
  const { id, workflow_id, workflow_action_id, execution_time, meta } =
    req.body as APIWorkFlowCron['request'];
  if (req.method !== 'POST')
    return getResponse({ error: 'Method not allowed' }, 405);
  try {
    if (!workflow_id || !workflow_action_id || !meta || !execution_time)
      return getResponse(
        { error: 'Invalid request. Required props missing.' },
        401,
      );
    switch (meta.email_type) {
      case 'self_schedule_request_reminder': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            '/api/self_schedule_request_reminder',
          {
            meta: meta,
          },
        );
        break;
      }
      case 'availability_request_reminder': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            '/api/availability_request_reminder',
          {
            meta: meta,
          },
        );
        break;
      }
      case 'upcoming_interview_reminder_candidate': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            '/api/upcoming_interview_reminder_candidate',
          {
            meta: meta,
          },
        );
        break;
      }
      case 'upcoming_interview_reminder_interviewers': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            '/api/upcoming_interview_reminder_interviewers',
          {
            meta: meta,
          },
        );
        break;
      }
      case 'slack_interview_reminder': {
        await axios.post(
          'https://apis-ta7r36xoza-wl.a.run.app/api/slack/interview-reminder',
          {
            session_id: meta.session_id,
          },
        );
        break;
      }
      case 'slack_interviewer_confirmation': {
        await axios.post(
          'https://apis-ta7r36xoza-wl.a.run.app/api/slack/notify-interview-confirmation',
          {
            session_id: meta.session_id,
          },
        );
        break;
      }
      case 'slack_interviewer_feedback': {
        await axios.post(
          'https://apis-ta7r36xoza-wl.a.run.app/api/slack/feedback',
          {
            session_id: meta.session_id,
          },
        );
      }
    }
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'success' })
      .eq('id', id)
      .throwOnError();
    return getResponse({ data: { success: true } });
  } catch (error) {
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'failed' })
      .eq('id', id)
      .throwOnError();
    return getResponse({ error: error.message }, 500);
  }
};

export default handler;
