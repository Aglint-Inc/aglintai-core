CREATE TRIGGER event_trigger_request_progress_update AFTER UPDATE ON public.request_progress FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


