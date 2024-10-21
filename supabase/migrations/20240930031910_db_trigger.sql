CREATE TRIGGER event_trigger_public_jobs_insert AFTER INSERT ON public.public_jobs FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


