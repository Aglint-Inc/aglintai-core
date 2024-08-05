set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_session_requests(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  application uuid;
BEGIN
    FOR application IN SELECT UNNEST(applications) LOOP
      PERFORM create_session_request(application, sessions, request);
    END LOOP;
END;
$function$
;


