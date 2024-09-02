import { type ReactNode } from 'react';

export type FilterOptionsType = {
  name:
    | 'status'
    | 'interviewer'
    | 'candidate'
    | 'date_range'
    | 'schedule_type'
    | 'job';
  Icon: ReactNode;
};
