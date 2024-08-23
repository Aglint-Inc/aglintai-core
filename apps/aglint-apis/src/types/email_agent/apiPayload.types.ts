import {
  InterviewMeetingTypeDb,
  InterviewSession,
  schedulingSettingType,
} from '@aglint/shared-types';

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
    company_logo: string;
    cand_application_status: string;
    candidate_time_zone: string | null;
    interv_plan_summary: string;
    interview_sessions: InterviewSession[];
    task_id: string;
    candidate_id: string;
    organizer_name: string;
    organizer_timezone: string;
    interview_meetings: InterviewMeetingTypeDb[];
    meeting_summary: string;
    job_description: string;
    comp_scheduling_setting: schedulingSettingType;
    filter_id: string;
    email_subject: string;
    agent_email: string;
  };
  schedule_chat_history: {
    from_name: string;
    subject: string;
  };
};
