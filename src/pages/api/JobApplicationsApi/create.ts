/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import { upsertNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateJobApplicationApi['response']>,
) => {
  const { inputData } = req.body as CreateJobApplicationApi['request'];
  const { data, error } = await upsertNewJobApplicationDbAction([inputData]);
  res.status(200).send({ data: data[0], error });
};

export default handler;

export type CreateJobApplicationApi = {
  request: { inputData: Partial<JobApplication> };
  response: { data: JobApplication; error: PostgrestError };
};
