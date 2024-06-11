import { APIWorkFlowCron } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getResponseFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

//
// interviewStart_email_applicant
// interviewStart_email_interviewer
// interviewReminder_email_applicant
// interviewReminder_email_interviewer
// phoneScreenRemind_email_applicant --WIP
//

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (meta.email_type.split('_').find((s) => s === 'email')) {
      await axios.post(
        process.env.NEXT_PUBLIC_MAIL_HOST + `/api/${meta.email_type}`,
        {
          meta,
        },
      );
    } else {
      switch (meta.email_type) {
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
