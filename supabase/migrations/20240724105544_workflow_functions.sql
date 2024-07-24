drop trigger if exists "new_recruiters" on "public"."recruiter";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.func_workflow_log_on_update_interview_module_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
BEGIN
    IF NEW.training_status::text = 'qualified' THEN
        FOR wa_record IN
            SELECT 
                wa.workflow_id AS workflow_id, 
                wa.id AS workflow_action_id, 
                w.interval AS interval_minutes, 
                w.phase AS phase, 
                w.trigger AS trigger, 
                json_build_object('interview_module_relation_id', NEW.id, 'email_type', c_e_t.type) AS meta
            FROM interview_module i_m
            join workflow w on w.recruiter_id = i_m.recruiter_id
            JOIN workflow_action wa ON wa.workflow_id = w.id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id           
            where i_m.id=NEW.interview_module_relation_id AND w.trigger::text ='onQualified' AND (
              c_e_t.type='onQualified_email_trainee' OR
              c_e_t.type='onQualified_slack_trainee' 
            )
        LOOP
            PERFORM create_new_workflow_action_log(
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
BEGIN

  select i_m_r.number_of_reverse_shadow as req_rshadow, i_m_r.number_of_shadow as req_shadow, m_r_v.number_of_shadow, m_r_v.number_of_reverse_shadow
  into   required_rshadow, required_shadow,total_shadow, total_rshadow
  from interview_session_relation 
  left join interview_module_relation i_m_r on i_m_r.id = interview_session_relation.interview_module_relation_id
  left join module_relations_view m_r_v on m_r_v.id = interview_session_relation.interview_module_relation_id
  where interview_session_relation.id=NEW.session_relation_id;


  IF NEW.is_attended = true AND required_shadow >=total_shadow and required_rshadow >= total_rshadow AND  THEN
      FOR wa_record IN    
          SELECT 
              wa.workflow_id AS workflow_id, 
              wa.id AS workflow_action_id, 
              w.interval AS interval_minutes, 
              w.phase AS phase, 
              w.trigger AS trigger, 
              json_build_object('session_relation_id', NEW.session_relation_id, 'email_type', c_e_t.type) AS meta
          FROM workflow w
          JOIN workflow_action wa ON wa.workflow_id = w.id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          where w.trigger::text ='onTrainingComplete' and (
            c_e_t.type='onTrainingComplete_email_approverForTraineeMeetingQualification' or 
            c_e_t.type='onTrainingComplete_slack_approverForTraineeMeetingQualification' 
          )
      LOOP
          PERFORM create_new_workflow_action_log(
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
        WHERE (w_a_l.status = 'not started' AND w_a_l.execute_at < CURRENT_TIMESTAMP + INTERVAL '1 minute')
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

CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if NEW.status::text = 'confirmed' then
      FOR wa_record IN
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,w.trigger as trigger, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type, 'recruiter_user_id', NEW.organizer_id, 'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id = NEW.id)) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id AND (
            (w.trigger::text = 'interviewStart' AND (c_e_t.type = 'interviewStart_email_applicant' OR c_e_t.type = 'interviewStart_email_organizer')) 
            OR w.trigger::text = 'candidateBook'
            OR w.trigger::text ='interviewEnd' AND (
              c_e_t.type = 'interviewEnd_slack_organizerForMeetingStatus'  OR 
              c_e_t.type = 'interviewEnd_email_organizerForMeetingStatus' OR 
              c_e_t.type = 'interviewEnd_email_shadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_email_rShadowTraineeForMeetingAttendence' OR 
              c_e_t.type = 'interviewEnd_slack_rShadowTraineeForMeetingAttendence' OR
              c_e_t.type = 'interviewEnd_slack_shadowTraineeForMeetingAttendence'
              )
            )
      LOOP
          IF wa_record.trigger::text='interviewEnd' THEN PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.end_time);
          ELSE PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
          END IF;
      END LOOP;
    END if;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER workflow_log_on_update_interview_module_relation AFTER UPDATE OF training_status ON public.interview_module_relation FOR EACH ROW EXECUTE FUNCTION func_workflow_log_on_update_interview_module_relation();

CREATE TRIGGER workflow_log_on_update_interview_training_progress AFTER UPDATE OF is_attended ON public.interview_training_progress FOR EACH ROW EXECUTE FUNCTION func_workflow_log_on_update_interview_training_progress();

CREATE TRIGGER new_recruiters AFTER INSERT ON public.recruiter FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://rested-logically-lynx.ngrok-free.app/api/pre-seed', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


