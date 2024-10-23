set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_vault_secrets(name text, value text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM vault.secrets
    WHERE vault.secrets.name = name;

    PERFORM vault.create_secret(name, value, 'This is the description');

    RETURN TRUE;
END;
$function$
;



CREATE OR REPLACE FUNCTION public.get_auth_users()
 RETURNS SETOF auth.users
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
   RETURN QUERY SELECT * FROM auth.users;
END;
$function$
;


