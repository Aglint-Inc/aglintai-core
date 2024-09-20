alter table "public"."request" add column "updated_at" timestamp with time zone not null default now();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_delete()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = OLD.request_id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_insert()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_progress_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE request
  SET updated_at = now()
  WHERE id = NEW.request_id;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.trigger_request_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF (to_jsonb(OLD.*) - 'updated_at') <> (to_jsonb(NEW.*) - 'updated_at') THEN
    NEW.updated_at = now();
    RETURN NEW;
  ELSE
    RETURN NULL;
  END IF;
END;
$function$
;

CREATE TRIGGER request_update BEFORE UPDATE ON public.request FOR EACH ROW EXECUTE FUNCTION trigger_request_update();

CREATE TRIGGER request_progress_delete AFTER DELETE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_delete();

CREATE TRIGGER request_progress_insert AFTER INSERT ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_insert();

CREATE TRIGGER request_progress_update AFTER UPDATE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION trigger_request_progress_update();


