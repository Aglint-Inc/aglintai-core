import { DatabaseEnums } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { changeInterviewer } from '@/src/services/api-schedulings/interviewer-decline/change-interviewer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];

  const {
    request_id,
    session_ids,
  }: {
    request_id: string;
    session_ids: string[];
  } = req.body;

  try {
    if (target_api === 'onRequestInterviewerDecline_agent_changeInterviewer') {
      await changeInterviewer({
        request_id,
        session_id: session_ids[0],
      });
    }
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error.message);
    return res.status(400).send(error.message);
  }
};

export default handler;
