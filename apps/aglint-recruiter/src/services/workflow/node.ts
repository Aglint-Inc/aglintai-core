import { DatabaseTable } from '@aglint/shared-types';

type SchedulingEventLogs = DatabaseTable['request_progress'];

export class EventNode {
  public status: SchedulingEventLogs['status'];
  public event_type: SchedulingEventLogs['event_type'];
  public updated_at: string | null;
  public is_event_expected: boolean;
  public node_order: number;
  public progress: DatabaseTable['request_progress'][];
  constructor(
    status: SchedulingEventLogs['status'],
    type: SchedulingEventLogs['event_type'],
    is_event_expected = true,
    node_order = 1,
    updated_at?: string | null,
  ) {
    this.status = status;
    this.event_type = type;
    this.node_order = node_order;
    this.is_event_expected = is_event_expected;
    this.updated_at = updated_at ?? null;
    this.progress = [];
  }
}
