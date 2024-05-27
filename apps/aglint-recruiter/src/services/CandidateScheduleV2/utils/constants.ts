import { APIOptions } from '@aglint/shared-types';

export const DEFAULT_API_OPTIONS: APIOptions = {
  include_free_time: true,
  make_training_optional: true,
  use_recruiting_blocks: true,
  check_next_minutes: 30,
  include_conflicting_slots: {
    show_soft_conflicts: true,
    show_conflicts_events: true,
    interviewers_load: false,
    interviewer_pause: false,
    out_of_office: false,
    calender_not_connected: false,
    day_off: false,
    holiday: false,
    override_working_hours: null,
  },
};
