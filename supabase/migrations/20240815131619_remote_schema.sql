drop trigger if exists "new_recruiters" on "public"."recruiter";

alter table "public"."request_integration_tool" drop constraint "public_request_integration_tool_recruiter_id_fkey";

alter table "public"."request_integration_tool" add constraint "request_integration_tool_recruiter_id_fkey" FOREIGN KEY (recruiter_id) REFERENCES recruiter(id) ON DELETE CASCADE not valid;

alter table "public"."request_integration_tool" validate constraint "request_integration_tool_recruiter_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.count_requests()
 RETURNS TABLE(date text, created_at_count bigint, completed_at_count bigint, on_progress_count bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        to_char(dates.date, 'DD-MM-YYYY') AS date,
        COUNT(r.id) FILTER (WHERE r.created_at::date = dates.date) AS created_at_count,
        COUNT(r.id) FILTER (WHERE r.completed_at::date = dates.date) AS completed_at_count,
        COUNT(r.id) FILTER (WHERE r.status = 'in_progress' AND r.created_at::date <= dates.date AND (r.completed_at::date IS NULL OR r.completed_at::date > dates.date)) AS on_progress_count
    FROM 
        (
            SELECT DISTINCT created_at::date AS date FROM public.request WHERE created_at IS NOT NULL
            UNION
            SELECT DISTINCT completed_at::date AS date FROM public.request WHERE completed_at IS NOT NULL
        ) AS dates
    LEFT JOIN 
        public.request r ON r.created_at::date = dates.date OR r.completed_at::date = dates.date
    WHERE 
        dates.date IS NOT NULL
    GROUP BY 
        dates.date
    ORDER BY 
        dates.date ASC;

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

CREATE OR REPLACE FUNCTION public.lever_resume_save()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    rec_id uuid;
    app_id uuid;
    request_results JSONB;
    function_url TEXT;
BEGIN
    FOR rec_id IN 
        SELECT recruiter_id 
        FROM integrations 
        JOIN recruiter ON recruiter.id = integrations.recruiter_id 
        WHERE integrations.lever_key IS NOT NULL
    LOOP
        FOR app_id IN 
            SELECT applications.id 
            FROM applications 
            JOIN public_jobs ON public_jobs.id = applications.job_id 
            WHERE public_jobs.posted_by = 'Lever' 
            AND applications.is_resume_fetching = TRUE 
            AND applications.processing_status <> 'failed' LIMIT 10
        LOOP
           SELECT value INTO function_url FROM env WHERE name = 'lever-batchsave';
            request_results := net.http_post(
                url := function_url,
                body := jsonb_build_object('application_id', app_id),
                headers := jsonb_build_object('Content-Type', 'application/json')
            );
            RAISE NOTICE 'HTTP request result for application_id %: %', app_id, request_results;
        END LOOP;

    END LOOP;
END $function$
;

CREATE OR REPLACE FUNCTION public.new_get_interview_schedule_by_meeting_id(target_meeting_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    schedule_data JSONB;
    cancel_data JSONB;
    result_data JSONB;
BEGIN
    BEGIN
        SELECT 
            jsonb_build_object(
                'interview_meeting', row_to_json(intmeet),
                'interview_session', row_to_json(intses),
                'schedule', row_to_json(insc),
                'candidates', (
                    SELECT json_build_object(
                        'id', cand.id,
                        'email', cand.email,
                        'first_name' , cand.first_name,
                        'last_name' , cand.last_name,
                        'timezone' , cand.timezone
                    )
                    ),
                'interview_module', row_to_json(intmod),
                'job', (
                    SELECT json_build_object(
                        'id', pj.id,
                        'created_at', pj.created_at, 
                        'job_title', pj.job_title, 
                        'description', pj.description 
                    ) 
                ),
                'users', COALESCE((
                    SELECT jsonb_agg(
                         CASE WHEN intses.session_type = 'debrief' THEN
                            jsonb_build_object(
                            'id', debuser.user_id,
                            'first_name', debuser.first_name,
                            'last_name', debuser.last_name,
                            'email', debuser.email,
                            'profile_image', debuser.profile_image,
                            'position', debuser.position,
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
                            'scheduling_settings', debuser.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = debuser.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            ELSE
                            jsonb_build_object(
                            'id', ru.user_id,
                            'first_name', ru.first_name,
                            'last_name', ru.last_name,
                            'email', ru.email,
                            'profile_image', ru.profile_image,
                            'position', ru.position,
                            'department', '',
                            'interview_session_relation', row_to_json(isr),
                            'location', '',
                            'scheduling_settings', ru.scheduling_settings,
                            'weekly_meetings', (
                                SELECT json_agg(json_build_object(
                                    'start_time', im2.start_time,
                                    'end_time', im2.end_time
                                )) 
                                FROM interview_session_relation intsr2
                                JOIN interview_module_relation intmr2 ON intmr2.id = intsr2.interview_module_relation_id 
                                JOIN recruiter_user recuser2 ON recuser2.user_id = intmr2.user_id 
                                JOIN interview_session ints2 ON intsr2.session_id = ints2.id
                                JOIN interview_meeting im2 ON ints2.meeting_id = im2.id
                                WHERE recuser2.user_id = ru.user_id
                                AND intsr2.is_confirmed = true
                                AND im2.start_time >= date_trunc('week', CURRENT_DATE)  -- Start of the current week (Monday)
                                AND im2.start_time < date_trunc('week', CURRENT_DATE) + INTERVAL '1 week'
                            )
                        )::jsonb
                            END

                       
                    )
                    FROM interview_session_relation isr
                    LEFT JOIN interview_module_relation inm ON inm.id = isr.interview_module_relation_id
                    LEFT JOIN recruiter_user ru ON ru.user_id = inm.user_id
                    LEFT JOIN recruiter_user debuser ON debuser.user_id = isr.user_id
                    WHERE isr.session_id = intses.id
                ), '[]'::jsonb),
                'hiring_manager', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.hiring_manager
                ),
                'recruiter', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiter
                ),
                'recruiting_coordinator', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.recruiting_coordinator
                ),
                'sourcer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=pj.sourcer
                ),
                 'organizer', (
                    SELECT json_build_object(
                        'id', recruiter_user.user_id,
                        'first_name', recruiter_user.first_name,
                        'last_name', recruiter_user.last_name,
                        'email', recruiter_user.email,
                        'profile_image', recruiter_user.profile_image,
                        'position', recruiter_user.position
                    ) from recruiter_user where user_id=intmeet.organizer_id
                )
            )
        INTO schedule_data
        FROM interview_meeting intmeet
        LEFT JOIN interview_session intses ON intses.meeting_id = intmeet.id 
        LEFT JOIN interview_module intmod ON intmod.id = intses.module_id
        LEFT JOIN interview_schedule insc ON insc.id = intmeet.interview_schedule_id  
        LEFT JOIN applications app ON insc.application_id = app.id
        LEFT JOIN candidates cand ON app.candidate_id = cand.id 
        LEFT JOIN candidate_files cf ON cf.id = app.candidate_file_id  
        LEFT JOIN public_jobs pj ON pj.id = app.job_id
        WHERE intmeet.id = target_meeting_id
        GROUP BY intmeet.id, intses.id, intmod.id, insc.id, app.id, cand.id, cf.id, pj.id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                schedule_data := NULL;
    END;

    BEGIN
        SELECT jsonb_agg( 
            jsonb_build_object(
                'interview_session_cancel', row_to_json(intsescan),
                'interview_session_relation', row_to_json(intsesrel),
                'recruiter_user',(
                     CASE WHEN intsescan.session_relation_id is NULL THEN
                    json_build_object(
                        'id', canceluser.user_id,
                        'first_name', canceluser.first_name,
                        'last_name', canceluser.last_name,
                        'email', canceluser.email,
                        'profile_image', canceluser.profile_image,
                        'position', canceluser.position
                    )
                    ELSE  json_build_object(
                        'id', recuser.user_id,
                        'first_name', recuser.first_name,
                        'last_name', recuser.last_name,
                        'email', recuser.email,
                        'profile_image', recuser.profile_image,
                        'position', recuser.position
                    )
                    END
                    ), 
                'candidate', row_to_json(cand)
                    ))
        INTO cancel_data
        FROM interview_session_cancel intsescan
        LEFT JOIN interview_session intses ON intses.id = intsescan.session_id 
        LEFT JOIN interview_meeting intmeet ON intmeet.id = intses.meeting_id
        LEFT JOIN interview_session_relation intsesrel ON intsesrel.id = intsescan.session_relation_id
        LEFT JOIN interview_module_relation intmodrel ON intmodrel.id = intsesrel.interview_module_relation_id
        LEFT JOIN recruiter_user recuser ON recuser.user_id = intmodrel.user_id
        LEFT JOIN recruiter_user canceluser ON canceluser.user_id = intsescan.cancel_user_id
        LEFT JOIN interview_schedule intsch ON intsch.id = intsescan.schedule_id
        LEFT JOIN applications app ON app.id = intsch.application_id
        LEFT JOIN candidates cand ON cand.id = app.candidate_id
        WHERE intmeet.id = target_meeting_id;
        
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                cancel_data := NULL;
    END;

    result_data := jsonb_build_object(
        'schedule_data', schedule_data,
        'cancel_data', cancel_data
    );

    RETURN result_data;
    
     -- Ensure correct grouping
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_clone_interview_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    company_id uuid;
    appl_job_id uuid;
    int_schedule_id uuid := gen_random_uuid();  -- Assuming this is to generate a new UUID
    session_rec record;
    sesn_reln_record record;
    inserted_sesn_id uuid;
    inserted_meet_id uuid;
    inserted_plan_id uuid;
    int_plan_loop record;
BEGIN
    -- Delete any existing interview schedules for this application
    DELETE FROM interview_schedule WHERE interview_schedule.application_id = NEW.id;

    -- Fetch the recruiter ID for the application
    SELECT public_jobs.recruiter_id 
    INTO company_id 
    FROM applications
    LEFT JOIN public_jobs ON public_jobs.id = applications.job_id 
    WHERE applications.id = NEW.id;

    -- Insert a new interview schedule record
    INSERT INTO interview_schedule(id, application_id, recruiter_id) 
    VALUES (int_schedule_id, NEW.id, company_id);

    -- Fetch the job ID for the application
    SELECT job_id 
    INTO appl_job_id 
    FROM applications 
    WHERE id = NEW.id;

    -- Loop through each interview plan related to the job
    FOR int_plan_loop IN 
        SELECT 
            interview_plan.id AS plan_id,
            interview_plan.name,
            interview_plan.plan_order
        FROM interview_plan 
        WHERE interview_plan.job_id = appl_job_id
    LOOP
        -- Insert into interview_plan and get the inserted plan_id
        INSERT INTO interview_plan (name, plan_order)
        VALUES (int_plan_loop.name, int_plan_loop.plan_order)
        RETURNING id INTO inserted_plan_id;

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
            FROM interview_session
            WHERE interview_session.interview_plan_id = int_plan_loop.plan_id
        LOOP
            -- Insert interview meeting and session within a single SQL command using CTEs
            WITH inserted_meeting_cte AS (
                INSERT INTO interview_meeting (interview_schedule_id, status,application_id)
                VALUES (int_schedule_id, 'not_scheduled',NEW.id)
                RETURNING id
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
                    meeting_id,
                    interview_plan_id
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
                    (SELECT id FROM inserted_meeting_cte),
                    inserted_plan_id
                )
                RETURNING id
            )
            SELECT 
                (SELECT id FROM inserted_meeting_cte),
                (SELECT id FROM inserted_session_cte)
            INTO inserted_meet_id, inserted_sesn_id;

            -- Insert relations for the session
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
                );
            END LOOP;
        END LOOP;
    END LOOP;

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = OLD.request_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_insert()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF (to_jsonb(OLD.*) - 'updated_at') <> (to_jsonb(NEW.*) - 'updated_at') THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE
    RETURN NULL;
  END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_meeting_status()
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
  -- Loop through each row in interview_schedule
-- Loop through each row in interview_schedule
    UPDATE interview_meeting
    SET status = 'completed'
    WHERE end_time < NOW() - INTERVAL '1 day' AND status <> 'completed' AND status <> 'cancelled';
END;$function$
;

create policy "Allow anonymous access"
on "public"."request"
as permissive
for select
to anon
using (true);


CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://dev.aglinthq.com/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


