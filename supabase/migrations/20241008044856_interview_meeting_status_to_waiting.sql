set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_interview_meeting_status_to_waiting()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    ses_id uuid; -- Declare variable to hold session_id
BEGIN
    -- Fetch session_id based on meeting_id from the interview_session table
    SELECT id 
    INTO ses_id  
    FROM interview_session 
    WHERE meeting_id = NEW.id;

    -- Update the interview_session_relation table using the fetched session_id
    UPDATE interview_session_relation
    SET 
        accepted_status = 'waiting',
        training_type = CASE 
            WHEN training_type IN ('shadow', 'reverse_shadow') THEN NULL
            ELSE training_type
        END
    WHERE session_id = ses_id;

    -- Delete from interview_session_cancel for the updated session
    DELETE FROM interview_session_cancel 
    WHERE session_id = ses_id;

    -- Return the updated row (mandatory in an AFTER UPDATE trigger)
    RETURN NEW;
END;
$function$
;

CREATE TRIGGER interview_meeting_status_to_waiting AFTER UPDATE OF status ON public.interview_meeting FOR EACH ROW WHEN ((new.status = 'waiting'::interview_schedule_status)) EXECUTE FUNCTION trigger_interview_meeting_status_to_waiting();


