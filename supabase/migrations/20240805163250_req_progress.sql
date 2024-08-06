revoke delete on table "public"."request_completed_event" from "anon";

revoke insert on table "public"."request_completed_event" from "anon";

revoke references on table "public"."request_completed_event" from "anon";

revoke select on table "public"."request_completed_event" from "anon";

revoke trigger on table "public"."request_completed_event" from "anon";

revoke truncate on table "public"."request_completed_event" from "anon";

revoke update on table "public"."request_completed_event" from "anon";

revoke delete on table "public"."request_completed_event" from "authenticated";

revoke insert on table "public"."request_completed_event" from "authenticated";

revoke references on table "public"."request_completed_event" from "authenticated";

revoke select on table "public"."request_completed_event" from "authenticated";

revoke trigger on table "public"."request_completed_event" from "authenticated";

revoke truncate on table "public"."request_completed_event" from "authenticated";

revoke update on table "public"."request_completed_event" from "authenticated";

revoke delete on table "public"."request_completed_event" from "service_role";

revoke insert on table "public"."request_completed_event" from "service_role";

revoke references on table "public"."request_completed_event" from "service_role";

revoke select on table "public"."request_completed_event" from "service_role";

revoke trigger on table "public"."request_completed_event" from "service_role";

revoke truncate on table "public"."request_completed_event" from "service_role";

revoke update on table "public"."request_completed_event" from "service_role";

alter table "public"."request_completed_event" drop constraint "public_request_completed_event_request_id_fkey";

alter table "public"."request_progress" drop constraint "request_progress_logger_type_check";

alter table "public"."request_progress" drop constraint "request_progress_parent_request_id_fkey";

alter table "public"."request_completed_event" drop constraint "request_completed_event_pkey";

drop index if exists "public"."request_completed_event_pkey";

drop table "public"."request_completed_event";

alter table "public"."request_progress" drop column "logger_type";

alter table "public"."request_progress" drop column "parent_request_id";

alter table "public"."request_progress" drop column "title";

alter table "public"."request_progress" add column "event_type" text not null;

alter table "public"."request_progress" add column "log" text default ''::text;

alter table "public"."request_progress" add column "log_type" text not null default 'heading'::text;

alter table "public"."request_progress" add column "meta" jsonb;

alter table "public"."request_progress" add column "status" text not null;

alter table "public"."request_progress" alter column "request_id" drop default;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.func_on_update_interview_filter_json()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    w_ids uuid[];
    app_job_id uuid;
BEGIN



    UPDATE workflow_action_logs
    SET status = 'stopped'::workflow_cron_run_status
    WHERE status = 'not_started' 
    AND related_table = 'interview_filter_json'::workflow_cron_trigger_tables 
    AND related_table_pkey = NEW.id;

    -- Retrieve application job ID
    SELECT applications.job_id INTO app_job_id
    FROM interview_schedule
    left join applications on applications.id = interview_schedule.application_id
    WHERE interview_schedule.id = NEW.schedule_id;

    -- Retrieve workflow IDs
    SELECT ARRAY_AGG(w_j_r.workflow_id) AS w_ids
    INTO w_ids
    FROM workflow_job_relation w_j_r
    WHERE w_j_r.job_id = app_job_id;

    -- Process workflows if the status is 'in_progress'
    IF NEW.confirmed_on IS NOT NULL THEN
        -- update the event
        IF NEW.request_id IS NOT NULL THEN          
          INSERT INTO request_progress (event_type, request_id,status,log_type)
          VALUES ('CAND_CONFIRM_SLOT', NEW.request_id,'completed','heading');
          
          UPDATE request
          set status='completed'
          where id=NEW.request_id;
        END IF;
    
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.func_on_update_candidate_request_availability_slots()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
    w_ids uuid[];
    app_job_id uuid;
BEGIN

    -- allowed_endpoints := ARRAY[]::text[];
    -- stop queued jobs
    UPDATE workflow_action_logs
    SET status = 'stopped'::workflow_cron_run_status
    WHERE status = 'not_started' 
      AND related_table = 'candidate_request_availability'::workflow_cron_trigger_tables 
      AND related_table_pkey = NEW.id;

    -- Retrieve application job ID
    SELECT applications.job_id INTO app_job_id
    FROM applications
    WHERE applications.id = NEW.application_id;

    -- Retrieve workflow IDs
    SELECT ARRAY_AGG(w_j_r.workflow_id) AS w_ids
    INTO w_ids
    FROM workflow_job_relation w_j_r
    WHERE w_j_r.job_id = app_job_id;

    -- Process workflows if the status is 'in_progress'
    IF NEW.slots IS NOT NULL AND array_length(NEW.slots, 1) > 0 THEN
        
        -- update the event
        IF NEW.request_id IS NOT NULL THEN          
          INSERT INTO request_progress (event_type, request_id,status,log_type)
          VALUES ('CAND_AVAIL_REC', NEW.request_id,'completed','heading');
          
        END IF;

        FOR wa_record IN
          SELECT 
            workflow.id AS workflow_id, 
            workflow_action.id AS workflow_action_id, 
            workflow.interval AS interval_minutes, 
            workflow.phase AS phase, 
            workflow.trigger AS trigger, 
            json_build_object(
              'target_api', workflow_action.target_api,
              'payload', workflow_action.payload,
              'candidate_availability_request_id', NEW.id,
              'recruiter_id', workflow.recruiter_id,
              'application_id', NEW.application_id,
              'request_id',NEW.request_id
            ) AS meta
          FROM workflow
          LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
          WHERE 
            workflow.id = ANY(w_ids)
            AND workflow.is_paused = FALSE
            AND (workflow.trigger::text = 'onReceivingAvailReq')
        LOOP
            PERFORM create_new_workflow_action_log(
              'candidate_request_availability'::workflow_cron_trigger_tables,
              NEW.id,
              wa_record.workflow_id, 
              wa_record.workflow_action_id, 
              wa_record.interval_minutes, 
              wa_record.phase::text, 
              wa_record.meta
            );
        END LOOP;    
    END IF;

    RETURN NEW;
END;
$function$
;

CREATE TRIGGER workflow_on_update_interview_filter_json AFTER UPDATE OF confirmed_on ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION func_on_update_interview_filter_json();


