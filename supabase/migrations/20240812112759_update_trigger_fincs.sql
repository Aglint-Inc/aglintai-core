set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.func_on_update_request()
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
    req_sess_ids uuid[];
BEGIN
    allowed_endpoints := ARRAY[]::text[];

    -- stop queued jobs
    UPDATE workflow_action_logs
    SET status='stopped'::workflow_cron_run_status
    WHERE status='not_started' 
      AND related_table='request'::workflow_cron_trigger_tables 
      AND related_table_pkey=NEW.id;

    -- Retrieve session IDs
    SELECT ARRAY_AGG(request_relation.session_id)
    INTO req_sess_ids
    FROM request_relation
    WHERE request_relation.request_id = NEW.id;

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
    IF NEW.status::text = 'in_progress' THEN
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
              'request_id', NEW.id,
              'session_ids', req_sess_ids,
              'recruiter_id', workflow.recruiter_id,
              'application_id',new.application_id
            ) AS meta
          FROM workflow
          LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
          WHERE 
            workflow.id = ANY(w_ids)
            AND workflow.is_paused = FALSE
            AND
             (
              (new.type = 'schedule_request' and ( workflow.trigger::text = 'onAvailReqAgent' OR workflow.trigger::text = 'onSelfScheduleReqAgent' ))
              or
              (new.type = 'reschedule_request' and ( workflow.trigger::text = 'onRequestReschedule'))
               or
              (new.type = 'cancel_schedule_request' and ( workflow.trigger::text = 'onRequestCancel'))
              )
        LOOP
            PERFORM create_new_workflow_action_log(
              'request'::workflow_cron_trigger_tables,
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


