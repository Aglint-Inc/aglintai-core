import { NextApiRequest, NextApiResponse } from 'next';
import { cloneWorkflows } from '@/src/utils/request/cloneWorkflows';
import * as v from 'valibot';
const payload = v.object({
  job_id: v.string(),
  request_id: v.string(),
  //
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { job_id, request_id, meeting_flow } = req.body;
    await cloneWorkflows({
      job_id,
      request_id,
      meeting_flow,
    });
    return res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
}

// a6ad6f97-cdee-49f5-8ae5-42505b998523
