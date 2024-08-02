import { DatabaseEnums } from '@aglint/shared-types';
import { addErrorHandlerWrap } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const target_api = req.body.target_api as DatabaseEnums['email_slack_types'];

  if (target_api === 'onReceivingAvailReq_agent_confirmSlot') {
    //
  } else if (
    target_api === 'onReceivingAvailReq_agent_sendSelfScheduleRequest'
  ) {
    //
  }
  return res.status(204).end();
};

export default addErrorHandlerWrap(handler);
