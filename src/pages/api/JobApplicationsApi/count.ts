/* eslint-disable security/detect-object-injection */
import { NextApiRequest, NextApiResponse } from 'next';

import {
  getJobApplicationCount,
  GetJobApplicationCountResponse,
} from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CountJobApplicationApi['response']>,
) => {
  const { inputData } = req.body as CountJobApplicationApi['request'];
  const result = await getJobApplicationCount(inputData);
  res.status(200).send(result);
};

export default handler;

export type CountJobApplicationApi = {
  request: { inputData: string[] };
  response: GetJobApplicationCountResponse;
};
