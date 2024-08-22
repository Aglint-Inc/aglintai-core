export type interviewersTab =
  | 'availability'
  | 'interview_load'
  | 'training'
  | 'metrics';

export type Event = {
  id: string;
  start: string;
  end: string;
  type:
    | 'soft'
    | 'ooo'
    | 'recruiting_blocks'
    | 'free_time'
    | 'cal_event'
    | 'empty_event';
};

export type GroupedEvents = {
  date: string;
  events: Event[];
};
