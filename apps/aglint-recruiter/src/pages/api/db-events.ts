/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { db_event_triggers } from '@/src/services/event-triggers/eventTriggers';

type BodyParams = {
  new_data: any;
  old_data: any;
  table_name: any;
  operation_type: 'UPDATE' | 'INSERT' | 'DELETE';
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body as BodyParams;
  const trigger = `${payload.operation_type}_${payload.table_name}`;
  console.log(`executing `, trigger);
  try {
    const trigger_to_exec = db_event_triggers[trigger];
    if (trigger_to_exec) {
      await trigger_to_exec({ ...payload });
      console.log(`executed `, trigger);
    } else {
      console.error('Missing', payload.operation_type, payload.table_name);
    }
    return res.status(200).send('OK');
  } catch (err) {
    console.error(`Failed ${trigger}`, err.message);
    res.status(500).send(err.message);
  }
};
export default handler;
