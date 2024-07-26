/* eslint-disable no-console */
import { APIWorkFlowCron } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { getResponseFactory } from '@/src/utils/apiUtils/responseFactory';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('incoming body', req.body);
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
    } else if (meta.email_type.split('_').find((s) => s === 'slack')) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/${meta.email_type}`,
        {
          ...meta,
        },
      );
    }

    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'success', completed_at: dayjsLocal().toISOString() })
      .eq('id', id)
      .throwOnError();
    return getResponse({ data: { success: true } });
  } catch (error) {
    console.error('error', error);
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'failed' })
      .eq('id', id)
      .throwOnError();
    return getResponse({ error: error.message }, 500);
  }
};

export default handler;
