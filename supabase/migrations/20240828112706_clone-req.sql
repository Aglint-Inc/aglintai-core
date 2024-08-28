CREATE TRIGGER event_trigger_request_insert AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


