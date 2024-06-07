import { APIWorkFlowCron, DatabaseEnums } from '@aglint/shared-types';
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
      case 'sendSelfScheduleRequest_email_applicant': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            getPath('sendSelfScheduleRequest_email_applicant'),
          {
            meta: meta,
          },
        );
        break;
      }
      case 'sendAvailabilityRequest_email_applicant': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            getPath('sendAvailabilityRequest_email_applicant'),
          {
            meta: meta,
          },
        );
        break;
      }
      case 'interviewStart_email_applicant': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            getPath('interviewEnd_slack_interviewers'),
          {
            meta: meta,
          },
        );
        break;
      }
      case 'interviewStart_email_interviewers': {
        await axios.post(
          process.env.NEXT_PUBLIC_MAIL_HOST +
            getPath('interviewStart_email_interviewers'),
          {
            meta: meta,
          },
        );
        break;
      }
      case 'interviewStart_slack_interviewers': {
        await axios.post(
          'https://apis-ta7r36xoza-wl.a.run.app/api/slack/interview-reminder',
          {
            session_id: meta.session_id,
          },
        );
        break;
      }
      case 'interviewerConfirmation_slack_interviewers': {
        await axios.post(
          'https://apis-ta7r36xoza-wl.a.run.app/api/slack/notify-interview-confirmation',
          {
            session_id: meta.session_id,
          },
        );
        break;
      }
      case 'interviewEnd_slack_interviewers': {
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

const getPath = <T extends DatabaseEnums['email_types']>(
  path: T,
): `/api/${T}` => {
  return `/api/${path}`;
};
