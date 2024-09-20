alter table "public"."recruiter_preferences" add column "analytics" boolean not null default false;

alter table "public"."recruiter_preferences" add column "candidate_portal" boolean not null default false;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.greenhouse_sync()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
BASE_URL text;
BEGIN
  SELECT value into BASE_URL from env where name = 'BASE_URL';
  PERFORM 
    net.http_post(
      url := BASE_URL||'/api/sync/greenhouse/full_db',
      body := jsonb_build_object('recruiter_id', recruiter_id, 'key', greenhouse_key),
      headers := '{ "Content-Type": "application/json"}'
    )
  FROM integrations WHERE greenhouse_key IS NOT NULL;
END;
$function$
;


