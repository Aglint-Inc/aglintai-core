CREATE OR REPLACE FUNCTION new_permission_to_role_mapper ()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.is_enable THEN
    WITH temp_roles as ( SELECT id as role_id, recruiter_id from roles where name = 'admin' ) --  selection sequence matters
    INSERT INTO role_permissions ( role_id, recruiter_id, permission_id) -- here
    SELECT temp_roles.*, NEW.id AS permission_id
    FROM temp_roles;
  ELSE
    DELETE FROM role_permissions WHERE permission_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$function$;

CREATE TRIGGER new_permission_mapper_trigger
AFTER INSERT OR UPDATE ON public.permissions
FOR EACH ROW 
EXECUTE FUNCTION public.new_permission_to_role_mapper();