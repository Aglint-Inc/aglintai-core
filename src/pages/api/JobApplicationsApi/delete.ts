/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { deleteNewJobApplicationDbAction } from './utils';

export type DeleteJobApplicationApi = {
  request: { application_id: string };
  response: { data: boolean; error: PostgrestError };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { application_id } = req.body as DeleteJobApplicationApi['request'];
  if (!application_id)
    res.status(400).send({ data: null, error: { message: 'Invalid fields' } });
  const result = await deleteNewJobApplicationDbAction(application_id);
  res.status(200).send(result);
};

export default handler;
