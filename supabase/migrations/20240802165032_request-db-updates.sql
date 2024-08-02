alter table "public"."request" add column "is_new" boolean not null default false;

alter table "public"."request" add column "priority" text not null default 'standard'::text;

alter table "public"."request" add constraint "request_priority_check" CHECK ((priority = ANY (ARRAY['urgent'::text, 'standard'::text]))) not valid;

alter table "public"."request" validate constraint "request_priority_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.expire_new_requests()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  UPDATE request
  SET is_new = false
  WHERE is_new = true AND created_at < now() - interval '6 hours';
end;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_set_request_to_new()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE request 
    SET is_new = true
    WHERE request.id = NEW.id;
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_request(application uuid DEFAULT NULL::uuid, sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  request_id uuid;
  session_id uuid;
BEGIN
    RAISE LOG '🪵 create_session_request %', applications;
    IF application IS NOT NULL 
       AND request IS NOT NULL 
       AND request ->> 'assigner_id' IS NOT NULL 
       AND request ->> 'assignee_id' IS NOT NULL 
    THEN
            RAISE LOG '🪵 create_session_request inner%', applications;
        INSERT INTO request(application_id, assigner_id, assignee_id, title, type, status, priority)
        VALUES (application, 
                (request->>'assigner_id')::uuid, 
                (request->>'assignee_id')::uuid, 
                coalesce(request->>'title', 'New request'),
                coalesce(request->>'type', 'schedule_request'),
                coalesce(request->>'status', 'to_do'),
                coalesce(request->>'priority', 'standard')
                )
        RETURNING id INTO request_id;

        IF request_id IS NOT NULL AND array_length(sessions, 1) > 0 THEN
            FOR session_id IN SELECT UNNEST(sessions) LOOP
                INSERT INTO request_relation(request_id, session_id)
                VALUES (request_id, session_id);
            END LOOP;
        END IF;
    END IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.move_to_interview(applications uuid[] DEFAULT '{}'::uuid[], sessions uuid[] DEFAULT '{}'::uuid[], request jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  response record;
BEGIN
    RAISE LOG '🪵 move_to_interview %', applications;
    UPDATE applications
    SET status = 'interview'
    WHERE id = ANY(move_to_interview.applications);
    FOR response IN (
      SELECT meeting_details.application_id, array_agg(meeting_details.session_id) as session_ids
      FROM meeting_details
      WHERE meeting_details.application_id = ANY(move_to_interview.applications) AND parent_session_id = ANY(move_to_interview.applications)
      GROUP BY meeting_details.application_id
    ) 
    LOOP
      RAISE LOG '🪵 move_to_interview loop %', applications;
      PERFORM create_session_request(application_id, session_ids, request) FROM updated_session;
    END LOOP;
END;
$function$
;

CREATE TRIGGER set_request_to_new AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION trigger_set_request_to_new();


