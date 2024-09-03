import { type RequestResponse } from '@/src/queries/requests/types';

export type barChartDataType = {
  name: string;
  count: number;
  color: string;
};
export type requestCardDataType = {
  title: string;
  count: number;
  iconName: string;
};
export type progressDataType = {
  completed_request: number;
  open_request: number;
  completed_percentage: number;
  all_request: number;
};

export type responseCreatedCompletedType = {
  value: {
    data: {
      date: string;
      created: number;
      completed: number;
      on_going: number;
    }[];
  };
};

export type SectionRequests = {
  // eslint-disable-next-line no-unused-vars
  [id in keyof RequestResponse | 'standard_request']: number;
};
export const requestTypes: {
  title: keyof RequestResponse;
  iconName: string;
}[] = [
  { title: 'schedule_request', iconName: 'calendar_add_on' },
  { title: 'reschedule_request', iconName: 'event_repeat' },
  { title: 'cancel_schedule_request', iconName: 'event_busy' },
  { title: 'decline_request', iconName: 'free_cancellation' },
];
