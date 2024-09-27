import { type DatabaseEnums } from '@aglint/shared-types';
import {
  createRequestProgressLogger,
  executeWorkflowAction,
  type ProgressLoggerType,
} from '@aglint/shared-utils';
import { apiTargetToEvents } from '@requests/components/RequestProgress/utils/progressMaps';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
// import { apiTargetToEvents } from '@/components/Requests/_common/components/RequestProgress/utils/progressMaps';
import { changeInterviewer } from '@/services/api-schedulings/interviewer-decline/change-interviewer';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type BodyParams = {
  request_id: string;
  session_ids: string[];
  event_run_id: number;
  target_api: DatabaseEnums['email_slack_types'];
};

const interviewerDecline = async (req_body: BodyParams) => {
  const target_api = req_body.target_api as DatabaseEnums['email_slack_types'];
  const supabaseAdmin = getSupabaseServer();

  const reqProgressLogger: ProgressLoggerType = createRequestProgressLogger({
    request_id: req_body.request_id,
    supabaseAdmin: supabaseAdmin,
    event_run_id: req_body.event_run_id,
    event_type: apiTargetToEvents[target_api],
  });

  const { request_id, session_ids } = req_body;

  await reqProgressLogger.resetEventProgress();

  if (target_api === 'onRequestInterviewerDecline_agent_changeInterviewer') {
    await executeWorkflowAction(
      changeInterviewer,
      {
        request_id,
        session_id: session_ids[0],
        reqProgress: reqProgressLogger,
      },
      reqProgressLogger,
    );
  }
};

export default createPageApiPostRoute(null, interviewerDecline);
