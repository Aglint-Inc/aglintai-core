set check_function_bodies = off;

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

CREATE TRIGGER workflow_log_on_update_interview_training_progress AFTER UPDATE OF is_attended ON public.interview_training_progress FOR EACH ROW EXECUTE FUNCTION func_workflow_log_on_update_interview_training_progress();


