alter type "public"."email_types" rename to "email_types__old_version_to_be_dropped";

create type "public"."email_types" as enum ('debrief_calendar_invite', 'candidate_invite_confirmation', 'cancel_interview_session', 'init_email_agent', 'confirmation_mail_to_organizer', 'interview', 'rejection', 'phone_screening', 'interview_resend', 'application_received', 'phone_screening_resend', 'request_candidate_slot', 'candidate_cancel_request', 'candidate_reschedule_request', 'recruiter_rescheduling_email', 'candidate_availability_request', 'self_schedule_request_reminder', 'upcoming_interview_reminder_candidate', 'availability_request_reminder', 'upcoming_interview_reminder_interviewers');

alter table "public"."company_email_template" alter column type type "public"."email_types" using type::text::"public"."email_types";

drop type "public"."email_types__old_version_to_be_dropped";

alter table "public"."interview_filter_json" add column "selected_options" jsonb[];

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.fetch_interview_data(rec_id uuid, text_search_filter text DEFAULT NULL::text, job_id_filter uuid[] DEFAULT NULL::uuid[], sort_by text DEFAULT 'asc'::text, cord_ids uuid[] DEFAULT NULL::uuid[], status_filter text[] DEFAULT NULL::text[], schedule_type_filter text[] DEFAULT NULL::text[], module_ids uuid[] DEFAULT NULL::uuid[], page_number integer DEFAULT 1)
 RETURNS TABLE(applications json, candidates json, file json, public_jobs json, schedule json, interview_session_meetings jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        row_to_json(ja) AS applications,
        row_to_json(cand) AS candidates,
        json_build_object(
            'id', candfil.id,
            'created_at', candfil.created_at,
            'file_url',candfil.file_url,
            'candidate_id',candfil.candidate_id,
            'resume_json',candfil.resume_json,
            'type',candfil.type
        )  AS file,
        json_build_object(
                    'id', pj.id,
                    'job_title', pj.job_title
        ) AS public_jobs,
        row_to_json(insc) AS schedule,
        (
            SELECT jsonb_agg(interview_sessions.interview_session_meeting) -- Changed to interview_sessions.interview_session_meeting
            FROM (
                SELECT
                    CASE
                        WHEN insc.id IS NULL THEN
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', null
                            )
                        ELSE
                            jsonb_build_object(
                                'interview_session', row_to_json(intses),
                                'interview_meeting', row_to_json(intmeet)
                            )
                    END AS interview_session_meeting
                FROM interview_session intses
                LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
                LEFT JOIN interview_schedule intsch ON intsch.id = intmeet.interview_schedule_id
                WHERE
                    (insc.id IS NULL AND intses.interview_plan_id = intplan.id)
                    OR (insc.id IS NOT NULL AND insc.id = intsch.id)
                ORDER BY intses.session_order
            ) AS interview_sessions
        ) AS interview_session_meetings -- Corrected field name
    FROM
        applications ja      
        JOIN candidates cand ON ja.candidate_id = cand.id     
        LEFT JOIN public_jobs pj ON pj.id = ja.job_id
        LEFT JOIN candidate_files candfil ON candfil.id = ja.candidate_file_id
        LEFT JOIN interview_plan intplan ON intplan.job_id = ja.job_id
        LEFT JOIN interview_schedule insc ON insc.application_id = ja.id
    WHERE
        (ja.status = 'interview' OR insc.id IS NOT NULL)
        AND pj.recruiter_id = rec_id
        AND (
            status_filter IS NULL 
            OR (
               EXISTS (
                SELECT 1
                FROM interview_meeting intmt
                WHERE intmt.interview_schedule_id = insc.id
                AND intmt.status::text = ANY(status_filter)
             )
            ) 
        )
        AND (cord_ids IS NULL OR insc.coordinator_id =  ANY(cord_ids))
        AND (
            (text_search_filter IS NULL OR text_search_filter = '') OR  
            (LOWER(cand.first_name || ' ' || cand.last_name) LIKE LOWER('%' || text_search_filter || '%'))
        )
        AND (job_id_filter IS NULL OR ja.job_id = ANY(job_id_filter))
        AND (
            schedule_type_filter IS NULL 
            OR (
                SELECT ARRAY_AGG(inses.schedule_type)::text[]
                FROM interview_meeting intmt 
                JOIN interview_session inses ON inses.meeting_id = intmt.id 
                WHERE intmt.interview_schedule_id = insc.id
            ) && schedule_type_filter
        )
        AND (
            module_ids IS NULL 
            OR (
                SELECT ARRAY_AGG(inses.module_id)
                FROM interview_meeting intmt 
                JOIN interview_session inses ON inses.meeting_id = intmt.id
                WHERE intmt.interview_schedule_id = insc.id
            ) && module_ids
        )  
    LIMIT 50 -- Number of records per page
    OFFSET (page_number - 1) * 50; -- Calculate the starting position of records based on page number
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_interview_data_schedule(schedule_id_param uuid, application_id_param uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$

DECLARE
    interview_data JSONB;
    application_data JSONB;
    request_data JSONB;
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
        WHERE application_id = application_id_param;
        
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


