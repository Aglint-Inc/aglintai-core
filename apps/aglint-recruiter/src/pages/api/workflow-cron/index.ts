import { APIWorkFlowCron } from '@aglint/shared-types';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req.body as APIWorkFlowCron;
    return res.status(200).send('ok');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default handler;
