alter type "public"."workflow_cron_trigger_tables" rename to "workflow_cron_trigger_tables__old_version_to_be_dropped";

create type "public"."workflow_cron_trigger_tables" as enum ('interview_meeting', 'interview_session_relation', 'interview_filter_json', 'candidate_request_availability', 'interview_module_relation', 'interview_training_progress', 'request');

alter table "public"."workflow_action_logs" alter column related_table type "public"."workflow_cron_trigger_tables" using related_table::text::"public"."workflow_cron_trigger_tables";

drop type "public"."workflow_cron_trigger_tables__old_version_to_be_dropped";

alter table "public"."candidate_request_availability" add column "request_id" uuid;

alter table "public"."interview_filter_json" add column "request_id" uuid;

alter table "public"."request_completed_event" drop column "completed_at";

alter table "public"."request_completed_event" add column "triggered_at" timestamp with time zone not null default now();

alter table "public"."request_completed_event" alter column "event" drop not null;

alter table "public"."request_completed_event" alter column "event" set data type text using "event"::text;

alter table "public"."request_completed_event" alter column "id" set default gen_random_uuid();

alter table "public"."request_completed_event" alter column "id" drop identity;

alter table "public"."request_completed_event" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."request_completed_event" alter column "request_id" drop default;

alter table "public"."request_completed_event" alter column "request_id" set not null;

alter table "public"."request_completed_event" enable row level security;

CREATE UNIQUE INDEX request_completed_event_pkey ON public.request_completed_event USING btree (id);

alter table "public"."request_completed_event" add constraint "request_completed_event_pkey" PRIMARY KEY using index "request_completed_event_pkey";

alter table "public"."candidate_request_availability" add constraint "public_candidate_request_availability_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."candidate_request_availability" validate constraint "public_candidate_request_availability_request_id_fkey";

alter table "public"."interview_filter_json" add constraint "public_interview_filter_json_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."interview_filter_json" validate constraint "public_interview_filter_json_request_id_fkey";

alter table "public"."request_completed_event" add constraint "public_request_completed_event_request_id_fkey" FOREIGN KEY (request_id) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."request_completed_event" validate constraint "public_request_completed_event_request_id_fkey";

set check_function_bodies = off;

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
          INSERT INTO request_completed_event (event, request_id)
          VALUES ('onReceivingAvailReq', NEW.request_id);
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
              'application_id', NEW.application_id
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


