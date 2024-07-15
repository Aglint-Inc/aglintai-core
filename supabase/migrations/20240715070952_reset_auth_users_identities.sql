CREATE OR REPLACE FUNCTION public.reset_auth_users_identities() RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $function$
BEGIN
    DELETE FROM auth.users;
    DELETE FROM auth.identities;

END;
$function$;