import {
  InterviewMeetingTypeDb,
  InterviewSessionTypeDB,
  SessionsCombType,
  schedulingSettingType,
} from '@aglint/shared-types';
import {z} from 'zod';

export const schedule_req_body = z.object({
  begin_sentence_template: z.string().min(1),
  interviewer_name: z.string().min(1),
  to_phone_no: z.string().min(1),
  filter_json_id: z.string().min(1),
  phone_agent_type: z
    .enum(['scheduling', 'phone_screening'])
    .default('scheduling'),
  task_id: z.string().nullable(),
});

export type ScheduleTool =
  | 'schedule-interterview'
  | 'find-interview-slots'
  | 'end-call'
  | 'cancel-scheduled-interview'
  | 'apply-to-job'
  | 'schedule-call'
  | 'find-time-zone';

type AllMeetingStatus = 'waiting' | 'confirmed' | 'cancelled';
export type CandidateInfoType = {
  begin_message: string;
  job_id: string;
  company_id: string;
  schedule_id: string;
  company_logo: string;
  job_title: string;
  candidate_name: string;
  filter_json: {
    end_date: string;
    start_date: string;
    session_ids: string[];
    recruiter_id: string;
  };
  req_payload: z.infer<typeof schedule_req_body>;
  company_name: string;
  interview_sessions: InterviewSessionTypeDB[];
  interview_meetings: InterviewMeetingTypeDb[];
  job_description: string;
  application_id: string;
  inter_dur_days: number;
  candidate_id: string;
  comp_scheduling_setting: schedulingSettingType;
  all_slots: SessionsCombType[][][];
  // updates
  tool_invocations: ScheduleTool[];
  // updates
  candidate_tz: {
    tz_code: string;
    tz_label: string;
  };
  //
  cand_selected_slot: string;
  schedule_status: AllMeetingStatus;
};

// API payloads response types

export type FindSlots = {
  session_ids: string[];
  recruiter_id: string;
  start_date: string;
  end_date: string;
  user_tz: string;
};
