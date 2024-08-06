import { EventNodeType, EventStatusType } from '../../workflow';
import type { TableType } from './index.types';

export type CustomRequestProgress = TableType<
  'request_progress',
  {
    status: EventStatusType;
    event_type: EventNodeType;
    meta: {
      event_run_id: number;
      [key: string]: any;
    };
  }
>;
