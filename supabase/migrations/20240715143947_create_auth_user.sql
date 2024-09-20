drop function if exists create_auth_user;

CREATE
OR REPLACE FUNCTION create_auth_user (
  email text,
  password text,
  user_id uuid,
  app_meta_data jsonb,
  user_meta_data jsonb
) RETURNS void AS $$
  declare
  encrypted_pw text;
BEGIN
  -- user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf'));
  
  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at,created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token,raw_app_meta_data,raw_user_meta_data)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00',  '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '',app_meta_data,user_meta_data);
  
  INSERT INTO auth.identities (id, user_id,provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id,gen_random_uuid(), format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;
$$ LANGUAGE plpgsql security definer;
