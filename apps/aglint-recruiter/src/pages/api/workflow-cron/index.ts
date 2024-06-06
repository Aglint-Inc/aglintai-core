import { APIWorkFlowCron } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getResponseFactory } from '@/src/utils/apiUtils/responseFactory';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log('req.method', req.method, req.body);
  const getResponse = getResponseFactory<APIWorkFlowCron['response']>(res);
  try {
    if (req.method !== 'POST')
      return getResponse({ error: 'Method not allowed' }, 405);
    const {
      workflow_id,
      workflow_action_id,
      execution_time,
      // payload,
      meta,
    } = req.body as APIWorkFlowCron['request'];
    if (!workflow_id || !workflow_action_id || !meta || !execution_time)
      return getResponse(
        { error: 'Invalid request. Required props missing.' },
        401,
      );
    switch (meta.email_type) {
      case 'self_schedule_request_reminder': {
        if (meta.application_id) {
          axios.post(
            process.env.NEXT_PUBLIC_MAIL_HOST +
              '/api/upcoming_interview_reminder_candidate',
            {
              recipient_email: 'ravi@aglinthq.com',
            },
          );
        }
      }
    }
    return getResponse({ data: { success: true } });
  } catch (error) {
    return getResponse({ error: error.message }, 500);
  }
};

export default handler;
