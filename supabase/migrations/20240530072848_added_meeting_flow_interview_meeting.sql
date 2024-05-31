create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer', 'interview', 'rejection', 'phone_screening', 'interview_resend', 'application_received', 'phone_screening_resend', 'request_candidate_slot', 'candidate_cancel_request', 'candidate_reschedule_request', 'recruiter_rescheduling_email', 'candidate_availability_request');

create type "public"."meeting_flow" as enum ('self_scheduling', 'candidate_request', 'debrief');

drop view if exists "public"."meeting_details";

alter table "public"."new_tasks_progress" alter column "progress_type" drop default;

alter type "public"."progress_type" rename to "progress_type__old_version_to_be_dropped";

create type "public"."progress_type" as enum ('standard', 'interview_schedule', 'email_messages', 'call_completed', 'call_failed', 'email_failed', 'call_disconnected', 'email_follow_up', 'call_follow_up', 'email_follow_up_reminder', 'call_follow_up_reminder', 'request_availability_list');

alter table "public"."new_tasks_progress" alter column progress_type type "public"."progress_type" using progress_type::text::"public"."progress_type";

alter table "public"."new_tasks_progress" alter column "progress_type" set default 'standard'::progress_type;

drop type "public"."progress_type__old_version_to_be_dropped";

alter table "public"."company_email_template" drop column "footer";

alter table "public"."company_email_template" alter column "type" set data type email_types using "type"::email_types;

alter table "public"."interview_meeting" add column "meeting_flow" meeting_flow not null default 'self_scheduling'::meeting_flow;

create or replace view "public"."meeting_details" as  SELECT interview_meeting.id,
    interview_meeting.created_at,
    interview_meeting.interview_schedule_id,
    interview_meeting.meeting_json,
    interview_meeting.status,
    interview_meeting.instructions,
    interview_meeting.meeting_link,
    interview_meeting.confirmed_date,
    interview_meeting.start_time,
    interview_meeting.end_time,
    interview_meeting.cal_event_id,
    interview_meeting.candidate_feedback,
    interview_meeting.organizer_id,
    interview_session.id AS session_id,
    interview_session.name AS session_name,
    interview_session.break_duration,
    interview_session.session_order,
    interview_session.session_duration,
    interview_session.session_type,
    interview_session.schedule_type
   FROM (interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)));



