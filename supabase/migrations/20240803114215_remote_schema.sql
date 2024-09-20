alter table "public"."integrations" add column "ashby_key" text;

alter table "public"."integrations" add column "ashby_last_synced" text;

alter table "public"."integrations" add column "ashby_sync_token" text;

alter table "public"."integrations" add column "google_workspace_domain" text;

alter table "public"."integrations" add column "greenhouse_key" text;

alter table "public"."integrations" add column "lever_key" text;

alter table "public"."integrations" add column "zoom_auth" text;

alter table "public"."integrations" alter column "recruiter_id" drop default;

alter table "public"."recruiter" drop column "ashby_key";

alter table "public"."recruiter" drop column "ashby_last_synced";

alter table "public"."recruiter" drop column "ashby_sync_token";

alter table "public"."recruiter" drop column "assistant_id";

alter table "public"."recruiter" drop column "greenhouse_key";

alter table "public"."recruiter" drop column "lever_key";

alter table "public"."recruiter" drop column "zoom_auth";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(triggered_table workflow_cron_trigger_tables, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    execute_at TIMESTAMP with time zone;
BEGIN
    IF base_time IS NULL THEN
        base_time := NOW();
    END IF;
    -- Calculate execution time based on the phase and interval
    IF phase = 'before' THEN
        execute_at := base_time - (interval_minutes * INTERVAL '1 minute');
    ELSE
        execute_at := base_time + (interval_minutes * INTERVAL '1 minute');
    END IF;

    -- Insert record into workflow_action_logs
    INSERT INTO workflow_action_logs (workflow_id, workflow_action_id, meta, execute_at,related_table,related_table_pkey)
    VALUES (workflow_id, workflow_action_id, meta, execute_at,triggered_table,triggered_table_pkey);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_request(application uuid DEFAULT NULL::uuid, sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  request_id uuid;
  session_id uuid;
BEGIN
    IF application IS NOT NULL 
       AND request IS NOT NULL 
       AND request ->> 'assigner_id' IS NOT NULL 
       AND request ->> 'assignee_id' IS NOT NULL 
    THEN
        INSERT INTO request(application_id, assigner_id, assignee_id, title, type, status, priority)
        VALUES (application, 
                (request->>'assigner_id')::uuid, 
                (request->>'assignee_id')::uuid, 
                coalesce(request->>'title', 'New request'),
                coalesce(request->>'type', 'schedule_request'),
                coalesce(request->>'status', 'to_do'),
                coalesce(request->>'priority', 'standard')
                )
        RETURNING id INTO request_id;

        IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 THEN
            FOR session_id IN SELECT UNNEST(sessions) LOOP
                INSERT INTO request_relation(request_id, session_id)
                VALUES (request_id, session_id);
            END LOOP;
        END IF;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.expire_new_requests()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  UPDATE request
  SET is_new = false
  WHERE is_new = true AND created_at < now() - interval '6 hours';
end;
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
            AND (workflow.trigger::text = 'onAvailReqAgent' OR workflow.trigger::text = 'onSelfScheduleReqAgent')
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

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      WITH applications_cte AS (
        SELECT UNNEST(move_to_interview.applications)::uuid as application_id
      ), sessions_cte AS (
        SELECT UNNEST(move_to_interview.sessions)::uuid as session_id
      )
      SELECT meeting_details.application_id, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      INNER JOIN applications_cte ON applications_cte.application_id = meeting_details.application_id
      INNER JOIN sessions_cte ON sessions_cte.session_id = meeting_details.parent_session_id
      GROUP BY meeting_details.application_id
    ) 
    LOOP
      PERFORM create_session_request(response.application_id, response.session_ids, request);
    END LOOP;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    session_rec record;
    sesn_reln_record record;
    old_new_session_ids jsonb := '[]'::jsonb;
    app_session_ids uuid[] := '{}';
    appl_job_id uuid;
    int_schedule_id uuid;
    inserted_meeting jsonb;
    inserted_session jsonb;
    inserted_relation jsonb;
    session_data jsonb := '[]'::jsonb;
    session_obj jsonb;
    inserted_sesn_id uuid;
    session_relations jsonb := '[]'::jsonb;
BEGIN
    SELECT interview_schedule.id 
    INTO int_schedule_id  
    FROM interview_schedule
    WHERE interview_schedule.application_id = NEW.id;
    
    -- clone
    IF int_schedule_id IS NULL THEN 
        int_schedule_id := uuid_generate_v4();
        
        SELECT public_jobs.recruiter_id 
        INTO company_id 
        FROM applications
        LEFT JOIN public_jobs ON public_jobs.id = applications.job_id 
        WHERE applications.id = NEW.id;

        INSERT INTO interview_schedule(id, application_id, recruiter_id) 
        VALUES (int_schedule_id, NEW.id, company_id);

        SELECT job_id 
        INTO appl_job_id 
        FROM applications 
        WHERE id = NEW.id;
        
        FOR session_rec IN
        SELECT 
            interview_session.id AS id,
            interview_session.break_duration,
            interview_session.interviewer_cnt,
            interview_session.location,
            interview_session.module_id,
            interview_session.name,
            interview_session.schedule_type,
            interview_session.session_duration,
            interview_session.session_order,
            interview_session.session_type
        FROM interview_plan
        LEFT JOIN interview_session ON interview_session.interview_plan_id = interview_plan.id
        WHERE interview_plan.job_id = appl_job_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting (interview_schedule_id, status)
                VALUES (int_schedule_id, 'not_scheduled')
                RETURNING *
            ),
            inserted_session_cte AS (
                INSERT INTO interview_session (
                    break_duration,
                    interviewer_cnt,
                    location,
                    module_id,
                    name,
                    schedule_type,
                    session_duration,
                    session_order,
                    session_type,
                    parent_session_id,
                    meeting_id
                )
                VALUES (
                    session_rec.break_duration,
                    session_rec.interviewer_cnt,
                    session_rec.location,
                    session_rec.module_id,
                    session_rec.name,
                    session_rec.schedule_type,
                    session_rec.session_duration,
                    session_rec.session_order,
                    session_rec.session_type,
                    session_rec.id,
                    (SELECT id FROM inserted_meeting_cte)
                )
                RETURNING *
            )
            SELECT 
                (SELECT row_to_json(im) FROM inserted_meeting_cte im),
                (SELECT row_to_json(ins) FROM inserted_session_cte ins)
            INTO inserted_meeting, inserted_session;

            session_obj := jsonb_build_object(
                'interview_session', inserted_session,
                'interview_meeting', inserted_meeting,
                'interview_session_relation', '[]'::jsonb
            );

            inserted_sesn_id := (inserted_session->>'id')::uuid;

            old_new_session_ids := old_new_session_ids || jsonb_build_object(
                'old_session_id', session_rec.id::text,
                'new_session_id', inserted_sesn_id::text
            );

            session_relations := '[]'::jsonb;

            FOR sesn_reln_record IN 
            (
                SELECT 
                    interview_session_relation.interview_module_relation_id,
                    interview_session_relation.interviewer_type,
                    interview_session_relation.user_id,
                    interview_session_relation.training_type
                FROM interview_session_relation 
                WHERE interview_session_relation.session_id = session_rec.id
            )
            LOOP
                INSERT INTO interview_session_relation(
                    interview_module_relation_id,
                    interviewer_type,
                    user_id,
                    training_type,
                    session_id
                ) 
                VALUES (
                    sesn_reln_record.interview_module_relation_id,
                    sesn_reln_record.interviewer_type,
                    sesn_reln_record.user_id,
                    sesn_reln_record.training_type,
                    inserted_sesn_id
                )
                RETURNING row_to_json(interview_session_relation.*) INTO inserted_relation;

                session_relations := session_relations || jsonb_build_array(inserted_relation);
            END LOOP;

            session_obj := session_obj || jsonb_build_object(
                'interview_session_relation', session_relations
            );

            session_data := session_data || jsonb_build_array(session_obj);
            app_session_ids := array_append(app_session_ids, inserted_sesn_id);
        END LOOP;
    ELSE
        SELECT jsonb_agg(
            jsonb_build_object(
                'interview_session', row_to_json(interview_session),
                'interview_meeting', row_to_json(interview_meeting),
                'interview_session_relation', (
                    SELECT jsonb_agg(row_to_json(isr))
                    FROM interview_session_relation isr
                    WHERE isr.session_id = interview_session.id
                )
            )
        )
        INTO session_data
        FROM interview_schedule
        LEFT JOIN interview_meeting ON interview_meeting.interview_schedule_id = interview_schedule.id
        LEFT JOIN interview_session ON interview_session.meeting_id = interview_meeting.id
        WHERE interview_schedule.application_id = NEW.id;
    END IF;

    -- RETURN jsonb_build_object('old_new_session_ids', old_new_session_ids, 'cloned_sessions', session_data, 'schedule_id', int_schedule_id);
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_request_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE request 
    SET is_new = true
    WHERE request.id = NEW.id;
    RETURN NEW;
END;
$function$
;


