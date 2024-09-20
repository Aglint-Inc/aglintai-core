set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.trigger_interview_session_count_invalidation()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  WITH interview_session_info AS (
    SELECT DISTINCT
      interview_session.id,
      interview_session.interviewer_cnt,
      count(interview_session_relation.id) OVER (PARTITION BY interview_session.id) AS session_count
    FROM
      interview_session
    LEFT JOIN
      interview_session_relation ON
      interview_session_relation.session_id = interview_session.id
    WHERE
      interview_session.id = OLD.session_id
  ), invalid_session AS (
    SELECT
      *
    FROM
      interview_session_info
    WHERE
      interview_session_info.interviewer_cnt > interview_session_info.session_count
  )
  UPDATE interview_session
  SET 
    interviewer_cnt = CASE 
                        WHEN invalid_session.interviewer_cnt = 0 THEN 0
                        ELSE invalid_session.session_count
                      END
  FROM 
    invalid_session
  WHERE 
    interview_session.id = invalid_session.id;
  RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_debrief_session(session_id uuid, session_duration integer, break_duration integer, location text, schedule_type interview_schedule_type, name text, members jsonb, members_meta jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM 
        interview_session_relation
    WHERE user_id IN (
        SELECT
            user_id
        FROM 
            interview_session_relation
        WHERE
            interview_session_relation.session_id = update_debrief_session.session_id AND
            user_id NOT IN (
                SELECT 
                    (entry->>'id')::uuid AS user_id
                FROM 
                    jsonb_array_elements(members) AS entry
            )
    );

    INSERT INTO interview_session_relation (user_id, session_id)
    SELECT
        user_id,
        update_debrief_session.session_id AS session_id
    FROM
        (
            SELECT 
                (entry->>'id')::uuid AS user_id
            FROM 
                jsonb_array_elements(members) AS entry
        ) as temp
    WHERE
        user_id NOT IN (
            SELECT 
                interview_session_relation.user_id
            FROM
                interview_session_relation
            WHERE
                interview_session_relation.session_id = update_debrief_session.session_id
        );
    UPDATE interview_session
    SET 
      session_duration = update_debrief_session.session_duration,
      break_duration = update_debrief_session.break_duration,
      location = update_debrief_session.location,
      schedule_type = update_debrief_session.schedule_type,
      name = update_debrief_session.name,
      members_meta = update_debrief_session.members_meta
    WHERE interview_session.id = update_debrief_session.session_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_interview_session(session_id uuid, module_id uuid, session_duration integer, break_duration integer, interviewer_cnt integer, session_type session_type, location text, schedule_type interview_schedule_type, name text, interview_module_relation_entries jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    DELETE FROM interview_session_relation WHERE interview_session_relation.session_id = update_interview_session.session_id;
    INSERT INTO interview_session_relation (interview_module_relation_id, session_id, interviewer_type, training_type)
    SELECT 
        (entry->>'id')::uuid AS interview_module_relation_id,
        update_interview_session.session_id AS session_id,
        (entry->>'interviewer_type')::status_training AS interviewer_type,
        (entry->>'training_type')::interviewer_type AS training_type
    FROM 
        jsonb_array_elements(interview_module_relation_entries) AS entry;
    UPDATE interview_session
    SET  
      module_id = update_interview_session.module_id,
      session_duration = update_interview_session.session_duration,
      break_duration = update_interview_session.break_duration,
      interviewer_cnt = update_interview_session.interviewer_cnt,
      session_type = update_interview_session.session_type,
      location = update_interview_session.location,
      schedule_type = update_interview_session.schedule_type,
      name = update_interview_session.name
    WHERE interview_session.id = update_interview_session.session_id;
END;
$function$
;

CREATE TRIGGER interview_session_count_invalidation AFTER DELETE ON public.interview_session_relation FOR EACH ROW EXECUTE FUNCTION trigger_interview_session_count_invalidation();


