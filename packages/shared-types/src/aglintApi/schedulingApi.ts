import * as v from 'valibot';
import { RecruiterUserType } from '../data.types';
import { PlanCombinationRespType } from '../scheduleTypes';
import {
  schema_candidate_direct_booking,
  schema_confirm_slot_no_conflict,
} from './valibotSchema/candidate-self-schedule';

export type ApiCancelScheduledInterview = {
  session_ids: string[];
  cand_email: string;
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
  ignore_interviewer: string;
  api_options?: APIOptions;
};

export type APIUpdateMeetingInterviewers = {
  meeting_id: string;
  replaced_inters: Pick<RecruiterUserType, 'email' | 'user_id'>[];
  candidate_email: string;
};

export type APIFindAltenativeTimeSlotResponse = PlanCombinationRespType[];

export type APICandScheduleMailThankYou = {
  availability_request_id?: string;
  cand_tz: string;
  task_id: string;
  session_ids: string[];
  application_id: string;
  is_debreif: boolean;
  schedule_id?: string;
  filter_id?: string;
  booking_request_from?: 'phone_agent' | 'email_agent' | 'candidate';
};

export type APIOptions = {
  use_recruiting_blocks?: boolean;
  include_free_time?: boolean;
  check_next_minutes?: number;
  make_training_optional?: boolean;
  cand_start_time?: number;
  cand_end_time?: number;
  include_conflicting_slots?: {
    show_soft_conflicts?: boolean;
    show_conflicts_events?: boolean;
    interviewers_load?: boolean;
    interviewer_pause?: boolean;
    out_of_office?: boolean;
    calender_not_connected?: boolean;
    day_off?: boolean;
    holiday?: boolean;
    out_of_working_hrs?: boolean;
    day_passed?: boolean;
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
  start_date_str: string;
  end_date_str: string;
  candidate_tz: string;
  options?: APIOptions;
};

export type CandReqAvailableSlots = {
  session_ids: string[];
  recruiter_id: string;
  date_range_start: string;
  date_range_end: string;
  candidate_tz: string;
  current_interview_day: number; // starts from 1
  options?: APIOptions;
};

export type APIGetCandidateSelectedSlots = {
  cand_availability_id: string;
};

export type APIVerifyRecruiterSelectedSlots = {
  candidate_tz: string;
  api_options?: APIOptions;
  filter_json_id: string;
};

export type AssignTrainingInt = {
  interviewer_module_relation_id: string;
  session_id: string;
};
export type APIAssignTrainingInterviewerType = {
  training_ints: AssignTrainingInt[];
};

export type APIConfirmRecruiterSelectedOption = {
  selectedOption: PlanCombinationRespType;
  availability_req_id: string;
  user_tz: string;
  task_id?: string;
};

export type CandidateDirectBookingType = v.InferOutput<
  typeof schema_candidate_direct_booking
>;

export type APICandidateConfirmSlotNoConflict = v.InferOutput<
  typeof schema_confirm_slot_no_conflict
>;

export type APIScheduleDebreif = {
  selectedOption: PlanCombinationRespType;
  schedule_id: string;
  user_tz: string;
  session_id: string;
  task_id?: string;
  options?: APIOptions;
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
