DROP TRIGGER IF EXISTS update_interviewer_cnt_trigger ON public.interview_session_relation;

DROP TRIGGER IF EXISTS decrement_interviewer_cnt_trigger ON public.interview_session_relation;

DROP FUNCTION IF EXISTS decrement_interviewer_cnt ();

DROP FUNCTION IF EXISTS update_interviewer_cnt ();

CREATE
OR REPLACE FUNCTION update_interviewer_cnt () RETURNS TRIGGER AS $$
BEGIN
    -- Check if the session type is 'debrief'
    IF (SELECT session_type FROM public.interview_session WHERE id = NEW.session_id) = 'debrief' THEN
        -- Update the interviewer_cnt
        UPDATE public.interview_session
        SET interviewer_cnt = interviewer_cnt + 1
        WHERE id = NEW.session_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION decrement_interviewer_cnt () RETURNS TRIGGER AS $$
BEGIN
    -- Check if the session type is 'debrief'
    IF (SELECT session_type FROM public.interview_session WHERE id = OLD.session_id) = 'debrief' THEN
        -- Update the interviewer_cnt
        UPDATE public.interview_session
        SET interviewer_cnt = interviewer_cnt - 1
        WHERE id = OLD.session_id;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_interviewer_cnt_trigger
AFTER INSERT ON public.interview_session_relation FOR EACH ROW
EXECUTE FUNCTION update_interviewer_cnt ();

CREATE TRIGGER decrement_interviewer_cnt_trigger
AFTER DELETE ON public.interview_session_relation FOR EACH ROW
EXECUTE FUNCTION decrement_interviewer_cnt ();
