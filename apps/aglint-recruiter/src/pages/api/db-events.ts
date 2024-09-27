/* eslint-disable no-console */
import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { db_event_triggers } from '@/services/event-triggers/eventTriggers';

type BodyParams = {
  new_data: any;
  old_data: any;
  table_name: any;
  operation_type: 'UPDATE' | 'INSERT' | 'DELETE';
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const dbEvents = async (req_body: BodyParams) => {
  const payload = req_body as BodyParams;
  const trigger = `${payload.operation_type}_${payload.table_name}`;
  console.info(`executing `, trigger);
  const trigger_to_exec = db_event_triggers[trigger];
  if (trigger_to_exec) {
    await trigger_to_exec({ ...payload });
    console.info(`executed `, trigger);
  } else {
    console.error('Missing', payload.operation_type, payload.table_name);
  }
};

export default createPageApiPostRoute(null, dbEvents);
