import { z } from 'zod';
import { PlanCombinationRespType } from '../scheduleTypes';
import {
  SchemaCandidateDirectBooking,
  SchemaConfirmSlotNoConflict,
} from './zodSchemas/candidate-self-schedule';
import {
  candidate_avail_request_schema,
  candidate_new_schedule_schema,
  candidate_self_schedule_request,
  createInterviewerRequestSchema,
  email_agent_self_schedule_schema,
  phone_agent_self_schedule_schema,
  scheduling_options_schema,
  schema_candidate_req_availabale_slots,
  schema_find_alternative_slots,
  schema_find_availability_payload,
  schema_find_interview_slot,
  schema_send_avail_req_link,
  schema_update_meeting_ints,
} from '@aglint/shared-utils';

export type ApiCancelScheduledInterview = {
  session_ids: string[];
  cand_email: string;
};

export type APIEventAttendeeStatus = {
  event_id: string;
  attendee_interv_id: string;
};

export type APIFindAltenativeTimeSlot = z.infer<
  typeof schema_find_alternative_slots
>;

export type APICandScheduleMailThankYou = {
  availability_request_id: string | null;
  cand_tz: string;
  session_ids: string[];
  application_id: string;
  is_debreif: boolean;
  filter_id: string | null;
  booking_request_from?: 'phone_agent' | 'email_agent' | 'candidate';
};
type t = typeof schema_find_availability_payload;

export type APIOptions = z.output<typeof scheduling_options_schema>;

export type APIFindAvailability = z.infer<
  typeof schema_find_availability_payload
>;
export type APISendAvailabilityRequestLink = z.infer<
  typeof schema_send_avail_req_link
>;
export type APIFindInterviewSlot = z.infer<typeof schema_find_interview_slot>;

export type APIFindSlotsDateRange = z.infer<
  typeof schema_find_availability_payload
>;

export type CandReqAvailableSlots = z.infer<
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
  interviewer_module_relation_id: string | null;
  session_id: string;
};
export type APIAssignTrainingInterviewerType = {
  training_ints: AssignTrainingInt[];
};

export type APIConfirmRecruiterSelectedOption = {
  selectedOption: PlanCombinationRespType;
  availability_req_id: string;
  user_tz: string;
  request_id: string;
};

export type CandidateDirectBookingType = z.infer<
  typeof SchemaCandidateDirectBooking
>;

export type APICandidateConfirmSlotNoConflict = z.infer<
  typeof SchemaConfirmSlotNoConflict
>;

export type APIScheduleDebreif = {
  selectedOption: PlanCombinationRespType;
  user_tz: string;
  session_id: string;
  options?: APIOptions;
  request_id: string;
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

export type APICandidateAvailableRequestType = z.infer<
  typeof candidate_avail_request_schema
>;

export type APICandidateSelfScheduleRequest = z.infer<
  typeof candidate_self_schedule_request
>;

export type APICandidateNewSchedule = z.infer<
  typeof candidate_new_schedule_schema
>;

export type APIPhoneAgent = z.infer<typeof phone_agent_self_schedule_schema>;

export type APIEmailAgentPayload = z.infer<
  typeof email_agent_self_schedule_schema
>;

export type APIUpdateMeetingInterviewers = z.infer<
  typeof schema_update_meeting_ints
>;

export type APICreateInterviewerRequest = z.infer<
  typeof createInterviewerRequestSchema
>;
