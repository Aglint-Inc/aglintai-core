drop view if exists "public"."application_view";

alter type "public"."email_types" rename to "email_types__old_version_to_be_dropped";

create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer', 'interview', 'rejection', 'phone_screening', 'interview_resend', 'application_received', 'phone_screening_resend', 'request_candidate_slot', 'candidate_cancel_request', 'candidate_reschedule_request', 'recruiter_rescheduling_email', 'candidate_availability_request', 'self_schedule_request_reminder', 'upcoming_interview_reminder_candidate', 'availability_request_reminder', 'upcoming_interview_reminder_interviewers', 'slack_interview_reminder', 'slack_interviewer_feedback', 'slack_interviewer_confirmation');

alter table "public"."company_email_template" alter column type type "public"."email_types" using type::text::"public"."email_types";

drop type "public"."email_types__old_version_to_be_dropped";

alter table "public"."company_email_template" disable row level security;

set check_function_bodies = off;

create or replace view "public"."application_view" as  SELECT applications.id,
    applications.job_id,
    applications.created_at,
    applications.applied_at,
    applications.overall_score AS resume_score,
    applications.overall_interview_score AS interview_score,
    applications.status_emails_sent AS email_status,
    applications.processing_status,
    applications.bookmarked,
    applications.is_new,
    applications.status,
    (applications.score_json -> 'badges'::text) AS badges,
    candidates.candidate_id,
    candidates.email,
    candidates.name,
    candidates.city,
    candidates.state,
    candidates.country,
    candidates.current_job_title,
    meeting_details.meeting_details,
    (
        CASE
            WHEN ((candidate_files.resume_json IS NOT NULL) OR (candidate_files.file_url IS NOT NULL)) THEN
            CASE
                WHEN (applications.is_resume_fetching = true) THEN 'fetching'::text
                WHEN (applications.processing_status = 'processing'::application_processing_status) THEN 'processing'::text
                WHEN (applications.score_json IS NOT NULL) THEN 'processed'::text
                ELSE 'unparsable'::text
            END
            ELSE 'unavailable'::text
        END)::resume_processing_state AS resume_processing_state
   FROM (((applications
     LEFT JOIN ( SELECT candidates_1.id AS candidate_id,
            candidates_1.email,
            (((candidates_1.first_name)::text || ' '::text) || (candidates_1.last_name)::text) AS name,
            candidates_1.city,
            candidates_1.state,
            candidates_1.country,
            candidates_1.current_job_title
           FROM candidates candidates_1) candidates ON ((candidates.candidate_id = applications.candidate_id)))
     LEFT JOIN ( SELECT meeting_details_1.application_id,
            jsonb_agg(meeting_details_1.*) AS meeting_details
           FROM meeting_details meeting_details_1
          GROUP BY meeting_details_1.application_id) meeting_details ON ((meeting_details.application_id = applications.id)))
     LEFT JOIN ( SELECT candidate_files_1.id,
            candidate_files_1.resume_json,
            candidate_files_1.file_url
           FROM candidate_files candidate_files_1) candidate_files ON ((candidate_files.id = applications.candidate_file_id)));


CREATE OR REPLACE FUNCTION public.get_interview_data_schedule(schedule_id_param uuid, application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$

DECLARE
    interview_data JSONB;
    application_data JSONB;
    request_data JSONB;
    activities_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
    -- Fetch interview data
    SELECT jsonb_agg(
               json_build_object(
                   'interview_session', row_to_json(intses),
                   'interview_module', row_to_json(intmod),
                   'interview_meeting', row_to_json(intmeet),
                   'interview_session_relations', interview_session_relations
               )
           )
    INTO interview_data
    FROM interview_session intses
    JOIN interview_meeting intmeet ON  intmeet.id = intses.meeting_id
    LEFT JOIN interview_module intmod ON intses.module_id = intmod.id
    LEFT JOIN (
        SELECT 
            session_id,
            jsonb_agg(
                jsonb_build_object(
                        'interview_session_relation', row_to_json(intrel),
                        'interview_module_relation', row_to_json(intmodrel),
                        'recruiter_user', 
                            CASE WHEN user_rel.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel.user_id,
                                    'first_name', user_rel.first_name,
                                    'last_name', user_rel.last_name,
                                    'position', user_rel.position,
                                    'email', user_rel.email,
                                    'profile_image', user_rel.profile_image
                                 )
                            END,
                        'debrief_user', 
                            CASE WHEN user_rel_debrief.user_id IS NULL THEN NULL
                                 ELSE jsonb_build_object(
                                    'user_id', user_rel_debrief.user_id,
                                    'first_name', user_rel_debrief.first_name,
                                    'last_name', user_rel_debrief.last_name,
                                    'position', user_rel_debrief.position,
                                    'email', user_rel_debrief.email,
                                    'profile_image', user_rel_debrief.profile_image
                                 )
                            END
                )
            ) as interview_module_relation
        FROM interview_session_relation intrel
        LEFT JOIN interview_module_relation intmodrel ON intrel.interview_module_relation_id = intmodrel.id
        LEFT JOIN recruiter_user user_rel ON intmodrel.user_id = user_rel.user_id
        LEFT JOIN recruiter_user user_rel_debrief ON intrel.user_id = user_rel_debrief.user_id
        GROUP BY session_id
    ) AS interview_session_relations ON intses.id = interview_session_relations.session_id
    WHERE intmeet.interview_schedule_id=schedule_id_param;

     EXCEPTION
            WHEN NO_DATA_FOUND THEN
                interview_data := NULL;
    END;


    BEGIN
    -- Fetch application data
    SELECT jsonb_build_object(
               'application',row_to_json(applications),
               'public_jobs', jsonb_build_object(
                   'id', public_jobs.id,
                   'job_title', public_jobs.job_title,
                   'location', public_jobs.location,
                   'recruiter_id', public_jobs.recruiter_id
               ),
               'candidate',row_to_json(candidates),
               'candidate_files', jsonb_build_object(
                    'id', candidate_files.id,
                    'file_url', candidate_files.file_url,
                    'candidate_id', candidate_files.candidate_id,
                    'resume_json', candidate_files.resume_json,
                    'type', candidate_files.type
               )
           )
    INTO application_data
    FROM applications
    LEFT JOIN public_jobs ON applications.job_id = public_jobs.id
    LEFT JOIN candidates ON applications.candidate_id = candidates.id
     LEFT JOIN candidate_files ON candidate_files.id = applications.candidate_file_id
    WHERE applications.id = application_id_param;

    EXCEPTION
            WHEN NO_DATA_FOUND THEN
                application_data := NULL;
    END;


    BEGIN
        SELECT jsonb_agg(row_to_json(candidate_request_availability))
        INTO request_data
        FROM candidate_request_availability
        WHERE candidate_request_availability.booking_confirmed=false and application_id = application_id_param;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                request_data := NULL;
    END;


    -- Combine interview data and application data
    result_data := jsonb_build_object(
        'interview_data', interview_data,
        'application_data', application_data,
        'request_data',request_data
    );

    RETURN result_data;

END;

$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    meeting_ids uuid[];
    workflow_id uuid;
BEGIN
    IF cardinality(NEW.session_ids) <> 0 THEN
      SELECT array_agg(meeting_id) INTO meeting_ids FROM interview_session WHERE id = any(NEW.session_ids);
      FOR wa_record IN
          SELECT wa.id AS workflow_action_id, w.id AS workflow_id, w.interval AS interval_minutes, w.phase AS phase, json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'job_id',a.job_id, 'email_type', c_e_t.type, 'meeting_ids', meeting_ids, 'filter_id', NEW.id) AS meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.schedule_id
            AND w.trigger::text = 'self_schedule_request_reminder'
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
      END LOOP;
    END IF;  
  RETURN NEW;
END;$function$
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
    if NEW.is_confirmed then
        FOR wa_record IN
            SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, i_m.start_time as start_time , json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type, 'session_id', NEW.session_id) as meta
            FROM 
            interview_schedule i_s 
            JOIN interview_meeting i_m ON i_m.interview_schedule_id = i_s.id
            JOIN meeting_interviewers m_i ON m_i.meeting_id = i_m.id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE m_i.session_id = NEW.session_id
            AND c_e_t.type <> 'upcoming_interview_reminder_candidate' and w.trigger::text = 'upcoming_interview_reminder' 
        LOOP
            PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time);
        END LOOP;
    END if;
  RETURN NEW;
END;$function$
;


