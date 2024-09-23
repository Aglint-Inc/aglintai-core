CREATE TRIGGER event_trigger_request_progress_insert AFTER INSERT ON public.request_progress FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


