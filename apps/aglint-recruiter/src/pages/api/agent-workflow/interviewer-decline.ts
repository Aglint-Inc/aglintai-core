import { DatabaseEnums } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  ProgressLoggerType,
} from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

import { changeInterviewer } from '@/src/services/api-schedulings/interviewer-decline/change-interviewer';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];
  let reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: req.body.request_id,
    supabaseAdmin: supabaseAdmin,
    event_run_id: req.body.event_run_id,
    target_api,
  });
  const {
    request_id,
    session_ids,
  }: {
    request_id: string;
    session_ids: string[];
  } = req.body;

  try {
    if (target_api === 'onRequestInterviewerDecline_agent_changeInterviewer') {
      await executeWorkflowAction(
        changeInterviewer,
        {
          request_id,
          session_id: session_ids[0],
          reqProgressLogger,
        },
        reqProgressLogger,
        {
          event_type: 'REPLACE_ALTERNATIVE_INTERVIEWER',
        },
      );
    }
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error.message);
    return res.status(400).send(error.message);
  }
};

export default handler;
