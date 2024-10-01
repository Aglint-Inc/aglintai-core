/* eslint-disable no-console */
import { type APIWorkFlowCron } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { getResponseFactory } from '@/utils/apiUtils/responseFactory';
import { mailSender } from '@/utils/mailSender';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseAdmin = getSupabaseServer();
  console.log('incoming body', req.body);
  const getResponse = getResponseFactory<APIWorkFlowCron['response']>(res);
  const { id, workflow_id, workflow_action_id, execution_time, meta } =
    req.body as APIWorkFlowCron['request'];
  if (req.method !== 'POST')
    return getResponse({ error: 'Method not allowed' }, 405);
  try {
    if (!workflow_id || !workflow_action_id || !meta || !execution_time) {
      return getResponse(
        { error: 'Invalid request. Required props missing.' },
        401,
      );
    }
    if (meta.target_api.split('_').find((s) => s === 'email')) {
      await mailSender({
        target_api: meta.target_api,
        payload: {
          ...meta,
        },
      });
    } else if (meta.target_api.split('_').find((s) => s === 'slack')) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/slack/${meta.target_api}`,
        {
          ...meta,
        },
      );
    } else if (
      meta.target_api.startsWith('onRequestSchedule') ||
      meta.target_api.startsWith('onRequestReschedule')
    ) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/agent-workflow/new-schedule`,
        {
          ...meta,
          event_run_id: id,
        },
      );
    } else if (meta.target_api.startsWith('onReceivingAvailReq')) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/agent-workflow/cand-avail-recieved`,
        {
          ...meta,
          event_run_id: id,
        },
      );
    } else if (meta.target_api.startsWith('onRequestCancel')) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/agent-workflow/cancel-schedule`,
        {
          ...meta,
          event_run_id: id,
        },
      );
    } else if (meta.target_api.startsWith('onRequestInterviewerDecline')) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/agent-workflow/interviewer-decline`,
        {
          ...meta,
          event_run_id: id,
        },
      );
    }
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'success', completed_at: dayjsLocal().toISOString() })
      .eq('id', id)
      .throwOnError();
    return res.status(200).send('OK');
  } catch (error: any) {
    console.error(error.message);
    console.error('Error stack', error.stack);
    await supabaseAdmin
      .from('workflow_action_logs')
      .update({ status: 'failed' })
      .eq('id', id)
      .throwOnError();
    return res.status(500).send(error.message);
  }
};

export default handler;
