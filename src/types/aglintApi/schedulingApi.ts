import { RecruiterUserType } from '../data.types';

export interface ApiFindAvailability {
  session_ids: string[];
  plan_id: string;
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
  is_debreif: boolean;
}

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
  task_id: string | null;
  agent_type: 'email' | 'phone' | 'self';
  candidate_email: string;
  candidate_name: string;
  candidate_id: string;
};

export type APIEventAttendeeStatus = {
  event_id: string;
  attendee_interv_id: string;
};

export type APIFindInterviewSlot = {
  session_ids: string[];
  recruiter_id: string;
  start_date: string;
  user_tz: string;
};

export type APIFindSlotsDateRange = {
  session_ids: string[];
  recruiter_id: string;
  date_range_start: string;
  date_range_end: string;
  user_tz: string;
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
