DROP FUNCTION IF EXISTS public.create_user(email text, password text, user_id uuid); 

CREATE OR REPLACE FUNCTION public.create_user(email text, password text, user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
  DECLARE
    encrypted_pw text;
BEGIN
  -- Generate user_id if not provided
  IF user_id IS NULL THEN
    user_id := gen_random_uuid();
  END IF;
  
  -- Encrypt the password
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  -- Insert into auth.users
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token, raw_app_meta_data, raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '', '{"provider":"email","providers":["email"]}', '{"name":"chandan","role":"Company","roles":"Company","is_invite":"false","invite_user":{"name":"Dileep","email":"dileep@aglinthq.com"}}');
  
  -- Insert into auth.identities
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id, gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$function$
;