import { type RequestResponse } from '@/queries/requests/types';

export const requestTypes: {
  title: keyof RequestResponse;
  iconName: string;
}[] = [
  { title: 'schedule_request', iconName: 'calendar_add_on' },
  { title: 'reschedule_request', iconName: 'event_repeat' },
  { title: 'cancel_schedule_request', iconName: 'event_busy' },
  { title: 'decline_request', iconName: 'free_cancellation' },
];
