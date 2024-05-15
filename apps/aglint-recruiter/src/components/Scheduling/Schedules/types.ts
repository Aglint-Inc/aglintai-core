import { ReactNode } from 'react';

export type FilterOptionsType = {
  name:
    | 'status'
    | 'member'
    | 'candidate'
    | 'date_range'
    | 'schedule_type'
    | 'job'
  Icon: ReactNode;
};
