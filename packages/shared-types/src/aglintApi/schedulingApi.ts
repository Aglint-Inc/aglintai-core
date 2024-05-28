import { RecruiterUserType } from '../data.types';

export type ApiCancelScheduledInterview = {
  session_ids: string[];
  cand_email: string;
};

export type APICandidateConfirmSlot = {
  candidate_plan: {
    sessions: {
      session_id: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
  recruiter_id: string;
  user_tz: string;
  schedule_id: string;
  filter_id?: string;
  //  if tasks id is present
  agent_type: 'email' | 'phone' | 'self';
  task_id: string | null;
  candidate_email?: string;
  candidate_name?: string;
  candidate_id?: string;
  is_debreif?: boolean;
};

export type APIEventAttendeeStatus = {
  event_id: string;
  attendee_interv_id: string;
};

export type APIFindAltenativeTimeSlot = {
  session_id: string;
  recruiter_id: string;
  slot_start_time: string;
  user_tz: string;
  replacement_ints: string[];
};

export type APIUpdateMeetingInterviewers = {
  meeting_id: string;
  replaced_inters: Pick<RecruiterUserType, 'email' | 'user_id'>[];
  candidate_email: string;
};

export type APIFindAltenativeTimeSlotResponse = {
  user_id: string;
  is_exist: boolean;
}[];

export type APICandScheduleMailThankYou = {
  filter_id: string;
  cand_tz: string;
};

export type APIOptions = {
  use_recruiting_blocks: boolean;
  include_free_time: boolean;
  check_next_minutes: number;
  make_training_optional: boolean;
  include_conflicting_slots: {
    show_soft_conflicts: boolean;
    show_conflicts_events: boolean;
    interviewers_load: boolean;
    interviewer_pause: boolean;
    out_of_office: boolean;
    calender_not_connected: boolean;
    override_work_hr_start: number | null;
    override_work_hr_end: number | null;
    day_off: boolean;
    holiday: boolean;
  };
};

export type APIFindAvailability = {
  session_ids: string[];
  recruiter_id: string;
  start_date_str: string;
  end_date_str: string;
  candidate_tz: string;
  options?: APIOptions;
};

export type APIFindInterviewSlot = {
  session_ids: string[];
  recruiter_id: string;
  schedule_date: string;
  candidate_tz: string;
  options?: APIOptions;
};

export type APIFindSlotsDateRange = {
  session_ids: string[];
  recruiter_id: string;
  date_range_start: string;
  date_range_end: string;
  candidate_tz: string;
  options?: APIOptions;
};
