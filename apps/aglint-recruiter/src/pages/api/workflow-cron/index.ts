import { APIWorkFlowCron } from '@aglint/shared-types';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getResponseFactory } from '@/src/utils/apiUtils/responseFactory';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const getResponse = getResponseFactory<APIWorkFlowCron['response']>(res);

  try {
    const {
      workflow_id,
      workflow_action_id,
      target,
      medium,
      trigger,
      execution_time,
      // payload,
      meta,
    } = req.body as APIWorkFlowCron['request'];
    if (
      !workflow_id ||
      !workflow_action_id ||
      !target ||
      !medium ||
      !trigger ||
      !meta ||
      !execution_time
    )
      return getResponse(
        { error: 'Invalid request. Required props missing.' },
        401,
      );
    switch (trigger) {
      case 'application_received': {
        if (meta.application_id) {
          axios.post('api/upcoming_interview_reminder_candidate', {
            recipient_email: 'chandan@aglinthq.com',
          });
        }
      }
    }
    return getResponse({ data: { success: true } });
  } catch (error) {
    return getResponse({ error: error.message }, 500);
  }
};

export default handler;
