export type PortalMessageType = 'selfSchedule' | 'availability';

export type PortalPayload = {
  availability_id?: string;
  filter_id?: string;
  application_id: string;
};
