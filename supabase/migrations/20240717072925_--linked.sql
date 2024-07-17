drop trigger if exists "recruiter_insert_trigger" on "public"."recruiter";

drop function if exists "public"."company_email_template_init"();

drop function if exists "public"."insert_company_email_templates"(p_recruiter_id uuid);



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
