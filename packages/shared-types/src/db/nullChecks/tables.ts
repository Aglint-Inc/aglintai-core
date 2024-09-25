import { SelectiveNotNullTables } from "../..";

//@ts-ignore
export type NotNullTables = SelectiveNotNullTables<{
  aglint_candidates:
    | "city"
    | "country"
    | "departments"
    | "email"
    | "email_status"
    | "employment_history"
    | "extrapolated_email_confidence"
    | "facebook_url"
    | "first_name"
    | "functions"
    | "github_url"
    | "headline"
    | "intent_strength"
    | "is_likely_to_engage"
    | "last_name"
    | "linkedin_url"
    | "name"
    | "organization"
    | "organization_id"
    | "phone_numbers"
    | "photo_url"
    | "revealed_for_current_team"
    | "seniority"
    | "show_intent"
    | "state"
    | "subdepartments"
    | "title"
    | "twitter_url";
  ai_videos: "error" | "file_url" | "video_id" | "video_url";
  application_logs:
    | "title"
    | "description"
    | "created_by"
    | "task_id"
    | "metadata";
  applications:
    | "remote_id"
    | "candidate_id"
    | "candidate_file_id"
    | "converted_at"
    | "feedback"
    | "phone_screening"
    | "processing_started_at"
    | "remote_data"
    | "score_json"
    | "status_emails_sent";
  candidate_files:
    | "file_url"
    | "type"
    | "education_embedding"
    | "experience_embedding"
    | "resume_embedding"
    | "resume_json"
    | "resume_text"
    | "skills_embedding";
  candidate_portal_job:
    | "application_id"
    | "banner"
    | "greetings"
    | "images"
    | "job_id";
  candidate_portal_message:
    | "application_id"
    | "title"
    | "availability_id"
    | "filter_id"
    | "is_readed"
    | "message";
  candidate_request_availability:
    | "availability_id"
    | "filter_id"
    | "request_id"
    | "availability"
    | "date_range"
    | "is_task_created"
    | "number_of_days"
    | "number_of_slots"
    | "slots"
    | "total_slots"
    | "user_timezone"
    | "visited";
  candidate_search_history:
    | "search_query"
    | "bookmarked_candidates"
    | "db_search"
    | "is_search_jd"
    | "query_json"
    | "search_results"
    | "used_credits";
  candidates:
    | "city"
    | "country"
    | "last_name"
    | "state"
    | "recruiter_id"
    | "avatar"
    | "current_company"
    | "current_job_title"
    | "experience_in_months"
    | "geolocation"
    | "linkedin"
    | "phone"
    | "timezone";
  company_email_template: "from_name";
  company_search_cache: "search_result" | "website_url";
  departments: "remote_id";
  integrations:
    | "ashby_key"
    | "ashby_last_synced"
    | "ashby_sync_token"
    | "domain_admin_email"
    | "google_workspace_domain"
    | "greenhouse_key"
    | "greenhouse_metadata"
    | "lever_key"
    | "schedule_agent_email"
    | "service_json"
    | "twilio_phone_number"
    | "zoom_auth";
  interview_filter_json:
    | "request_id"
    | "created_by"
    | "confirmed_on"
    | "filter_json"
    | "schedule_options"
    | "viewed_on";
  interview_meeting:
    | "end_time"
    | "organizer_id"
    | "start_time"
    | "cal_event_id"
    | "candidate_feedback"
    | "confirmed_candidate_tz"
    | "confirmed_date"
    | "instructions"
    | "meeting_json"
    | "meeting_link"
    | "schedule_request_id";
  interview_meeting_log:
    | "end_time"
    | "organizer_id"
    | "start_time"
    | "status"
    | "delta"
    | "meeting_flow"
    | "meeting_id";
  interview_module:
    | "description"
    | "created_by"
    | "instructions"
    | "department_id"
    | "duration_available"
    | "settings";
  interview_module_relation: "pause_json" | "training_approver";
  interview_plan: "application_id" | "job_id";
  interview_progress:
    | "description"
    | "application_id"
    | "job_id"
    | "name"
    | "icon"
    | "is_completed"
    | "order"
    | "update_at";
  interview_session:
    | "name"
    | "meeting_id"
    | "module_id"
    | "break_duration"
    | "interview_plan_id"
    | "interviewer_cnt"
    | "location"
    | "members_meta"
    | "parent_session_id";
  interview_session_cancel:
    | "request_id"
    | "application_id"
    | "cancel_user_id"
    | "other_details"
    | "session_relation_id";
  interview_session_relation:
    | "user_id"
    | "feedback"
    | "interview_module_relation_id"
    | "training_type";
  interview_training_progress: "approved_user_id";
  job_email_template: "body" | "from_name" | "subject";
  logs:
    | "user_id"
    | "recruiter_id"
    | "message"
    | "meta"
    | "method"
    | "parent_log_id";
  new_tasks:
    | "application_id"
    | "recruiter_id"
    | "type"
    | "agent"
    | "filter_id"
    | "request_availability_id"
    | "due_date"
    | "schedule_date_range"
    | "start_date"
    | "task_action"
    | "task_owner";
  new_tasks_progress: "created_by" | "jsonb_data" | "title_meta";
  notify_me: "job_id" | "created_at" | "job_title";
  office_locations: "name" | "remote_id" | "line2" | "zipcode";
  outreached_emails: "email";
  permissions: "description" | "meta" | "created_at" | "is_enable";
  public_jobs:
    | "department_id"
    | "description"
    | "draft"
    | "hiring_manager"
    | "interview_coordinator"
    | "jd_changed"
    | "jd_json"
    | "job_criteria"
    | "job_title"
    | "job_type"
    | "location_id"
    | "recruiter"
    | "recruiting_coordinator"
    | "remote_id"
    | "remote_sync_time"
    | "screening_setting"
    | "sourcer"
    | "updated_at"
    | "workplace_type";
  question_bank:
    | "description"
    | "answer"
    | "duration"
    | "embeddings"
    | "level"
    | "question";
  recruiter:
    | "company_overview"
    | "company_website"
    | "e_o_statement"
    | "email"
    | "employee_size"
    | "hr_contact"
    | "industry"
    | "logo"
    | "m_v_statement"
    | "name"
    | "phone_number"
    | "primary_contact"
    | "recruiter_type"
    | "scheduling_reason"
    | "scheduling_settings"
    | "socials";
  recruiter_preferences:
    | "roles"
    | "greetings"
    | "about"
    | "banner_image"
    | "company_images";
  recruiter_relation: "manager_id" | "role_id";
  recruiter_user:
    | "calendar_sync"
    | "calendar_sync_token"
    | "department_id"
    | "email_auth"
    | "email_outreach_templates"
    | "joined_at"
    | "last_name"
    | "linked_in"
    | "office_location_id"
    | "phone"
    | "position"
    | "profile_image"
    | "remote_id"
    | "schedule_auth"
    | "scheduling_settings";
  request:
    | "application_id"
    | "assignee_id"
    | "assigner_id"
    | "completed_at"
    | "schedule_end_date"
    | "schedule_start_date"
    | "title";
  request_integration_tool: "recruiter_id" | "description" | "tool_name";
  request_log: "assignee_id" | "type" | "priority" | "status" | "delta";
  request_note: "request_id" | "updated_at" | "note" | "pinned";
  request_progress: "meta" | "log" | "target_api";
  request_relation: "session_id" | "cancel_id";
  roles: "description";
  rp_logs: "logs";
  rp_token_usage: "task" | "token_used_json" | "total_token_used";
  scheduling_agent_chat_history: "task_id" | "application_id" | "company_id";
  support_groups: "updated_at" | "company_id" | "created_at";
  support_ticket:
    | "email"
    | "application_id"
    | "user_id"
    | "created_at"
    | "updated_at"
    | "company_id"
    | "action_pending"
    | "assign_to"
    | "attachments"
    | "support_group_id";
  user_chat: "function" | "metadata";
  workflow: "description" | "request_id";
  workflow_action: "payload";
  workflow_action_logs: "meta" | "completed_at" | "started_at";
}>;
