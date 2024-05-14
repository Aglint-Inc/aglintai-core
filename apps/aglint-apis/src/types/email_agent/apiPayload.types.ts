import {
  InterviewMeetingTypeDb,
  InterviewSession,
} from '../aglint_types/data.types';
import {schedulingSettingType} from '../aglint_types/scheduleTypes/scheduleSetting';

export type EmailAgentPayload = {
  history: any[];
  payload: {
    candidate_name: string;
    candidate_email: string;
    company_name: string;
    job_role: string;
    start_date: string;
    end_date: string;
    new_cand_msg: string;
    application_id: string;
    job_id: string;
    company_id: string;
    schedule_id: string;
    company_logo: string;
    cand_application_status: string;
    candidate_time_zone: string | null;
    interv_plan_summary: string;
    interview_sessions: InterviewSession[];
    task_id: string;
    candidate_id: string;
    organizer_name: string;
    interview_meetings: InterviewMeetingTypeDb[];
    meeting_summary: string;
    job_description: string;
    comp_scheduling_setting: schedulingSettingType;
    filter_id: string;
    email_subject: string;
  };
};
