import { type DatabaseEnums } from '@aglint/shared-types';
import {
  type ProgressLoggerType,
  createRequestProgressLogger,
  executeWorkflowAction,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { apiTargetToEvents } from '@/components/Requests/RequestSections/RequestCard/RequestDetails/RequestProgress/utils/progressMaps';
import { changeInterviewer } from '@/services/api-schedulings/interviewer-decline/change-interviewer';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: req.body.request_id,
    supabaseAdmin: supabaseAdmin,
    event_run_id: req.body.event_run_id,
    event_type: apiTargetToEvents[target_api],
  });

  const {
    request_id,
    session_ids,
  }: {
    request_id: string;
    session_ids: string[];
  } = req.body;

  try {
    await reqProgressLogger.resetEventProgress();

    if (target_api === 'onRequestInterviewerDecline_agent_changeInterviewer') {
      await executeWorkflowAction(
        changeInterviewer,
        {
          request_id,
          session_id: session_ids[0],
          reqProgressLogger,
        },
        reqProgressLogger,
      );
    }
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    return res.status(400).send(error.message);
  }
};

export default handler;
