import {
  APICreateInterviewerRequest,
  DatabaseEnums,
} from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

import { changeInterviewer } from '@/src/services/api-schedulings/interviewer-decline/change-interviewer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];

  const {
    declined_int_sesn_reln_id,
    session_id,
  }: {
    declined_int_sesn_reln_id: string;
    session_id: string;
  } = req.body;

  try {
    if (target_api === 'onInterviewerDecline_agent_changeInterviewer') {
      // await changeInterviewer({
      //   declined_int_sesn_reln_id,
      //   session_id,
      // });
    }
    return res.status(200).send('ok');
  } catch (error) {
    console.error(error.message);
    return res.status(400).send(error.message);
  }
};

export default handler;
