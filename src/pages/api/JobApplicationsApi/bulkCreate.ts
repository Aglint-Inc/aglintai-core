/* eslint-disable security/detect-object-injection */
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

import {
  JobApplication,
  NewJobApplications,
} from '@/src/context/JobApplicationsContext/types';

import { upsertNewJobApplicationDbAction } from './utils';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<BulkCreateJobApplicationApi['response']>,
) => {
  const { inputData } = req.body as BulkCreateJobApplicationApi['request'];
  const result = await upsertNewJobApplicationDbAction(inputData);
  res.status(200).send(result);
};

export default handler;

export type BulkCreateJobApplicationApi = {
  request: { inputData: Partial<JobApplication>[] };
  response: { data: NewJobApplications[]; error: PostgrestError };
};
