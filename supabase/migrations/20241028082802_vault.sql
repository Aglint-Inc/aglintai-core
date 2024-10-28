drop function if exists "public"."add_vault_secrets"(name text, value text);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_vault_secrets(sec_key text, sec_val text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM vault.secrets
    WHERE vault.secrets.name = sec_key;

    PERFORM vault.create_secret( sec_val,sec_key, 'This is the description');

    RETURN TRUE;
END;
$function$
;


