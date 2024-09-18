/* eslint-disable no-undef */
import { type DatabaseTable } from '@aglint/shared-types';

export type RequestLogsActionType = {
  type: DatabaseTable['request_progress']['event_type'];
  status: DatabaseTable['request_progress']['status'];
  progress: DatabaseTable['request_progress'][];
  action: null | (() => JSX.Element);
};
