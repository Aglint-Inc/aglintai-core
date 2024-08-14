import { SchedulesSupabase } from '../../Scheduling/schedules-query';

export type Modes = 'list' | 'calendar';
export type Types = 'day' | 'week' | 'month';
export type colorType = { bg: string; pri: string } | null;
export type event = {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps: {
    data: SchedulesSupabase[number];
    color: colorType;
  };
};
