/* eslint-disable no-console */
import { type APIWorkFlowCron } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { candAvailRecieved } from '@/services/request-workflows/avail-recieved';
import { onCandidateScheduleCancel } from '@/services/request-workflows/candidate-schedule-cancel';
import { oninterviewerDecline } from '@/services/request-workflows/interviewer-decline';
// import { oninterviewerDecline } from '@/services/request-workflows/interviewer-decline';
import { newScheduleRequest } from '@/services/request-workflows/new-schedule';
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
      await newScheduleRequest({
        ...meta,
        event_run_id: id,
      });
    } else if (meta.target_api.startsWith('onReceivingAvailReq')) {
      await candAvailRecieved({
        ...meta,
        event_run_id: id,
      } as any);
    } else if (meta.target_api.startsWith('onRequestCancel')) {
      await onCandidateScheduleCancel({
        ...meta,
        event_run_id: id,
      } as any);
    } else if (meta.target_api.startsWith('onRequestInterviewerDecline')) {
      await oninterviewerDecline({
        ...meta,
        event_run_id: id,
      } as any);
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

export const getResponseFactory = <T>(res: NextApiResponse) => {
  /**
   * Sends a response with the given data and error, or an error message if the status is 500.
   *
   * @param {Object} options - An object containing optional data and error properties.
   * @param {T} [options.data] - The data to be sent in the response.
   * @param {string} [options.error] - The error message to be sent in the response.
   * @param {number} [status] - The status code of the response. Defaults to 200 if no error, 500 otherwise.
   * @return {Promise<Response>} A Promise that resolves to the response object.
   */
  function getResponse(
    {
      data,
      error,
    }: {
      data?: T;
      error?: string;
    },
    status?: number,
  ) {
    status = status || (error ? 500 : 200);
    return res.status(status).send(status === 200 ? data : { error });
  }
  return getResponse;
};
