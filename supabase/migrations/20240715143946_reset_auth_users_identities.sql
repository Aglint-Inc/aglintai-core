CREATE OR REPLACE FUNCTION public.reset_auth_users_identities(user_email text) 
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $function$
BEGIN
    DELETE FROM auth.users
    where email=user_email;
END;
$function$;