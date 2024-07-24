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
            FROM workflow_job_relation war
            JOIN workflow_action wa ON wa.workflow_id = war.workflow_id
            JOIN company_email_template c_e_t ON c_e_t.id = wa.email_template_id
            JOIN workflow w ON war.workflow_id = w.id
            where w.trigger::text ='onQualified' and (
              c_e_t.type='onQualified_email_trainee' or 
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

CREATE TRIGGER workflow_log_on_update_interview_module_relation AFTER UPDATE OF training_status ON public.interview_module_relation FOR EACH ROW EXECUTE FUNCTION func_workflow_log_on_update_interview_module_relation();


