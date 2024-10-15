import { type DatabaseEnums } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import { apiTargetToEvents } from '@request/components/RequestProgress/utils/progressMaps';

import { changeInterviewer } from '@/services/request-workflows/interviewer-decline/change-interviewer';

type BodyParams = {
  request_id: string;
  session_ids: string[];
  event_run_id: number;
  target_api: DatabaseEnums['email_slack_types'];
};

export const oninterviewerDecline = async (req_body: BodyParams) => {
  const target_api = req_body.target_api as keyof typeof apiTargetToEvents;
  if (!apiTargetToEvents[target_api]) {
    throw new CApiError('SERVER_ERROR', 'eventAction not found');
  }

  const { request_id, session_ids } = req_body;

  if (target_api === 'onRequestInterviewerDecline_agent_changeInterviewer') {
    await changeInterviewer({
      request_id,
      session_id: session_ids[0],
    });
  }
};
