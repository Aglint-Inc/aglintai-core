CREATE TRIGGER event_trigger_interview_session_cancel_insert AFTER INSERT ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


