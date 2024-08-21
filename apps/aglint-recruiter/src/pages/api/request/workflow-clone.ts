import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { cloneWorkflows } from '@/src/utils/request/cloneWorkflows';
const payload_schema = v.object({
  request_id: v.string(),
  meeting_flow: v.nullish(
    v.picklist([
      'self_scheduling',
      'candidate_request',
      'debrief',
      'mail_agent',
      'phone_agent',
      'hybrid',
    ]),
  ),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { request_id, meeting_flow } = v.parse(payload_schema, req.body);
    await cloneWorkflows({
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
