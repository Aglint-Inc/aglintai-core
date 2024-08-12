import { ApiError, candidate_new_schedule_schema } from '@aglint/shared-utils';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import {
  createRequestProgressLogger,
  executeWorkflowAction,
  ProgressLoggerType,
} from '@/src/services/api-schedulings/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let reqProgressLogger: ProgressLoggerType = createRequestProgressLogger(
    req.body.request_id,
    req.body.event_run_id,
  );
  try {
    const { session_ids, target_api } = v.parse(
      candidate_new_schedule_schema,
      req.body,
    );

    if (target_api === 'onRequestCancel_agent_cancelEvents') {
      await await executeWorkflowAction(
        cancelInterviews,
        { session_ids },
        reqProgressLogger,
        { event_type: 'CANCEL_INTERVIEW_MEETINGS' },
      );
    }

    return res.status(200).send('OK');
  } catch (err) {
    if (err instanceof ApiError) {
      return res.status(500).json({
        type: err.type,
        message: err.message,
      });
    }
    return res.status(500).json({
      type: err.name,
      message: err.message,
    });
  }
};

export default handler;

const cancelInterviews = async ({ session_ids }: { session_ids: string[] }) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
    {
      session_ids,
    },
  );
};
