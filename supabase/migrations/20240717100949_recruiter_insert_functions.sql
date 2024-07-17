drop trigger if exists "recruiter_insert_trigger" on "public"."recruiter";

drop function if exists "public"."company_email_template_init"();

drop function if exists "public"."insert_company_email_templates"(p_recruiter_id uuid);

set check_function_bodies = off;


CREATE OR REPLACE FUNCTION public.workflow_log_on_insert_candidate_request_availability()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
    wa_record RECORD;
    trigger_case text;
    workflow_id uuid;
BEGIN
    -- if NEW.slots is not null then
        FOR wa_record IN
            select w_a.workflow_id as workflow_id, w_a.id as workflow_action_id, w.interval as interval_minutes, w.phase as phase,
                  json_build_object('schedule_id', i_s.id, 'application_id', i_s.application_id, 'email_type', c_e_t.type, 'avail_req_id', NEW.id, 'sessions') as meta
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
END;$function$
;
DROP FUNCTION IF EXISTS vault.initialize_dependency;

CREATE OR REPLACE FUNCTION vault.initialize_dependency()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $function$
DECLARE
  curr RECORD;
BEGIN
  SELECT name, decrypted_secret 
  INTO curr 
  FROM vault.decrypted_secrets 
  WHERE name = NEW.name;
  CASE
    WHEN curr.name = 'APP_URL' THEN 
      EXECUTE 'DROP TRIGGER IF EXISTS new_recruiters ON public.recruiter;';
      EXECUTE '
        CREATE TRIGGER new_recruiters
        AFTER INSERT ON public.recruiter 
        FOR EACH ROW 
        EXECUTE FUNCTION supabase_functions.http_request(
          ''' || curr.decrypted_secret || '/api/pre-seed'', 
          ''POST'', 
          ''{"Content-type":"application/json"}'', 
          ''{}'', 
          ''1000''
        );';
  END CASE;
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS secret_trigger ON vault.secrets;
-- Create the trigger
CREATE TRIGGER secret_dependency_trigger 
AFTER INSERT OR UPDATE OF secret ON vault.secrets 
FOR EACH ROW 
EXECUTE FUNCTION vault.initialize_dependency();
