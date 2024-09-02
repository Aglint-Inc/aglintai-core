import { DatabaseEnums } from '@aglint/shared-types';
import { ReactNode } from 'react';

export type ProgressDataItem = {
  id: string;
  isDividerVisible: boolean;
  textRequestProgress: string;
  indicator: 'error' | 'success' | 'warning' | 'info';
  circleIndicator: 'error' | 'success' | 'warning' | 'info';
  slotIndicator: ReactNode | null;
  eventProgress: EventProgressItem[];
  addActionButton: boolean;
};
export type EventProgressItem = {
  eventType: string;
  api: DatabaseEnums['email_slack_types'];
  requestProgress:
    | {
        status: string | null;
      }
    | undefined;
  isManualFlow: boolean;
  handleClick: () => void;
};
