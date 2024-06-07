set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_workflow_action_deletion()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW."trigger" <> OLD."trigger" THEN
      DELETE FROM workflow_action
      WHERE workflow_action.workflow_id = OLD.id;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER workflow_action_deletion AFTER UPDATE OF trigger ON public.workflow FOR EACH ROW EXECUTE FUNCTION trigger_workflow_action_deletion();



-- CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json()
--  RETURNS trigger
--  LANGUAGE plpgsql
--  SECURITY DEFINER
-- AS $function$
-- DECLARE
--     wa_record RECORD;
--     trigger_case text;
--     meeting_ids uuid[];
--     workflow_id uuid;
-- BEGIN
--     IF cardinality(NEW.session_ids) <> 0 THEN
--       SELECT array_agg(meeting_id) INTO meeting_ids FROM interview_session WHERE id = any(NEW.session_ids);
--       FOR wa_record IN
--           SELECT wa.id AS workflow_action_id, w.id AS workflow_id, w.interval AS interval_minutes, w.phase AS phase, json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'job_id',a.job_id, 'email_type', c_e_t.type, 'meeting_ids', meeting_ids) AS meta
--           FROM 
--           interview_schedule i_s 
--           JOIN applications a ON i_s.application_id = a.id
--           JOIN workflow_job_relation war ON war.job_id = a.job_id
--           JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
--           JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
--           JOIN workflow w ON war.workflow_id = w.id
--           WHERE i_s.id = NEW.schedule_id
--             AND w.trigger::text = 'self_schedule_request_reminder'
--       LOOP
--           PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
--       END LOOP;
--     END IF;  
--   RETURN NEW;
-- END;
-- $function$
-- ;

-- CREATE TRIGGER after_insert_interview_filter_json AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_interview_filter_json();

-- CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_meeting()
--  RETURNS trigger
--  LANGUAGE plpgsql
--  SECURITY DEFINER
-- AS $function$
-- DECLARE
--     wa_record RECORD;
--     trigger_case text;
--     workflow_id uuid;
-- BEGIN
--     if NEW.status::text = 'confirmed' then
--       FOR wa_record IN
--           SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type) as meta
--           FROM 
--           interview_schedule i_s 
--           JOIN applications a ON i_s.application_id = a.id
--           JOIN workflow_job_relation war ON war.job_id = a.job_id
--           JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
--           JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
--           JOIN workflow w ON war.workflow_id = w.id
--           WHERE i_s.id = NEW.interview_schedule_id
--             AND w.trigger::text = 'upcoming_interview_reminder'
--             AND c_e_t.type = 'upcoming_interview_reminder_candidate'
--       LOOP
--          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
--       END LOOP;
--     END if;
--   RETURN NEW;
-- END;
-- $function$
-- ;

-- CREATE TRIGGER after_update_interview_meeting AFTER UPDATE OF status ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_meeting();

-- CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation()
--  RETURNS trigger
--  LANGUAGE plpgsql
--  SECURITY DEFINER
-- AS $function$
-- DECLARE
--     wa_record RECORD;
--     trigger_case text;
--     workflow_id uuid;
-- BEGIN
--     if NEW.is_confirmed then
--         FOR wa_record IN
--             SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type) as meta
--             , m_i.session_id
--             FROM 
--             interview_schedule i_s 
--             JOIN interview_meeting i_m ON i_m.interview_schedule_id = i_s.id
--             JOIN meeting_interviewers m_i ON m_i.meeting_id = i_m.id
--             JOIN applications a ON i_s.application_id = a.id
--             JOIN workflow_job_relation war ON war.job_id = a.job_id
--             JOIN workflow w ON war.workflow_id = w.id
--             JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
--             JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
--             WHERE m_i.session_id = NEW.session_id
--             AND c_e_t.type = 'upcoming_interview_reminder_interviewers' and w.trigger::text = 'upcoming_interview_reminder' 
--         LOOP
--             PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, i_m.start_time);
--         END LOOP;
--     END if;
--   RETURN NEW;
-- END;
-- $function$
-- ;

-- CREATE TRIGGER after_update_interview_session_relation AFTER UPDATE OF is_confirmed ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_session_relation();