
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
BEGIN
    IF cardinality(NEW.session_ids) <> 0 THEN
      SELECT array_agg(meeting_id) INTO meeting_ids FROM interview_session WHERE id = any(NEW.session_ids);
      FOR wa_record IN
          SELECT wa.id AS workflow_action_id, w.id AS workflow_id, w.interval AS interval_minutes, w.phase AS phase, json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'job_id',a.job_id, 'email_type', c_e_t.type, 'meeting_ids', meeting_ids, 'filter_id', NEW.id) AS meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.schedule_id
            AND w.trigger::text = 'selfScheduleReminder'
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
      END LOOP;
    END IF;  
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER after_insert_interview_filter_json AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_interview_filter_json();


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
          SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', NEW.id, 'start_time', NEW.start_time, 'candidate_id', a.candidate_id, 'email_type', c_e_t.type, 'recruiter_user_id', NEW.organizer_id, 'session_id', (select i_m_s.id from interview_session i_m_s where i_m_s.meeting_id = NEW.id)) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.interview_schedule_id
            AND ((w.trigger::text = 'interviewStart' AND (c_e_t.type = 'interviewStart_email_applicant' OR c_e_t.type = 'interviewStart_email_organizer')) OR w.trigger::text = 'candidateBook')
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, NEW.start_time);
      END LOOP;
    END if;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER after_update_interview_meeting AFTER UPDATE OF status ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_meeting();


CREATE OR REPLACE FUNCTION public.workflow_log_on_update_interview_session_relation()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    IF NEW.is_confirmed THEN
        FOR wa_record IN
            SELECT wa.workflow_id as workflow_id, wa.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase, i_m.start_time as start_time, w.trigger as trigger, i_m_s.session_duration as session_duration,
            json_build_object( 'schedule_id', i_s.id, 'application_id', i_s.application_id, 'meeting_id', i_m.id, 'start_time', i_m.start_time, 'recruiter_user_id', m_i.user_id, 'email_type', c_e_t.type, 'session_id', NEW.session_id) as meta
            FROM 
            meeting_interviewers m_i 
            JOIN interview_session i_m_s ON i_m_s.id =  m_i.session_id
            JOIN interview_meeting i_m ON i_m.id = i_m_s.meeting_id
            JOIN interview_schedule i_s ON i_s.id = i_m.interview_schedule_id
            JOIN applications a ON i_s.application_id = a.id
            JOIN workflow_job_relation war ON war.job_id = a.job_id
            JOIN workflow w ON war.workflow_id = w.id
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            WHERE m_i.session_relation_id = NEW.id 
            AND c_e_t.type <> 'interviewStart_email_applicant' AND c_e_t.type <> 'interviewStart_email_organizer'  and (w.trigger::text = 'interviewStart' or w.trigger::text = 'interviewerConfirmation' or w.trigger::text = 'interviewEnd')
        LOOP
            IF wa_record.trigger = 'interviewEnd' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time + (wa_record.session_duration * INTERVAL '1 minute'));
            ELSIF wa_record.trigger = 'interviewStart' THEN
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta, wa_record.start_time);
            ELSE
              PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta , now());
            END IF;
        END LOOP;
    END IF;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER after_update_interview_session_relation AFTER UPDATE OF is_confirmed ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION workflow_log_on_update_interview_session_relation();


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


CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id ) as meta
            from interview_schedule i_s 
            JOIN applications a ON a.id = i_s.application_id
            JOIN workflow_job_relation w_a_r ON w_a_r.job_id = a.job_id
            JOIN workflow w ON w.id = w_a_r.workflow_id
            JOIN workflow_action w_a ON w_a.workflow_id = w_a_r.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = w_a.email_template_id
            WHERE i_s.application_id = NEW.application_id
            AND w.trigger::text = 'sendAvailReqReminder' 
        LOOP
            PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
        END LOOP;
    -- END if;
  RETURN NEW;
END;
$function$
;

CREATE TRIGGER after_insert_candidate_request_availability AFTER INSERT ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_candidate_request_availability();

