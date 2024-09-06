drop trigger if exists "track_interview_meeting_changes" on "public"."interview_meeting";

drop trigger if exists "track_request_changes" on "public"."request";

alter table "public"."candidate_portal_message" drop constraint "candidate_portal_message_sender_id_fkey";

drop function if exists "public"."interviewers_leaderboard_by_v"(recruiter_id uuid, departments numeric[], locations numeric[], jobs uuid[], start_datetime timestamp with time zone, end_datetime timestamp with time zone);

alter table "public"."candidate_portal_message" drop column "sender_id";

alter table "public"."candidate_portal_message" add column "availability_id" text;

alter table "public"."candidate_portal_message" add column "filter_id" text;

alter table "public"."candidate_portal_message" add column "type" text;

alter table "public"."candidate_request_availability" add column "availability_id" text;

alter table "public"."candidate_request_availability" add column "filter_id" text;

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

CREATE TRIGGER track_interview_meeting_changes AFTER UPDATE OF status, start_time, end_time, organizer_id, meeting_flow ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION create_interview_meeting_log();

CREATE TRIGGER track_request_changes AFTER UPDATE OF assignee_id, status, type, priority ON public.request FOR EACH ROW EXECUTE FUNCTION create_request_meeting_log();


