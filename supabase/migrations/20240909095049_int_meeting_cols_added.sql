drop trigger if exists "track_interview_meeting_changes" on "public"."interview_meeting";

drop trigger if exists "new_recruiters" on "public"."recruiter";

drop trigger if exists "track_request_changes" on "public"."request";

drop function if exists "public"."interviewers_leaderboard_by_v"(recruiter_id uuid, departments numeric[], locations numeric[], jobs uuid[], start_datetime timestamp with time zone, end_datetime timestamp with time zone);

alter table "public"."interview_meeting" add column "confirmed_candidate_tz" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_interview_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['status', 'start_time', 'end_time', 'organizer_id', 'meeting_flow', 'delta']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, new_value); 
        END IF;
    END LOOP;

    INSERT INTO public.interview_meeting_log (
        meeting_id
        , status
        , start_time
        , end_time
        , organizer_id
        , meeting_flow
        , delta
        )
        VALUES (
            OLD.id
            , OLD.status
            , OLD.start_time
            , OLD.end_time
            , OLD.organizer_id
            , OLD.meeting_flow
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_request_meeting_log()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    temp_column_name TEXT;
    old_value TEXT;
    new_value TEXT;
    query TEXT;
    delta_json jsonb = '{}'::jsonb;
BEGIN
    -- Iterate over the columns
    FOREACH temp_column_name IN ARRAY ARRAY['assignee_id', 'status', 'type', 'priority']
    LOOP
        -- Dynamically construct the query to handle different data types
        old_value := COALESCE(row_to_json(OLD)->>temp_column_name, 'null');
        new_value := COALESCE(row_to_json(NEW)->>temp_column_name, 'null');
        -- insert log if values have changed
        IF old_value IS DISTINCT FROM new_value THEN
            delta_json := delta_json || jsonb_build_object(temp_column_name, new_value); 
        END IF;
    END LOOP;

    INSERT INTO public.request_log (
        request_id
        , assignee_id
        , status
        , type
        , priority  
        , delta
        )
        VALUES (
            OLD.id
            , OLD.assignee_id
            , OLD.status
            , OLD.type
            , OLD.priority
            , delta_json
        );  
    RETURN NEW;
END;
$function$
;

create or replace view "public"."meeting_details" as  SELECT interview_meeting.id,
    interview_meeting.created_at,
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
    interview_session.schedule_type,
    interview_meeting.application_id,
    interview_meeting.meeting_flow,
    applications.job_id,
    public_jobs.recruiter_id,
    interview_session.module_id,
    ( SELECT array_agg(
                CASE
                    WHEN (interview_session.session_type = 'debrief'::session_type) THEN debrief_user.user_id
                    ELSE recruiter_user.user_id
                END) AS array_agg
           FROM (((interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
             LEFT JOIN recruiter_user ON ((recruiter_user.user_id = interview_module_relation.user_id)))
             LEFT JOIN recruiter_user debrief_user ON ((debrief_user.user_id = interview_session_relation.user_id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_user_ids,
    ( SELECT array_agg(interview_module_relation.id) AS array_agg
           FROM (interview_session_relation
             LEFT JOIN interview_module_relation ON ((interview_session_relation.interview_module_relation_id = interview_module_relation.id)))
          WHERE ((interview_session_relation.session_id = interview_session.id) AND (interview_session_relation.is_confirmed = true))) AS confirmed_module_relation_ids,
    interview_session.parent_session_id,
    interview_meeting.schedule_request_id,
    interview_meeting.confirmed_candidate_tz
   FROM (((interview_meeting
     LEFT JOIN interview_session ON ((interview_meeting.id = interview_session.meeting_id)))
     LEFT JOIN applications ON ((applications.id = interview_meeting.application_id)))
     LEFT JOIN public_jobs ON ((applications.job_id = public_jobs.id)));


CREATE TRIGGER track_interview_meeting_changes AFTER UPDATE OF status, start_time, end_time, organizer_id, meeting_flow ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION create_interview_meeting_log();

CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://192.168.29.44:3000/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');

CREATE TRIGGER track_request_changes AFTER UPDATE OF assignee_id, status, type, priority ON public.request FOR EACH ROW EXECUTE FUNCTION create_request_meeting_log();


