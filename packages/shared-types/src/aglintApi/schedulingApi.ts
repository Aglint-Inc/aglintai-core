import * as v from 'valibot';
import { RecruiterUserType } from '../data.types';
import { PlanCombinationRespType, SessionCombinationRespType } from '../scheduleTypes';
import {
  schema_candidate_direct_booking,
  schema_confirm_slot_no_conflict,
} from './valibotSchema/candidate-self-schedule';
import {
  scheduling_options_schema,
  schema_candidate_req_availabale_slots,
  schema_find_availability_payload,
  schema_find_interview_slot,
  schema_find_slots_date_range,
} from '@aglint/shared-utils';

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

export type APIFindAltenativeTimeSlotResponse = SessionCombinationRespType[];

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

export type APIOptions = v.InferInput<typeof scheduling_options_schema>;

export type APIFindAvailability = v.InferInput<
  typeof schema_find_availability_payload
>;

export type APIFindInterviewSlot = v.InferInput<
  typeof schema_find_interview_slot
>;

export type APIFindSlotsDateRange = v.InferInput<
  typeof schema_find_slots_date_range
>;

export type CandReqAvailableSlots = v.InferInput<
  typeof schema_candidate_req_availabale_slots
>;

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

export type CurrRoundCandidateAvailReq = {
  curr_interview_day: string;
  slots: {
    start_time: string;
    end_time: string;
    is_slot_available: boolean;
  }[];
};
