import { type SchedulesSupabase } from '../../../app/_common/utils/schedules-query';

export type Modes = 'list' | 'calendar';
export type Types = 'day' | 'week' | 'month';
type colorType = { bg: string; pri: string } | null;
export type EventFullCalender = {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  status:
    | 'completed'
    | 'cancelled'
    | 'waiting'
    | 'reschedule'
    | 'confirmed'
    | 'not_scheduled';
  borderColor: string;
  extendedProps: {
    data: SchedulesSupabase[number];
    color: colorType;
  };
};
