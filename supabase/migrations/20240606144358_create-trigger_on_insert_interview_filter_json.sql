
CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_interview_filter_json()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    if cardinality(NEW.session_ids) <> 0 then
      FOR wa_record IN
          SELECT wa.id as workflow_action_id, w.id as workflow_id, w.interval as interval_minutes, w.phase as phase, json_build_object('session_id', i_s.id, 'application_id', i_s.application_id, 'job_id',a.job_id, 'email_type', c_e_t.type) as meta
          FROM 
          interview_schedule i_s 
          JOIN applications a ON i_s.application_id = a.id
          JOIN workflow_job_relation war ON war.job_id = a.job_id
          JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
          JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
          JOIN workflow w ON war.workflow_id = w.id
          WHERE i_s.id = NEW.schedule_id
            AND w.trigger::text = 'self_schedule_request_reminder'
      LOOP
          PERFORM create_new_workflow_action_log(wa_record.workflow_id, wa_record.workflow_action_id, wa_record.interval_minutes, wa_record.phase::text, wa_record.meta);
      END LOOP;
    END IF;  
  RETURN NEW;
END;
$function$
security definer
;

CREATE TRIGGER after_insert_interview_filter_json AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION workflow_log_on_insert_interview_filter_json();