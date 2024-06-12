create type "public"."email_slack_types" as enum ('interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'interviewStart_slack_interviewers', 'agent_email_candidate', 'applicantReject_email_applicant', 'applicationRecieved_email_applicant', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'debrief_email_interviewer', 'interReschedReq_email_recruiter', 'interviewCancel_email_applicant', 'InterviewCancelReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'phoneScreen_email_candidate', 'phoneScreenRemind_email_applicant', 'selfScheduleReminder_email_applicant', 'sendAvailReqReminder_email_applicant');

alter table "public"."company_email_template" drop constraint "company_email_template_ukey";

drop function if exists "public"."get_interview_modules"(rec_id uuid);

drop index if exists "public"."company_email_template_ukey";

alter type "public"."email_types" rename to "email_types__old_version_to_be_dropped";

create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer', 'interview', 'rejection', 'phone_screening', 'interview_resend', 'application_received', 'phone_screening_resend', 'request_candidate_slot', 'candidate_cancel_request', 'candidate_reschedule_request', 'recruiter_rescheduling_email', 'candidate_availability_request', 'interviewStart_email_applicant', 'interviewStart_email_interviewers', 'interviewStart_slack_interviewers', 'interviewEnd_slack_interviewers', 'interviewerConfirmation_slack_interviewers', 'debrief_email_interviewer', 'applicationRecieved_email_applicant', 'interviewCancel_email_applicant', 'agent_email_candidate', 'confInterview_email_organizer', 'confirmInterview_email_applicant', 'applicantReject_email_applicant', 'phoneScreen_email_candidate', 'interviewReminder_email_applicant', 'phoneScreenRemind_email_applicant', 'InterviewCancelReq_email_recruiter', 'interReschedReq_email_recruiter', 'interviewReschedule_email_applicant', 'interviewReminder_email_interviewer', 'sendAvailReqReminder_email_applicant', 'selfScheduleReminder_email_applicant');

drop view if exists "public"."application_view";

alter table "public"."application_email_status" alter column email type "public"."email_types" using email::text::"public"."email_types";

alter table "public"."company_email_template" alter column "type" set data type email_slack_types using "type"::text::email_slack_types;

drop type "public"."email_types__old_version_to_be_dropped";

alter table "public"."company_email_template" add column "from_name" text;

alter table "public"."interview_session_cancel" add column "is_ignored" boolean not null default false;

alter table "public"."scheduling-agent-chat-history" drop column "candidate_email";

alter table "public"."scheduling-agent-chat-history" add column "email_from_name" text not null;

alter table "public"."scheduling-agent-chat-history" add column "email_subject" text not null;

set check_function_bodies = off;

create or replace view "public"."application_view" as  SELECT applications.id,
    applications.job_id,
    applications.created_at,
    applications.applied_at,
    applications.overall_score AS resume_score,
    applications.overall_interview_score AS interview_score,
    applications.processing_status,
    applications.bookmarked,
    applications.is_new,
    applications.status,
    (applications.score_json -> 'badges'::text) AS badges,
    candidates.candidate_id,
    candidates.email,
    candidates.name,
    candidates.city,
    candidates.linkedin,
    candidates.phone,
    candidates.state,
    candidates.country,
    candidates.current_job_title,
    meeting_details.meeting_details,
    applications.candidate_file_id,
    candidate_files.file_url,
    email_statuses.email_status,
    (
        CASE
            WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
            CASE
                WHEN (applications.is_resume_fetching = true) THEN 'fetching'::text
                WHEN ((applications.processing_status = 'processing'::application_processing_status) OR (applications.processing_status = 'not started'::application_processing_status)) THEN 'processing'::text
                WHEN (applications.score_json IS NOT NULL) THEN 'processed'::text
                ELSE 'unparsable'::text
            END
            ELSE 'unavailable'::text
        END)::resume_processing_state AS resume_processing_state
   FROM ((((applications
     LEFT JOIN ( SELECT candidates_1.id AS candidate_id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.linkedin,
            candidates_1.phone,
            candidates_1.state,
            candidates_1.country,
            candidates_1.current_job_title
           FROM candidates candidates_1) candidates ON ((candidates.candidate_id = applications.candidate_id)))
     LEFT JOIN ( SELECT application_email_status.application_id,
            jsonb_build_object(application_email_status.email, application_email_status.created_at) AS email_status
           FROM application_email_status) email_statuses ON ((email_statuses.application_id = applications.id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)))
     LEFT JOIN ( SELECT candidate_files_1.id,
            candidate_files_1.resume_json,
            candidate_files_1.file_url
           FROM candidate_files candidate_files_1) candidate_files ON ((candidate_files.id = applications.candidate_file_id)));


CREATE OR REPLACE FUNCTION public.get_interview_modules(rec_id uuid)
 RETURNS TABLE(interview_modules jsonb, users jsonb, upcoming_meeting_count integer, completed_meeting_count integer, canceled_meeting_count integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        to_jsonb(intmod.*) AS interview_modules,
        COALESCE((SELECT jsonb_agg(
            jsonb_build_object(
                'user_id', ru.user_id,
                'first_name', ru.first_name,
                'last_name', ru.last_name,
                'email', ru.email,
                'profile_image', ru.profile_image,
                'position', ru.position
            )
        ) FROM recruiter_user ru 
        WHERE ru.user_id IN (SELECT intmodrel.user_id FROM interview_module_relation intmodrel WHERE intmodrel.module_id = intmod.id)), '[]'::jsonb) AS users,
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id  WHERE  intm.status='confirmed' AND inses.module_id=intmod.id)::integer AS upcoming_meeting_count,
        (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='completed' AND inses.module_id=intmod.id)::integer AS completed_meeting_count,
         (SELECT COUNT(*) FROM interview_meeting intm JOIN interview_session inses ON inses.meeting_id=intm.id WHERE  intm.status='cancelled' AND inses.module_id=intmod.id)::integer AS canceled_meeting_count
    FROM interview_module intmod
    WHERE intmod.recruiter_id = rec_id
    GROUP BY intmod.id
    ORDER BY intmod.created_at DESC;  -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    IF NEW.is_confirmed THEN
        FOR wa_record IN
            SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, i_m.start_time as start_time, w.trigger as trigger, i_m_s.session_duration as session_duration,
            json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type, 'session_id', NEW.session_id) as meta
            FROM 
            interview_session i_m_s 
            JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
            JOIN meeting_interviewers m_i ON m_i.session_id = i_m_s.id
            JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE i_m_s.id = NEW.session_id 
            AND c_e_t.type <> 'interviewStart_email_applicant' and (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd')
        LOOP
            IF wa_record.trigger = 'interviewEnd' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time + (wa_record.session_duration * INTERVAL '1 minute'));
            ELSIF wa_record.trigger = 'interviewStart' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time);
            ELSE
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta , now());
            END IF;
        END LOOP;
    END IF;
  RETURN NEW;
END;$function$
;


