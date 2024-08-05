import { EventNodeType, EventStatusType } from '../../workflow';
import type { TableType } from './index.types';

export type CustomSchedulingEventLogs = TableType<
  'scheduling_event_logs',
  {
    status: EventStatusType;
    event_type: EventNodeType;
  }
>;
