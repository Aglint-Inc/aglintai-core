drop trigger if exists "after_update_interview_session_relation" on "public"."interview_session_relation";

alter type "public"."workflow_cron_trigger_tables" rename to "workflow_cron_trigger_tables__old_version_to_be_dropped";

create type "public"."workflow_cron_trigger_tables" as enum ('interview_meeting', 'interview_session_relation', 'interview_filter_json', 'candidate_request_availability', 'interview_module_relation', 'interview_training_progress');

alter table "public"."workflow_action_logs" alter column related_table type "public"."workflow_cron_trigger_tables" using related_table::text::"public"."workflow_cron_trigger_tables";

drop type "public"."workflow_cron_trigger_tables__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_new_workflow_action_log(triggered_table text, triggered_table_pkey uuid, workflow_id uuid, workflow_action_id uuid, interval_minutes numeric, phase text, meta json, base_time timestamp with time zone DEFAULT now())
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

CREATE OR REPLACE FUNCTION public.func_workflow_log_on_update_interview_module_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
    allowed_endpoints := ARRAY['onQualified_email_trainee','onQualified_slack_trainee']::email_slack_types[];
    UPDATE workflow_action_logs
    set status='stopped'::workflow_cron_run_status
    where related_table='interview_module_relation'::workflow_cron_trigger_tables and related_table_pkey=NEW.ID;

    IF NEW.training_status::text = 'qualified' THEN
        FOR wa_record IN
          SELECT 
            workflow.id AS workflow_id, 
            workflow_action.id AS workflow_action_id, 
            workflow.interval AS interval_minutes, 
            workflow.phase AS phase, 
            workflow.trigger AS trigger, 
            json_build_object(
              'target_api',workflow_action.target_api,
              'interview_module_relation_id',NEW.id,
              'payload',workflow_action.payload,
              'approver_id',NEW.training_approver
              ) AS meta
          FROM workflow
          LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
          where 
            workflow.recruiter_id=(select i_m.recruiter_id from interview_module i_m where i_m.id=NEW.module_id)
            AND workflow.workflow_type = 'system'
            AND workflow.is_paused = FALSE
            AND workflow_action.target_api::text = ANY(allowed_endpoints)
        LOOP
            PERFORM create_new_workflow_action_log(
              'interview_module_relation'::workflow_cron_trigger_tables ,
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

CREATE OR REPLACE FUNCTION public.func_workflow_log_on_update_interview_training_progress()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    required_shadow numeric;
    required_rshadow numeric;
    total_shadow numeric;
    total_rshadow numeric;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
  allowed_endpoints := ARRAY['onTrainingComplete_email_approverForTraineeMeetingQualification','onTrainingComplete_slack_approverForTraineeMeetingQualification'];
  select i_m_r.number_of_reverse_shadow as req_rshadow, i_m_r.number_of_shadow as req_shadow, m_r_v.shadow_confirmed_count, m_r_v.reverse_shadow_confirmed_count
  into   required_rshadow, required_shadow,total_shadow, total_rshadow
  from interview_session_relation 
  left join interview_module_relation i_m_r on i_m_r.id = interview_session_relation.interview_module_relation_id
  left join module_relations_view m_r_v on m_r_v.id = interview_session_relation.interview_module_relation_id
  where interview_session_relation.id=NEW.session_relation_id;

  UPDATE workflow_action_logs
  set status='stopped'::workflow_cron_run_status
  where related_table='interview_training_progress'::workflow_cron_trigger_tables and related_table_pkey=NEW.ID;
 

  IF NEW.is_attended = true AND required_shadow <=total_shadow and required_rshadow <= total_rshadow AND  THEN
     FOR wa_record IN
      
        SELECT 
          workflow.id AS workflow_id, 
          workflow_action.id AS workflow_action_id, 
          workflow.interval AS interval_minutes, 
          workflow.phase AS phase, 
          workflow.trigger AS trigger,
          json_build_object('target_api',workflow_action.target_api,'session_relation_id',NEW.id, 'payload',workflow_action.payload) AS meta
        FROM workflow
        LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
        WHERE 
        workflow.recruiter_id = (
        select r_r.recruiter_id 
        from interview_session_relation i_s_r 
        left join interview_module_relation i_m_r on i_m_r.id = i_s_r.interview_module_relation_id
        left join recruiter_relation r_r on r_r.user_id=i_m_r.user_id
        where i_s_r.id = new.session_relation_id    
        )
        AND workflow.is_paused = FALSE
        AND workflow.workflow_type = 'system'
        AND workflow_action.target_api::text = ANY(allowed_endpoints)
        LOOP
        base_time := NOW();
          PERFORM create_new_workflow_action_log(
             'interview_training_progress'::workflow_cron_trigger_tables ,
              NEW.id,
              wa_record.workflow_id, 
              wa_record.workflow_action_id, 
              wa_record.interval_minutes, 
              wa_record.phase::text, wa_record.meta,
              base_time
          );

    END LOOP;
  END IF;
 RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_action_log_cron()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    url_x text;
    headers_x jsonb;
    wa_record record;
BEGIN
    SELECT decrypted_secret 
    INTO  url_x
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';
    
    url_x := concat(url_x,'/api/workflow-cron' );

    headers_x := '{"Content-Type": "application/json"}'::jsonb;

    FOR wa_record IN
        SELECT json_build_object('id', w_a_l.id,'workflow_id', w_a_l.workflow_id, 'workflow_action_id', w_a_l.workflow_action_id, 'meta', w_a_l.meta, 'payload', w_a.payload, 'execution_time', w_a_l.execute_at ) AS body,
               w_a_l.id AS id,
               w_a_l.tries AS tries
        FROM workflow_action_logs w_a_l
        JOIN workflow_action w_a ON w_a_l.workflow_action_id = w_a.id
        WHERE (w_a_l.status = 'not_started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
           OR (w_a_l.status = 'failed' AND w_a_l.tries <= 3 AND w_a_l.started_at > CURRENT_TIMESTAMP - INTERVAL '6 minutes')
    LOOP
        PERFORM net.http_post(
            url := url_x,
            headers := headers_x,
            body := wa_record.body::jsonb
        );

        UPDATE workflow_action_logs
        SET status = 'processing', tries = wa_record.tries + 1, started_at = NOW()
        WHERE id = wa_record.id;
    END LOOP;

    RETURN true;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
  allowed_endpoints := ARRAY['sendAvailReqReminder_email_applicant']::email_slack_types[];

   FOR wa_record IN
      SELECT 
          workflow.id AS workflow_id, 
          workflow_action.id AS workflow_action_id, 
          workflow.interval AS interval_minutes, 
          workflow.phase AS phase, 
          workflow.trigger AS trigger, 
          json_build_object('target_api',workflow_action.target_api,'avail_req_id',NEW.id, 'payload',workflow_action.payload) AS meta
      FROM workflow
      LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
      LEFT JOIN interview_schedule i_s ON i_s.recruiter_id = workflow.recruiter_id
      LEFT JOIN applications ON applications.id = i_s.application_id
      WHERE 
          applications.id = NEW.application_id
          AND workflow.is_paused = FALSE
          AND (workflow.workflow_type = 'system' OR 
              (workflow.workflow_type = 'job' AND 
              workflow.id IN (
                  SELECT w_j_r.workflow_id 
                  FROM workflow_job_relation w_j_r
                  WHERE w_j_r.job_id = applications.job_id
              )
          ))
        AND workflow_action.target_api::text = ANY(allowed_endpoints)
      LOOP
         base_time := NOW();
          PERFORM create_new_workflow_action_log(
             'candidate_request_availability'::workflow_cron_trigger_tables ,
              NEW.id,
              wa_record.workflow_id, 
              wa_record.workflow_action_id, 
              wa_record.interval_minutes, 
              wa_record.phase::text, wa_record.meta,
              base_time
          );

    END LOOP;
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    meeting_ids uuid[];
    workflow_id uuid;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
  allowed_endpoints := ARRAY['selfScheduleReminder_email_applicant']::email_slack_types[];

    IF cardinality(NEW.session_ids) <> 0 THEN
      FOR wa_record IN
      SELECT 
          workflow.id AS workflow_id, 
          workflow_action.id AS workflow_action_id, 
          workflow.interval AS interval_minutes, 
          workflow.phase AS phase, 
          workflow.trigger AS trigger, 
          json_build_object('target_api',workflow_action.target_api,'filter_id',NEW.id, 'payload',workflow_action.payload) AS meta
      FROM workflow
      LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
      LEFT JOIN interview_schedule i_s ON i_s.recruiter_id = workflow.recruiter_id
      LEFT JOIN applications ON applications.id = i_s.application_id
      WHERE 
          i_s.id = NEW.schedule_id
          AND workflow.is_paused = FALSE
          AND (workflow.workflow_type = 'system' OR 
              (workflow.workflow_type = 'job' AND 
              workflow.id IN (
                  SELECT w_j_r.workflow_id 
                  FROM workflow_job_relation w_j_r
                  WHERE w_j_r.job_id = applications.job_id
              )
          ))
        AND workflow_action.target_api::text = ANY(allowed_endpoints)
      LOOP
        base_time := NOW();
          PERFORM create_new_workflow_action_log(
             'interview_filter_json'::workflow_cron_trigger_tables ,
              NEW.id,wa_record.workflow_id, 
              wa_record.workflow_action_id, 
              wa_record.interval_minutes, 
              wa_record.phase::text, wa_record.meta,
              base_time
          );

    END LOOP;
    END IF;  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case TEXT;
    workflow_id UUID;
    base_time TIMESTAMP;
    allowed_endpoints TEXT[];
BEGIN
    allowed_endpoints := ARRAY[
        'interviewStart_email_applicant', 'interviewStart_email_organizer', 
        'interviewEnd_slack_organizerForMeetingStatus', 'interviewEnd_email_organizerForMeetingStatus', 
        'interviewEnd_email_shadowTraineeForMeetingAttendence', 'interviewEnd_email_rShadowTraineeForMeetingAttendence', 
        'interviewEnd_slack_rShadowTraineeForMeetingAttendence', 'interviewEnd_slack_shadowTraineeForMeetingAttendence', 
        'candidateBook_slack_interviewerForConfirmation'
    ]::email_slack_types[];

    UPDATE workflow_action_logs
    set status='stopped'::workflow_cron_run_status
    where related_table='interview_meeting'::workflow_cron_trigger_tables and related_table_pkey=NEW.ID;

    IF NEW.status::text = 'confirmed' THEN
        FOR wa_record IN
            SELECT 
                workflow.id AS workflow_id, 
                workflow_action.id AS workflow_action_id, 
                workflow.interval AS interval_minutes, 
                workflow.phase AS phase, 
                workflow.trigger AS trigger, 
                json_build_object('schedule_id', i_s.id, 'meeeting_id',NEW.id,
                'payload',workflow_action.payload,
                'target_api',workflow_action.target_api,'organizer_id',NEW.organizer_id,'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id=NEW.id)) AS meta
            FROM workflow
            LEFT JOIN workflow_action ON workflow_action.workflow_id = workflow.id
            LEFT JOIN interview_schedule i_s ON i_s.recruiter_id = workflow.recruiter_id
            LEFT JOIN applications ON applications.id = i_s.application_id
            WHERE 
                i_s.id = NEW.interview_schedule_id
                AND workflow.is_paused = FALSE
                AND (workflow.workflow_type = 'system' OR 
                    (workflow.workflow_type = 'job' AND 
                    workflow.id IN (
                        SELECT w_j_r.workflow_id 
                        FROM workflow_job_relation w_j_r
                        WHERE w_j_r.job_id = applications.job_id
                    )
                ))
                AND workflow_action.target_api::text = ANY(allowed_endpoints)
        LOOP
            IF wa_record.trigger::TEXT = 'interviewEnd' THEN
                base_time := NEW.end_time ::timestamp;
            ELSE
                base_time := NOW();
            END IF;

            PERFORM create_new_workflow_action_log(
                'interview_meeting'::workflow_cron_trigger_tables ,
                NEW.id,
                wa_record.workflow_id, 
                wa_record.workflow_action_id, 
                wa_record.interval_minutes, 
                wa_record.phase::TEXT, 
                wa_record.meta, 
                base_time
            );
        END LOOP;
    END IF;

    RETURN NEW;
END;
$function$
;


