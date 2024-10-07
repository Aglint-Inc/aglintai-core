import type { DatabaseEnums } from '@aglint/shared-types';

export type PortalMessageType = 'selfSchedule' | 'availability';

export interface PortalPayload {
  application_id: string;
  availability_id?: string;
  filter_id?: string;
  type?: DatabaseEnums['email_slack_types'];
}
