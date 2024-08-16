set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.call_webhook_on_change()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    url text;
    payload jsonb;
    headers jsonb;
BEGIN
    -- Fetch the webhook URL from the vault
    SELECT decrypted_secret 
    INTO url
    FROM vault.decrypted_secrets 
    WHERE name = 'APP_URL';

    -- Build the payload based on the type of operation
    IF TG_OP = 'INSERT' THEN
        payload := jsonb_build_object(
            'operation_type', 'INSERT',
            'table_name', TG_TABLE_NAME,
            'new_data', row_to_json(NEW)
        );
    ELSIF TG_OP = 'UPDATE' THEN
        payload := jsonb_build_object(
            'operation_type', 'UPDATE',
            'table_name', TG_TABLE_NAME,
            'old_data', row_to_json(OLD),
            'new_data', row_to_json(NEW)
        );
    ELSIF TG_OP = 'DELETE' THEN
        payload := jsonb_build_object(
            'operation_type', 'DELETE',
            'table_name', TG_TABLE_NAME,
            'old_data', row_to_json(OLD)
        );
    END IF;

    -- Set headers for the HTTP request
    headers := jsonb_build_object(
        'Content-Type', 'application/json'
    );

    PERFORM net.http_post(
        url := concat(url,'/api/db-events'),
        headers := headers,
        body := payload::jsonb
    );

    RETURN NULL;
END;
$function$
;

CREATE TRIGGER event_trigger_candidate_request_availability_delete AFTER DELETE ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_candidate_request_availability_insert AFTER INSERT ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_candidate_request_availability_update AFTER UPDATE ON public.candidate_request_availability FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_delete AFTER DELETE ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_insert AFTER INSERT ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_filter_json_update AFTER UPDATE ON public.interview_filter_json FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_delete AFTER DELETE ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_insert AFTER INSERT ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_meeting_update AFTER UPDATE ON public.interview_meeting FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_cancel_delete AFTER DELETE ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_cancel_insert AFTER INSERT ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_cancel_update AFTER UPDATE ON public.interview_session_cancel FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_relation_delete AFTER DELETE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_relation_insert AFTER INSERT ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_interview_session_relation_update AFTER UPDATE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_request_delete AFTER DELETE ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_request_insert AFTER INSERT ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();

CREATE TRIGGER event_trigger_request_update AFTER UPDATE ON public.request FOR EACH ROW EXECUTE FUNCTION call_webhook_on_change();


